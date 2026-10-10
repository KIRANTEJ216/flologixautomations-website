import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getFeedPosts } from "@/utils/blog.server";
import { SITE_URL, SITE_NAME } from "@/seo/metadata";

function cdata(value: string): string {
  // Strip characters that would terminate a CDATA section, then escape ampersands
  // so the value round-trips correctly in every feed reader.
  return value.replace(/]]>/g, "]]]]><![CDATA[>").replace(/&/g, "&amp;");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export const Route = createFileRoute("/blog/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        let entries: Awaited<ReturnType<typeof getFeedPosts>> = [];
        try {
          entries = await getFeedPosts(50);
        } catch (err) {
          console.error("rss: failed to load posts:", err);
        }

        const items = entries
          .map(
            (e) => `    <item>
      <title>${escapeXml(e.title)}</title>
      <link>${SITE_URL}/blog/${e.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${e.slug}</guid>
      <pubDate>${rfc822(e.published_at)}</pubDate>
${e.updated_at ? `      <atom:updated>${escapeXml(e.updated_at)}</atom:updated>\n` : ""}      <description><![CDATA[${cdata(e.excerpt)}]]></description>
    </item>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — AI &amp; Automation Insights</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Practical articles on AI agents, workflow automation, and the systems behind modern businesses.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(entries[0]?.updated_at || entries[0]?.published_at || "")}</lastBuildDate>
${items}
  </channel>
</rss>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
