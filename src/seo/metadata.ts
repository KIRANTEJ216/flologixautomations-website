const SITE_URL = "https://flologixautomations.lovable.app";
const SITE_NAME = "FLOLOGIXAUTOMATIONS";

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

export function buildMeta(path: string, title: string, desc: string, extraKeywords?: string): PageMeta {
  const fullUrl = `${SITE_URL}${path}`;
  return {
    title: `${title} | ${SITE_NAME}`,
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
  ].filter((t) => t.content);
}

export function canonicalLink(href: string) {
  return { rel: "canonical", href };
}

export { SITE_URL, SITE_NAME };
