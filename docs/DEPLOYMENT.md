# Deploying

Target: **Vercel**, via nitro. `vite.config.ts` pins `nitro.preset: "vercel"` —
without it nitro defaults to `cloudflare-module`, which is wrong for this project.

## Build

```bash
bun install
bun run build     # -> .vercel/output/
```

## Preview the real artifact

`bun run preview` (`vite preview`) does **not** work — it looks for
`dist/server/server.js`, but the nitro preset emits `.vercel/output/`. Use the
command in `.vercel/output/nitro.json`:

```bash
cd .vercel/output
npx srvx --static ../../static ./functions/__server.func/index.mjs
```

It needs the env vars below loaded into the shell, or the blog silently renders
empty (`fetchAllPosts` swallows the error) and every post URL 404s.

## Environment variables

Set all of these in **Vercel → Settings → Environment Variables**.

| Variable | Notes |
|---|---|
| `SITE_URL` | Canonical origin, `https://www.flologixautomations.com`. Drives canonicals, OG tags, JSON-LD `@id`, sitemap, RSS. Set it explicitly; `public/robots.txt` is static and must be edited by hand to match. |
| `FIREBASE_PROJECT_ID` | `fla-blog` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-…@fla-blog.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | **Must keep escaped `\n`.** The Vercel UI preserves literal newlines, which `pemToDer` rejects. |
| `N8N_BLOG_API_KEY` | Shared secret for `POST /api/blog/webhook`. `openssl rand -hex 32` |
| `N8N_WEBHOOK_URL` | Existing n8n contact-form webhook |

`SITE_URL` defaults to `https://www.flologixautomations.com`, so the site emits
correct canonicals even if the variable is never set.

The **www** host is canonical: the apex `flologixautomations.com` 307-redirects to
it. Pointing canonicals, the sitemap or RSS at the apex makes every URL read as a
redirect to crawlers, so never do that. Remember `public/robots.txt` is static and
must be edited by hand to match.

## Deploy

```bash
npx vercel deploy --prebuilt     # .vercel/output is already built
```

## After deploying

1. Confirm `SITE_URL` matches the live domain and that canonicals point at it —
   `curl -s https://<domain>/ | grep rel="canonical"`.
2. Re-run the n8n workflow (`docs/n8n/`) against the live domain.
3. Submit `https://<domain>/sitemap.xml` in Google Search Console.
4. Confirm `/blog/rss.xml` returns 4+ `<item>` entries — an empty feed there
   means the server env vars are missing, not that the feed is broken.

## Bundle

~2.7 MB total (816 KB static, 1.9 MB server function). Well inside Vercel's
limits. `firebase-admin`, `jsdom` and `grpc-js` are not in the bundle.
