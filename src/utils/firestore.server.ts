/**
 * Firestore access over the REST API v1.
 *
 * Why not the Firebase Admin SDK: nitro bundles server dependencies into ESM
 * (.mjs), and google-gax's gRPC loader reads `__dirname` at import time, which
 * throws `ReferenceError: __dirname is not defined in ES module scope` in
 * production while working fine in the Vite dev server. That made /blog render
 * empty and every post URL 404 on a successful build.
 *
 * The REST API is plain HTTPS, so it has no such constraint, pulls in nothing
 * (the admin SDK was ~9 MB of the function bundle), and behaves identically on
 * Vercel, Cloudflare Workers and Node.
 *
 * Auth is a service-account JWT signed with WebCrypto, exchanged for an OAuth2
 * access token, cached until shortly before it expires.
 *
 * All access is server-side only. `firestore.rules` denies every client request;
 * this module bypasses rules using IAM, exactly like the Admin SDK did.
 */

const SCOPE = "https://www.googleapis.com/auth/datastore";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const FIRESTORE_HOST = "https://firestore.googleapis.com";
/** Refresh this long before actual expiry to avoid racing the clock. */
const TOKEN_REFRESH_MARGIN_MS = 60_000;

export const POSTS_COLLECTION = "posts";

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

let cachedToken: CachedToken | null = null;

// ---------------------------------------------------------------- encoding

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const withPadding = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  return atob(withPadding);
}

/** PEM -> DER, so WebCrypto can import it as a PKCS#8 key. */
function pemToDer(pem: string): Uint8Array<ArrayBuffer> {
  const body = pem
    .replace(/-----BEGIN [A-Z ]+-----/g, "")
    .replace(/-----END [A-Z ]+-----/g, "")
    .replace(/\s+/g, "");
  const binary = base64UrlDecode(body);
  // Backed by a plain ArrayBuffer: TS will not pass an ArrayBufferLike
  // (possibly SharedArrayBuffer) view to crypto.subtle as BufferSource.
  const out = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

export type FirestoreValue = Record<string, unknown>;

function encodeValue(value: unknown): FirestoreValue | null {
  // `undefined` means "absent" and is dropped; an explicit `null` is a real
  // Firestore value and must survive.
  if (value === undefined) return null;
  if (value === null) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isFinite(value) && Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(encodeValue).filter((v): v is FirestoreValue => v !== null),
      },
    };
  }
  if (typeof value === "object") {
    return { mapValue: { fields: encodeFields(value as Record<string, unknown>) } };
  }
  return { stringValue: String(value) };
}

/**
 * Firestore rejects `undefined` anywhere in a document, including nested, so
 * omitted keys are dropped rather than written as null.
 */
function encodeFields(obj: Record<string, unknown>): Record<string, FirestoreValue> {
  const out: Record<string, FirestoreValue> = {};
  for (const [key, value] of Object.entries(obj)) {
    const encoded = encodeValue(value);
    if (encoded !== null) out[key] = encoded;
  }
  return out;
}

/** Firestore returns timestamps as RFC3339 strings; keep them as ISO strings. */
function decodeValue(value: FirestoreValue | undefined): unknown {
  if (!value || typeof value !== "object") return undefined;
  if ("stringValue" in value) return value.stringValue as string;
  if ("booleanValue" in value) return value.booleanValue as boolean;
  if ("integerValue" in value) return Number(value.integerValue as string);
  if ("doubleValue" in value) return value.doubleValue as number;
  if ("timestampValue" in value) return value.timestampValue as string;
  if ("nullValue" in value) return null;
  if ("bytesValue" in value) return value.bytesValue;
  if ("arrayValue" in value) {
    const arr = value.arrayValue as { values?: FirestoreValue[] } | undefined;
    return (arr?.values ?? []).map(decodeValue);
  }
  if ("mapValue" in value) {
    const map = value.mapValue as { fields?: Record<string, FirestoreValue> } | undefined;
    return decodeFields(map?.fields);
  }
  return undefined;
}

function decodeFields(fields: Record<string, FirestoreValue> | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(fields ?? {})) {
    out[key] = decodeValue(value);
  }
  return out;
}

// ---------------------------------------------------------------- auth

