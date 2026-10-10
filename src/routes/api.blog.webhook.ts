import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  firestoreGetDoc,
  firestoreSetDoc,
  firestoreDeleteDoc,
  POSTS_COLLECTION,
} from "@/utils/firestore.server";

const API_KEY_ENV = "N8N_BLOG_API_KEY";

/**
 * Write endpoint for the n8n blog pipeline. This is the only writer to the
 * posts collection, gated by a shared secret.
 *
 * Firestore (unlike the Supabase version this replaced) has no join tables, so
 * categories and tags are stored as arrays on the post document. That removes
 * the separate category/tag sync pass entirely — a single `setDoc` is the whole
 * write.
 */

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(80)
  // Document IDs become path segments; restrict to URL-safe characters.
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase alphanumeric with hyphens");

const blogPayloadSchema = z
  .object({
    action: z.enum(["upsert", "delete"]).default("upsert"),
    slug: slugSchema,
    title: z.string().trim().min(1).max(300).optional(),
    excerpt: z.string().trim().max(500).optional(),
    content: z.string().min(1).max(400_000).optional(),
    author: z.string().trim().max(200).optional(),
    published: z.boolean().optional(),
    published_at: z.string().datetime({ offset: true }).optional(),
    featured_image: z.string().url().max(2000).optional(),
    categories: z.array(z.string().trim().min(1).max(80)).max(20).optional(),
    tags: z.array(z.string().trim().min(1).max(80)).max(30).optional(),
    reading_time: z.string().trim().max(40).optional(),
    word_count: z.number().int().positive().max(100_000).optional(),
    focus_keyword: z.string().trim().max(200).optional(),
    meta_title: z.string().trim().max(200).optional(),
    meta_description: z.string().trim().max(400).optional(),
    faqs: z
      .array(
        z.object({ q: z.string().trim().min(1).max(300), a: z.string().trim().min(1).max(3000) }),
      )
      .max(20)
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (val.action === "upsert" && (!val.title || !val.content)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "title and content are required when action is 'upsert'",
        path: ["content"],
      });
    }
  });

/**
 * Constant-time comparison. A plain `!==` leaks the secret's prefix through
 * response timing, which matters because this endpoint is internet-facing.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Dedupe + trim, so ["AI", "ai "] doesn't create two near-identical entries. */
function normalizeList(values: string[] | undefined): string[] | undefined {
  if (!values) return undefined;
  const seen = new Set<string>();
  for (const v of values) seen.add(v.trim());
  return [...seen];
}

/**
 * Firestore rejects `undefined` anywhere in a document — even nested — so
 * omitted optional fields must be dropped, not written as undefined — Firestore
 * rejects undefined anywhere in a document, and writing a null instead would
 * overwrite an existing value.
 */
/** Normalises an ISO timestamp, or undefined when absent/unparseable. */
function toIsoOrUndefined(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function definedOnly<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k as keyof T] = v as T[keyof T];
  }
  return out;
}

/** Word count from the markdown source, ignoring fenced/inline code markers. */
function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_~\-[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

async function upsertPost(payload: z.infer<typeof blogPayloadSchema>) {
  const now = new Date();
  const existing = await firestoreGetDoc(POSTS_COLLECTION, payload.slug);

  const seo = definedOnly({
    meta_title: payload.meta_title,
    meta_description: payload.meta_description,
    focus_keyword: payload.focus_keyword,
    reading_time: payload.reading_time,
    // Computed from the body when the caller doesn't supply it, so `wordCount`
    // in the Article JSON-LD is always present and always accurate.
    word_count: payload.word_count ?? countWords(payload.content!),
  });

  // Fields absent from the payload are omitted so `merge` preserves whatever is
  // already stored. This matters most for the approval call, which typically
  // sends just `{slug, title, content, published: true}` — defaulting these to
  // `[]`/`{}` would silently wipe curated tags, categories and SEO metadata.
  // An explicit `[]` from the caller still means "clear these".
  const doc = definedOnly({
    slug: payload.slug,
    title: payload.title!,
    // A brand-new post with no excerpt falls back to its title; an existing
    // post keeps the excerpt it already has.
    excerpt: payload.excerpt ?? (existing ? undefined : payload.title),
    content: payload.content!,
    author: payload.author,
    published: payload.published ?? (existing ? undefined : false),
    // New posts get a sort date; existing posts keep theirs unless the caller
    // supplies a new one, so re-publishing a draft never resets its date.
    // Stored as an RFC3339 string. Omitted entirely when the caller does not
    // send one on an existing post, so the original date survives a rewrite.
    published_at: toIsoOrUndefined(payload.published_at) ?? (existing ? undefined : now),
    updated_at: now,
    featured_image: payload.featured_image,
    categories: normalizeList(payload.categories),
    tags: normalizeList(payload.tags),
    faqs: payload.faqs,
    seo: Object.keys(seo).length > 0 ? seo : undefined,
  });

  await firestoreSetDoc(POSTS_COLLECTION, payload.slug, doc);

  return {
    slug: payload.slug,
    created: !existing,
    url: `/blog/${payload.slug}`,
  };
}

export const Route = createFileRoute("/api/blog/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expectedKey = process.env[API_KEY_ENV];
        if (!expectedKey) {
          console.error(`${API_KEY_ENV} is not configured — rejecting blog webhook`);
          return json({ error: "Server configuration error" }, 500);
        }

        const apiKey = request.headers.get("x-api-key") || "";
        if (!timingSafeEqual(apiKey, expectedKey)) {
          return json({ error: "Unauthorized" }, 401);
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ error: "Request body must be valid JSON" }, 400);
        }

        const parsed = blogPayloadSchema.safeParse(raw);
        if (!parsed.success) {
          return json(
            {
              error: "Invalid payload",
              details: parsed.error.issues.map((i) => ({
                field: i.path.join(".") || "(root)",
                message: i.message,
              })),
            },
            400,
          );
        }

        const payload = parsed.data;

        try {
          if (payload.action === "delete") {
            // firestoreDeleteDoc reports whether the document existed, so a
            // missing slug is a 404 rather than a misleading success.
            const deleted = await firestoreDeleteDoc(POSTS_COLLECTION, payload.slug);
            if (!deleted) {
              return json({ error: `No post with slug "${payload.slug}"` }, 404);
            }
            return json({ success: true, action: "delete", slug: payload.slug }, 200);
          }

          const result = await upsertPost(payload);
          return json({ success: true, action: "upsert", ...result }, 200);
        } catch (err) {
          console.error("Blog webhook error:", err);
          const message = err instanceof Error ? err.message : "Internal error";
          // Firestore config failures surface as env-var errors; don't leak
          // their contents to the caller.
          const safe = /must be set|not configured/i.test(message)
            ? "Server configuration error"
            : "Failed to write post";
          return json({ error: safe }, 500);
        }
      },
    },
  },
});
