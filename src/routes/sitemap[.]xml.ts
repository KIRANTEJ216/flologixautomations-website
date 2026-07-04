import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type {} from "@tanstack/react-start";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";

const BASE_URL = "https://flologixautomations.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        let blogUrls: string[] = [];

        try {
          const supabaseUrl = process.env.SUPABASE_URL;
          const supabaseKey = process.env.SUPABASE_ANON_KEY;
          if (supabaseUrl && supabaseKey) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { data } = await supabase
              .from("posts")
              .select("slug")
              .eq("published", true);
            if (data) {
              blogUrls = data.map((p) => p.slug);
            }
          }
        } catch {
          // Supabase not configured — skip blog posts
        }

        const staticEntries = [
          { path: "/", changefreq: "weekly" as const, priority: "1.0" },
          { path: "/blog", changefreq: "weekly" as const, priority: "0.9" },
          { path: "/services", changefreq: "weekly" as const, priority: "0.9" },
          { path: "/locations", changefreq: "weekly" as const, priority: "0.9" },
          { path: "/industry", changefreq: "weekly" as const, priority: "0.9" },
          { path: "/solutions", changefreq: "weekly" as const, priority: "0.9" },
          { path: "/privacy", changefreq: "yearly" as const, priority: "0.3" },
          { path: "/terms", changefreq: "yearly" as const, priority: "0.3" },
        ];

        const serviceUrls = services.map((s) => ({
          path: `/services/${s.slug}`,
          changefreq: "monthly" as const,
          priority: "0.8",
        }));

        const locationUrls = locations.map((l) => ({
          path: `/locations/${l.slug}`,
          changefreq: "monthly" as const,
          priority: "0.8",
        }));

        const industryUrls = industries.map((i) => ({
          path: `/industry/${i.slug}`,
          changefreq: "monthly" as const,
          priority: "0.7",
        }));

        const solutionUrls = solutions.map((s) => ({
          path: `/solutions/${s.slug}`,
          changefreq: "monthly" as const,
          priority: "0.7",
        }));

        const allUrls = [...staticEntries, ...serviceUrls, ...locationUrls, ...industryUrls, ...solutionUrls];

        const blogEntries = blogUrls.map(
          (slug) =>
            `  <url>\n    <loc>${BASE_URL}/blog/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
        );

        const urls = [
          ...allUrls.map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          ),
          ...blogEntries,
        ].join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
