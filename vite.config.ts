import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    // Hard-pin the deploy target. Without this, nitro defaults to
    // cloudflare-module, which is wrong for this project's Vercel hosting.
    preset: "vercel",

    // TanStack Start's route handlers return a Response whose headers are
    // discarded by the node adapter (srvx, and Vercel behind it), so
    // /sitemap.xml and /blog/rss.xml were served as `text/html` with no
    // Cache-Control — setResponseHeaders on the request context does not
    // survive either. Route rules are applied by nitro itself, below the
    // handler, so they do stick in the deployed function.
    routeRules: {
      "/sitemap.xml": {
        headers: {
          "content-type": "application/xml; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      },
      "/blog/rss.xml": {
        headers: {
          "content-type": "application/rss+xml; charset=utf-8",
          "cache-control": "public, max-age=1800",
        },
      },
    },
  },
});
