import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import { getPublishedPostSlugs } from "@/utils/blog.server";
import { SITE_URL } from "@/seo/metadata";

interface SitemapEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
}

/**
 * `<lastmod>` for the static/PSEO routes. Evaluated once per request, so it
 * advances whenever the site is (re)deployed — which is the honest signal for
 * these pages: their content only changes when a build ships.
 */
const BUILD_DATE = new Date().toISOString();

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderEntry(entry: SitemapEntry): string {
  const parts = ["  <url>", `    <loc>${xmlEscape(`${SITE_URL}${entry.path}`)}</loc>`];
  if (entry.lastmod) {
    parts.push(`    <lastmod>${xmlEscape(entry.lastmod.slice(0, 10))}</lastmod>`);
  }
  parts.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  parts.push(`    <priority>${entry.priority}</priority>`);
  parts.push("  </url>");
  return parts.join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // A sitemap that fails to build is worse than one missing blog posts:
        // return the static entries regardless of whether Firestore is reachable.
        let blogEntries: SitemapEntry[] = [];
        try {
          blogEntries = (await getPublishedPostSlugs()).map((post) => ({
            path: `/blog/${post.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
            lastmod: post.updated_at || post.published_at || undefined,
          }));
        } catch (err) {
          console.error("sitemap: failed to load blog slugs:", err);
        }

        // Privacy/Terms are `noindex` — keep them out of the sitemap so we never
        // invite crawlers to index pages we ask them to skip.
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: BUILD_DATE },
          { path: "/services", changefreq: "weekly", priority: "0.9", lastmod: BUILD_DATE },
          { path: "/solutions", changefreq: "weekly", priority: "0.9", lastmod: BUILD_DATE },
          { path: "/industry", changefreq: "weekly", priority: "0.8", lastmod: BUILD_DATE },
          { path: "/locations", changefreq: "weekly", priority: "0.8", lastmod: BUILD_DATE },
          { path: "/blog", changefreq: "daily", priority: "0.9", lastmod: BUILD_DATE },
          { path: "/about", changefreq: "monthly", priority: "0.6", lastmod: BUILD_DATE },
        ];

        const dynamicEntries: SitemapEntry[] = [
          ...services.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.9",
            lastmod: BUILD_DATE,
          })),
          ...locations.map((l) => ({
            path: `/locations/${l.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod: BUILD_DATE,
          })),
          ...industries.map((i) => ({
            path: `/industry/${i.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod: BUILD_DATE,
          })),
          ...solutions.map((s) => ({
            path: `/solutions/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod: BUILD_DATE,
          })),
        ];

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...[...staticEntries, ...dynamicEntries, ...blogEntries].map(renderEntry),
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
