/**
 * Appended to every `<title>` as `" | Flologix Automations"`.
 *
 * Spelled with a space and title case rather than as one all-caps token: the
 * unspaced form cost 16 characters of every title tag, which is budget taken
 * straight out of the page's own descriptive keywords, and all-caps reads as
 * shouting in the SERP.
 */
const SITE_NAME = "Flologix Automations";

/**
 * Suffix appended to `<title>` tags — deliberately shorter than SITE_NAME.
 *
 * Google truncates titles at roughly 55–60 characters. Using the full brand
 * name here pushed 27 of 31 titles to 70–85 characters, so the distinguishing
 * keyword half of every title was being cut off in the SERP. Eleven characters
 * buys back that budget; the full name still carries in schema, where there is
 * no length limit.
 */
const TITLE_SUFFIX = " | Flologix";

/**
 * Canonical origin for every absolute URL the site emits — canonicals, Open
 * Graph tags, JSON-LD `@id`, sitemap `<loc>`, RSS.
 *
 * Single source of truth: routes import this rather than redeclaring it, which
 * is what previously let one route keep a stale host while the rest were fixed.
 *
 * Defaults to the live host, which is the `www` subdomain: the apex
 * `flologixautomations.com` 307-redirects here, so canonicals and sitemap
 * `<loc>` entries must use www or every URL reads as a redirect to crawlers.
 *
 * Defaulting (rather than requiring the variable) matters because `__root.tsx`
 * shims `process` on the client, leaving `process.env.SITE_URL` empty during
 * client-side navigation — a required var would emit the wrong host there.
 * Keep `public/robots.txt` in sync; that file is static and cannot read env.
 */
const DEFAULT_SITE_URL = "https://www.flologixautomations.com";

const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: "summary_large_image";
  keywords?: string;
}

export function buildMeta(
  path: string,
  title: string,
  desc: string,
  extraKeywords?: string,
): PageMeta {
  const fullUrl = `${SITE_URL}${path}`;
  return {
    title: `${title}${TITLE_SUFFIX}`,
    description: desc.slice(0, 160),
    canonical: fullUrl,
    ogTitle: title,
    ogDescription: desc.slice(0, 160),
    ogImage: `${SITE_URL}/og-image.jpg`,
    ogType: "website",
    twitterCard: "summary_large_image",
    keywords: extraKeywords,
  };
}

export function metaToTags(meta: PageMeta) {
  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    { name: "keywords", content: meta.keywords },
    { property: "og:title", content: meta.ogTitle },
    { property: "og:description", content: meta.ogDescription },
    { property: "og:image", content: meta.ogImage },
    { property: "og:type", content: meta.ogType },
    { property: "og:url", content: meta.canonical },
    { property: "og:site_name", content: SITE_NAME },
    { name: "twitter:card", content: meta.twitterCard },
    { name: "twitter:title", content: meta.ogTitle },
    { name: "twitter:description", content: meta.ogDescription },
    { name: "twitter:image", content: meta.ogImage },
    // The previous `.filter((t) => t.content)` dropped the title entry, because a
    // title tag carries `title` and has no `content`. That silently removed
    // <title> from every page using these helpers (all PSEO routes) — they were
    // only getting a title after client-side hydration, so non-JS crawlers and
    // social scrapers saw no title at all. Keep entries that carry either key.
  ].filter((t) => t.title || t.content);
}

export function canonicalLink(href: string) {
  return { rel: "canonical", href };
}

export { SITE_URL, SITE_NAME };
