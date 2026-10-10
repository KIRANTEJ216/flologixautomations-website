# Firestore schema — FLA Blog

Project: `fla-blog`
Database: `(default)` · Location: `asia-south1`
PITR: enabled · Delete protection: enabled

All access is **server-side only** over the Firestore REST API v1, authenticated
with a service-account OAuth2 token signed via WebCrypto. `firestore.rules` denies
all client access on purpose — no client SDK is bundled, so a leaked key cannot read
or write the corpus.

The Firebase Admin SDK was tried first and abandoned: nitro bundles server code into
ESM, and google-gax's gRPC loader reads `__dirname` at import time, which threw
`ReferenceError: __dirname is not defined in ES module scope` in production while
working in dev. The REST API has no such constraint and removed ~9 MB from the
function bundle (21 MB → 2.7 MB total).

## Collections

### `posts/{slug}`

The document ID **is** the slug. No separate slug lookup, no ID/slug drift.

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | string | yes | Mirrors the doc ID. Lowercase, hyphenated, max 80 chars |
| `title` | string | yes | Rendered `<h1>` and `og:title`. Target ≤60 chars for SERP |
| `excerpt` | string | yes | Meta description + blog card summary. Target 140–160 chars |
| `content` | string | yes | **Markdown**, not HTML. Sanitized server-side by `marked` + `DOMPurify` |
| `author` | string | yes | Defaults to `FLOLOGIXAUTOMATIONS` |
| `published` | boolean | yes | `false` keeps a draft off the public site and out of the sitemap |
| `published_at` | timestamp | yes | RFC3339 string. Set from the n8n payload. Drives ordering |
| `updated_at` | timestamp | yes | Feeds `dateModified` and sitemap `<lastmod>` |
| `featured_image` | string | no | Absolute HTTPS URL. Falls back to `/og-image.jpg` |
| `categories` | string[] | no | Denormalized — no join table in Firestore |
| `tags` | string[] | no | Denormalized |
| `seo.meta_title` | string | no | Overrides `title` when set. For A/B titles without changing the H1 |
| `seo.meta_description` | string | no | Overrides `excerpt` |
| `seo.focus_keyword` | string | no | Primary keyword. Drives internal-link suggestions |
| `seo.reading_time` | string | no | e.g. `"7 min read"`. Computed if absent |
| `seo.word_count` | integer | no | Feeds `wordCount` in Article JSON-LD |
| `faqs` | `{q,a}[]` | no | Rendered visibly **and** emitted as `FAQPage` JSON-LD |

### Deliberately absent

`created_at` is not stored. Supabase set it automatically; Firestore has no
equivalent, and `updated_at` covers every read path the site needs.

## Indexes

| Index | Serves |
|---|---|
| `published ASC, published_at DESC` | `fetchAllPosts()` — blog listing |
| `categories CONTAINS, published_at DESC` | Related posts by category (Phase 3) |
| `tags CONTAINS, published_at DESC` | Related posts by tag (Phase 3) |

`content` and `excerpt` are excluded from automatic indexing — `content` holds full
markdown bodies and would bloat the index.

## Writing

Single `setDoc` on `posts/{slug}` — upsert is native, so there is no separate
create/update path. See `src/routes/api.blog.webhook.ts`.

Payload contract (unchanged from the Supabase version, so n8n needs no rework):

```jsonc
POST /api/blog/webhook
x-api-key: <N8N_BLOG_API_KEY>

{
  "action": "upsert",              // or "delete"
  "slug": "n8n-workflow-automation",
  "title": "...",
  "excerpt": "...",
  "content": "## Markdown ...",
  "author": "FLOLOGIXAUTOMATIONS",
  "published": true,               // false = draft
  "published_at": "2026-10-07T00:00:00Z",
  "featured_image": "https://...",
  "categories": ["n8n"],
  "tags": ["automation"]
}
```

## Writes

`firestoreSetDoc` sends an explicit `updateMask`. Firestore REST replaces the whole
document on a bare PATCH, so without the mask a minimal approval payload
(`{slug, title, content, published: true}`) would silently delete every tag,
category and SEO field it did not mention.

`firestoreDeleteDoc` reads first, because Firestore's DELETE is idempotent and
answers 200 whether or not the document existed — the caller needs that to return
an honest 404.

## Environment

Required in local `.env` and in Vercel:

```
FIREBASE_PROJECT_ID=fla-blog
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@fla-blog.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
N8N_BLOG_API_KEY=<32+ char random string>
```

`FIREBASE_PRIVATE_KEY` **must** be stored with escaped `\n`. Vercel's env UI
preserves literal newlines, and `credential.cert()` rejects a key containing them.

Local credential file lives outside the repo at `~/.flologix/fla-blog-service-account.json`
(mode 600) and is never committed.