function getPrivateKey(): string {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) throw new Error("FIREBASE_PRIVATE_KEY is not set");
  // Local .env via `bun --env-file` arrives already unescaped; the Vercel
  // dashboard preserves the literal two-character sequence \n.
  return key.replace(/\\n/g, "\n");
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - TOKEN_REFRESH_MARGIN_MS) {
    return cachedToken.accessToken;
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  if (!clientEmail) throw new Error("FIREBASE_CLIENT_EMAIL is not set");
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("FIREBASE_PROJECT_ID is not set");

  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })),
  );
  const claims = base64UrlEncode(
    new TextEncoder().encode(
      JSON.stringify({ iss: clientEmail, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
    ),
  );
  const signingInput = `${header}.${claims}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(getPrivateKey()),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(signingInput),
  );
  const assertion = `${signingInput}.${base64UrlEncode(new Uint8Array(signature))}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!res.ok || !json.access_token) {
    throw new Error(`Firestore auth failed (HTTP ${res.status})`);
  }

  cachedToken = {
    accessToken: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
  return cachedToken.accessToken;
}

// ---------------------------------------------------------------- requests

function documentsBase(): string {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  if (!projectId) throw new Error("FIREBASE_PROJECT_ID is not set");
  return `${FIRESTORE_HOST}/v1/projects/${projectId}/databases/(default)/documents`;
}

async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${documentsBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });
}

export interface FirestoreDoc {
  id: string;
  data: Record<string, unknown>;
}

export interface QueryFilter {
  field: string;
  op: "EQUAL" | "ARRAY_CONTAINS";
  value: string | boolean | number;
}

export interface QueryOptions {
  collection: string;
  where?: QueryFilter[];
  orderBy?: { field: string; direction?: "ASCENDING" | "DESCENDING" }[];
  limit?: number;
}

/**
 * Structured query. Firestore requires the first `where` to be an equality
 * filter on an indexed field, which is why callers always filter on `published`.
 */
export async function firestoreQuery(options: QueryOptions): Promise<FirestoreDoc[]> {
  const structuredQuery: Record<string, unknown> = {
    from: [{ collectionId: options.collection }],
  };

  if (options.where?.length) {
    structuredQuery.where = {
      compositeFilter: {
        op: "AND",
        filters: options.where.map((w) => ({
          fieldFilter: {
            field: { fieldPath: w.field },
            op: w.op,
            value: encodeValue(w.value),
          },
        })),
      },
    };
  }

  if (options.orderBy?.length) {
    structuredQuery.orderBy = options.orderBy.map((o) => ({
      field: { fieldPath: o.field },
      direction: o.direction ?? "ASCENDING",
    }));
  }

  if (options.limit) structuredQuery.limit = options.limit;

  const res = await apiFetch(":runQuery", {
    method: "POST",
    body: JSON.stringify({ structuredQuery }),
  });

  if (!res.ok) {
    throw new Error(
      `Firestore query failed (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`,
    );
  }

  const rows = (await res.json()) as {
    document?: { name?: string; fields?: Record<string, FirestoreValue> };
  }[];

  return rows
    .filter((row) => row.document)
    .map((row) => ({
      id: (row.document!.name ?? "").split("/").pop() ?? "",
      data: decodeFields(row.document!.fields),
    }));
}

/** Returns null when the document does not exist. */
export async function firestoreGetDoc(
  collection: string,
  id: string,
): Promise<Record<string, unknown> | null> {
  const res = await apiFetch(`/${collection}/${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `Firestore get failed (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`,
    );
  }
  const json = (await res.json()) as { fields?: Record<string, FirestoreValue> };
  return decodeFields(json.fields);
}

/**
 * Merge-write.
 *
 * Firestore REST replaces the entire document on a plain PATCH. Omitting an
 * `updateMask` therefore *deletes* every field not in the payload — which
 * silently wiped tags, categories and SEO metadata the moment a minimal
 * approval payload was posted. The mask is what makes this a true merge.
 *
 * Fields absent from `data` are left untouched, so `{published: true}` updates
 * one field and nothing else.
 */
export async function firestoreSetDoc(
  collection: string,
  id: string,
  data: Record<string, unknown>,
): Promise<void> {
  const fields = encodeFields(data);
  const fieldPaths = Object.keys(fields);
  if (fieldPaths.length === 0) return;

  const mask = fieldPaths.map((f) => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join("&");

  const res = await apiFetch(`/${collection}/${encodeURIComponent(id)}?${mask}`, {
    method: "PATCH",
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    throw new Error(
      `Firestore write failed (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`,
    );
  }
}

/**
 * Deletes a document. Returns whether it actually existed — Firestore's DELETE
 * is idempotent and answers 200 either way, so existence is checked first to
 * let callers return an honest 404.
 */
export async function firestoreDeleteDoc(collection: string, id: string): Promise<boolean> {
  const existing = await firestoreGetDoc(collection, id);
  if (existing === null) return false;

  const res = await apiFetch(`/${collection}/${encodeURIComponent(id)}`, { method: "DELETE" });
  if (!res.ok && res.status !== 404) {
    throw new Error(
      `Firestore delete failed (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`,
    );
  }
  return true;
}
