import { createServerFn } from "@tanstack/react-start";
import { marked } from "marked";
import { sanitizeHtmlContent } from "@/utils/sanitize.server";
import { z } from "zod";
import {
  firestoreQuery,
  firestoreGetDoc,
  POSTS_COLLECTION,
  type FirestoreDoc,
  type QueryOptions,
} from "@/utils/firestore.server";

export interface PostSeo {
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  reading_time?: string;
  word_count?: number;
}

export interface PostFaq {
  q: string;
  a: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  categories: string[];
  tags: string[];
  featured_image?: string;
  seo?: PostSeo;
  faqs?: PostFaq[];
  updated_at?: string;
}

export interface Post extends PostMeta {
  html: string;
}

const LIST_LIMIT = 50;

/**
 * Every read filters `published == true` in exactly one place. Firestore
 * requires the first `where` to be an equality filter on an indexed field, so
 * callers compose their remaining conditions on top of this.
 */
function queryPublished(
  options: Omit<QueryOptions, "collection" | "where"> & {
    where?: QueryOptions["where"];
  },
): Promise<FirestoreDoc[]> {
  return firestoreQuery({
    // Spread first: anything after it would clobber the published filter and
    // put drafts in front of readers.
    ...options,
    collection: POSTS_COLLECTION,
    // Always first: Firestore rejects a leading non-equality filter.
    where: [{ field: "published", op: "EQUAL", value: true }, ...(options.where ?? [])],
  });
}

/**
 * The REST client decodes Firestore timestampValue into an RFC3339 string
 * already, so this only has to normalise the "absent or unusable" cases.
 */
function toIso(value: unknown): string {
  if (typeof value === "string" && value && !Number.isNaN(new Date(value).getTime())) return value;
  return "";
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function toFaqs(value: unknown): PostFaq[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const faqs = value
    .filter((v): v is Record<string, unknown> => !!v && typeof v === "object")
    .map((v) => ({ q: String(v.q ?? ""), a: String(v.a ?? "") }))
    .filter((f) => f.q && f.a);
  return faqs.length > 0 ? faqs : undefined;
}

function toSeo(value: unknown): PostSeo | undefined {
  if (!value || typeof value !== "object") return undefined;
  const s = value as Record<string, unknown>;
  const seo: PostSeo = {};
  if (typeof s.meta_title === "string") seo.meta_title = s.meta_title;
  if (typeof s.meta_description === "string") seo.meta_description = s.meta_description;
  if (typeof s.focus_keyword === "string") seo.focus_keyword = s.focus_keyword;
  if (typeof s.reading_time === "string") seo.reading_time = s.reading_time;
  if (typeof s.word_count === "number") seo.word_count = s.word_count;
  return Object.keys(seo).length > 0 ? seo : undefined;
}

type RawDoc = Record<string, unknown>;

function toMeta(slug: string, data: RawDoc): PostMeta {
  return {
    slug: typeof data.slug === "string" ? data.slug : slug,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    author: String(data.author ?? "FLOLOGIXAUTOMATIONS"),
    published_at: toIso(data.published_at),
    updated_at: toIso(data.updated_at),
    categories: toStringArray(data.categories),
    tags: toStringArray(data.tags),
    featured_image: typeof data.featured_image === "string" ? data.featured_image : undefined,
    seo: toSeo(data.seo),
    faqs: toFaqs(data.faqs),
  };
}

/** Rough reading time at 200 wpm, used when the post doesn't specify one. */
function estimateReadingTime(html: string): string {
  const words = html.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export const fetchAllPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const docs = await queryPublished({
      orderBy: [{ field: "published_at", direction: "DESCENDING" }],
      limit: LIST_LIMIT,
    });
    const posts = docs.map((d) => toMeta(d.id, d.data as RawDoc));
    return { posts, error: null };
  } catch (err) {
    console.error("fetchAllPosts error:", err);
    return { posts: [] as PostMeta[], error: "Failed to load posts" };
  }
});

export const fetchPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => z.string().trim().min(1).parse(slug))
  .handler(async ({ data: slug }) => {
    try {
      const data = (await firestoreGetDoc(POSTS_COLLECTION, slug)) as RawDoc | null;

      // Missing doc and unpublished doc are deliberately indistinguishable:
      // a draft must not be discoverable by probing slugs.
      if (!data || data.published !== true) return { post: null, error: "Post not found" };

      const meta = toMeta(slug, data);
      const html = sanitizeHtmlContent(await marked.parse(String(data.content ?? "")));

      if (!meta.seo?.reading_time) {
        meta.seo = { ...meta.seo, reading_time: estimateReadingTime(html) };
      }

      return { post: { ...meta, html } as Post, error: null };
    } catch (err) {
      console.error("fetchPost error:", err);
      return { post: null, error: "Failed to load post" };
    }
  });

export interface PostSlug {
  slug: string;
  published_at: string;
  updated_at: string;
}

export interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  published_at: string;
  categories: string[];
}

/**
 * Metadata-only feed data for the RSS route. Plain server function (not a
 * createServerFn) because RSS is a route handler with no component, and it
 * shares queryPublished so the `published == true` filter stays in one place.
 */
export function getFeedPosts(limit = 50) {
  return queryPublished({
    orderBy: [{ field: "published_at", direction: "DESCENDING" }],
    limit,
  }).then((docs) =>
    docs.map((d) => {
      const data = d.data as RawDoc;
      return {
        slug: d.id,
        title: String(data.title ?? d.id),
        excerpt: String(data.excerpt ?? ""),
        published_at: toIso(data.published_at),
        updated_at: toIso(data.updated_at),
      };
    }),
  );
}

export function getPublishedPostSlugs(): Promise<PostSlug[]> {
  return queryPublished({}).then((docs) =>
    docs.map((d) => {
      const data = d.data as RawDoc;
      return {
        slug: d.id,
        published_at: toIso(data.published_at),
        updated_at: toIso(data.updated_at),
      };
    }),
  );
}

/**
 * Related posts for the footer of a post page, ranked by shared categories and
 * tags. Uses the array-CONTAINS composite indexes from firestore.indexes.json.
 *
 * Falls back to simply excluding the current post when a post has no
 * categories or tags, so the section is never empty for no reason.
 *
 * Server-only. Callers in route files that also export a component must go
 * through `fetchRelatedPosts` below rather than importing this directly.
 */
async function getRelatedPosts(
  currentSlug: string,
  categories: string[],
  tags: string[],
  limit = 3,
): Promise<RelatedPost[]> {
  const run = async () => {
    const seen = new Set<string>([currentSlug]);
    const scored: { post: RelatedPost; score: number }[] = [];

    const consider = (data: RawDoc, id: string, weight: number) => {
      if (seen.has(id)) return;
      seen.add(id);
      scored.push({ post: toRelated(data, id), score: weight });
    };

    // One query per matching category, newest first.
    for (const category of categories.slice(0, 3)) {
      const docs = await queryPublished({
        where: [{ field: "categories", op: "ARRAY_CONTAINS", value: category }],
        orderBy: [{ field: "published_at", direction: "DESCENDING" }],
        limit: limit + 1,
      });
      docs.forEach((d) => consider(d.data as RawDoc, d.id, 2));
    }

    for (const tag of tags.slice(0, 3)) {
      const docs = await queryPublished({
        where: [{ field: "tags", op: "ARRAY_CONTAINS", value: tag }],
        orderBy: [{ field: "published_at", direction: "DESCENDING" }],
        limit: limit + 1,
      });
      docs.forEach((d) => consider(d.data as RawDoc, d.id, 1));
    }

    scored.sort(
      (a, b) => b.score - a.score || (a.post.published_at < b.post.published_at ? 1 : -1),
    );

    if (scored.length < limit) {
      const docs = await queryPublished({
        orderBy: [{ field: "published_at", direction: "DESCENDING" }],
        limit: limit + 2,
      });
      docs.forEach((d) => consider(d.data as RawDoc, d.id, 0));
    }

    return scored.slice(0, limit).map((s) => s.post);
  };

  return run().catch((err) => {
    console.error("getRelatedPosts error:", err);
    return [];
  });
}

function toRelated(data: RawDoc, id: string): RelatedPost {
  return {
    slug: typeof data.slug === "string" ? data.slug : id,
    title: String(data.title ?? ""),
    excerpt: String(data.excerpt ?? ""),
    published_at: toIso(data.published_at),
    categories: toStringArray(data.categories),
  };
}

export interface RelatedInput {
  slug: string;
  categories: string[];
  tags: string[];
  limit?: number;
}

/**
 * createServerFn wrapper so TanStack Start splits the implementation out of the
 * client bundle. Route files that also export a React component must use this
 * rather than calling getRelatedPosts directly.
 */
export const fetchRelatedPosts = createServerFn({ method: "GET" })
  .inputValidator((input: RelatedInput) =>
    z
      .object({
        slug: z.string().trim().min(1),
        categories: z.array(z.string()).max(50),
        tags: z.array(z.string()).max(50),
        limit: z.number().int().positive().max(12).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) =>
    getRelatedPosts(data.slug, data.categories, data.tags, data.limit ?? 3),
  );
