# SEO Audit & Recovery Plan — flologixautomations.com

**Audit date:** 10 October 2026
**Scope:** www.flologixautomations.com — full public crawl (31 sitemap URLs), live-server checks, source-code review
**Business:** AI Automation Agency (n8n workflows, AI agents, WhatsApp/Telegram bots, RAG, invoice OCR)
**Audience:** SMBs scaling with automation
**Primary goals:** Organic traffic → leads → sales
**Target keywords:** `automations`, `ai automations`, `chatbot`, `agentic development`, `whatsapp bot`

---

## Executive summary

**The site is currently unable to rank for any keyword.**

Google is being told, via canonicals, robots.txt and the XML sitemap, that the authoritative version of this website is `flologixautomations.lovable.app` — a Lovable preview domain — rather than your own domain. On top of that, **90% of your pages have no `<title>` tag at all**, your entire blog section returns HTTP 500, and every page links to `/case-studies/*` URLs that 404.

There is one critical piece of good news: **someone has already fixed most of this in your local working tree, and it has simply never been committed or deployed.** 26 modified files sit uncommitted on disk. The deployed production build is running the old, broken version.

**The single highest-ROI action is to commit and deploy the existing fix.** This is not new work — it is shipping work already done.

### Findings at a glance

| Severity | Count | Issue |
|---|---|---|
| 🔴 Critical | 1 | Canonical/sitemap/robots all point to `lovable.app` |
| 🔴 Critical | 1 | Fabricated `AggregateRating` schema (manual-action risk) |
| 🔴 Critical | 1 | `/blog` + all blog posts return HTTP 500 |
| 🔴 Critical | 27 | Pages with **no `<title>` tag** |
| 🟠 High | 3 | `/case-studies/*` 404s, linked site-wide |
| 🟠 High | 1 | `lovable.app` still live, serving different content |
| 🟡 Medium | 5 | Target keyword `agentic` absent sitewide (0 uses) |
| 🟡 Medium | — | No `BreadcrumbList` on PSEO pages; homepage description >160 chars |

---

## 1. Most important SEO problems

Ranked by direct impact on rankings and leads.

### 1.1 🔴 CRITICAL — Your canonical domain is a third-party preview URL

Every signal Google uses to identify your site points at `flologixautomations.lovable.app`:

```
robots.txt   Sitemap: https://flologixautomations.lovable.app/sitemap.xml
sitemap.xml  31/31 URLs → https://flologixautomations.lovable.app
canonical    every page → https://flologixautomations.lovable.app
og:url       https://flologixautomations.lovable.app/...
og:image     https://flologixautomations.lovable.app/og-image.jpg
```

**Why this is severe:** a canonical tag is a *direct instruction* to Google — "index this version instead." You have instructed Google to index Lovable's preview domain and treat your own domain as the duplicate. Consequences:

- All ranking signals and link equity accrue to `lovable.app`, not your domain
- Your domain can be dropped from the index or heavily suppressed
- If `lovable.app` is ever paused or reassigned, your indexed URLs 404 overnight
- You do not control the server, DNS, or uptime of the domain Google is indexing

**Compounding factor:** `lovable.app` is **still live** and serving **different, older content**:

| Domain | Title served |
|---|---|
| `www.flologixautomations.com` | AI Automation Agency \| n8n Workflows, **AI Agents & RAG Systems** |
| `flologixautomations.lovable.app` | AI Automation Agency \| **n8n Workflows & AI Agents** |

Google sees two live domains with conflicting content and a canonical pointing at the wrong one — a textbook duplicate-content and domain-migration failure.

### 1.2 🔴 CRITICAL — Fabricated review schema (manual-action risk)

Your homepage JSON-LD contains:

```json
"aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "27" }
```

I searched the rendered page: **there is no visible review content, no testimonial markup, and no review widget.** The 4.9/27 figures are hardcoded.

Google's structured-data policy requires that rating markup reflect **genuine, user-visible reviews**. Marking up ratings that don't exist on the page is a violation that can trigger:

- A **manual action** ("Structured data spam") — the only category here that can penalise the *whole domain*
- Loss of all rich results (stars, FAQ accordions, price range)
- Suppression of pages in mobile search

This is the highest-risk item in the audit. It is also the easiest to fix — see §8.

### 1.3 🔴 CRITICAL — 27 of 30 pages have no `<title>` tag

Verified by fetching every URL as Googlebot:

```
HTTP 200 WITH <title> : 3      (/, /privacy, /terms)
HTTP 200 WITHOUT title: 27
```

And of those 3 that have titles, 2 are legal pages you never want ranked. **Effectively 100% of your commercial pages are untitled.**

Without a `<title>`, Google generates one from the H1 or page copy. You lose control of your most important ranking and CTR signal, and your SERP snippets are being auto-generated.

**Root cause (confirmed in code):** `src/seo/metadata.ts` had a filter that dropped every entry lacking a `content` key. A `<title>` tag carries `title`, not `content` — so it was silently removed from every page using the shared helpers (all PSEO routes). **The working tree already contains this fix** (line 75: `.filter((t) => t.title || t.content)`). It is simply not deployed.

### 1.4 🔴 CRITICAL — Your entire blog returns HTTP 500

```
/blog                                → 500
/blog/ai-agents-reshaping-support    → 500
/blog/automation-quick-wins          → 500
/blog/rag-vs-fine-tuning            → 500
/blog/whatsapp-automation-workflows  → 500
```

The blog was migrated from local markdown (`src/content/blog/`) to **Firestore**. The markdown files are staged for deletion in your working tree. The 500s are almost certainly **missing `FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` environment variables on the Vercel deployment** — `.env` is not deployed; Vercel needs them set in its dashboard.

This costs you: the entire `/blog` hub, all blog-level keywords, and internal link targets.

### 1.5 🟠 HIGH — Every page links to 404 pages

All pages link to:

```
/case-studies/marketing-agency-5x-capacity          → 404
/case-studies/financial-services-compliance-automation → 404
/case-studies/b2b-services-shipment-automation      → 404
/case-studies                                         → 404
```

There is no `/case-studies` route. This leaks internal PageRank into 404s across the entire site and wastes crawl budget.

Your working tree already fixes this with `CASE_STUDIES_ROUTE_EXISTS = false` (in `src/seo/internal-links.ts`), which strips the section. **Also not deployed.**

**Recommendation:** the `caseStudies` data set is complete and high-value (challenge/solution/results with real metrics). Rather than hiding it, **build the `/case-studies` route** — this is your strongest E-E-A-T asset for `automations` and `AI automation` queries.

---

## 2. Technical SEO issues to investigate

### Verified good

| Check | Status |
|---|---|
| Apex → www redirect | ✅ HTTP 307, correct |
| `www` serves 200 | ✅ |
| HTTPS | ✅ |
| TTFB | ✅ 0.33s (fast) |
| Homepage HTML weight | ✅ 60 KB (lean) |
| `max-image-preview:large` | ✅ present |
| `robots.txt` allows all | ✅ (content is wrong, not restrictive) |
| Render-blocking fonts | ✅ 1 stylesheet, 1 font CSS |
| `lang="en"` set | ✅ |

### Issues

| # | Issue | Detail | Priority |
|---|---|---|---|
| T1 | Canonical host wrong | All pages → lovable.app | 🔴 P0 |
| T2 | Sitemap host wrong | 31/31 lovable.app | 🔴 P0 |
| T3 | robots.txt sitemap host wrong | Points to lovable.app | 🔴 P0 |
| T4 | No redirect from lovable.app | Third-party domain still resolves and is indexed-eligible | 🔴 P0 |
| T5 | Blog 500s | Missing Firebase env vars on Vercel | 🔴 P0 |
| T6 | 404 internal links | `/case-studies/*` site-wide | 🟠 P1 |
| T7 | No canonical on `/privacy`, `/terms` | Minor (both should be `noindex` anyway) | 🟢 P3 |
| T8 | `og:image` on lovable.app | Social shares point to third-party CDN | 🟠 P1 |
| T9 | Firebase env in repo `.env` | `.env` holds a live private key — ensure it is gitignored and rotated | 🔴 P0 |
| T10 | No `BreadcrumbList` on PSEO pages | Homepage/services have 4 schemas; PSEO pages have 0–2 | 🟡 P2 |

**On T4 — critical action.** You must add a permanent redirect from `flologixautomations.lovable.app` → `https://www.flologixautomations.com/[same path]`. Without it, Google can treat both domains as competing. You need this set in whichever provider controls the lovable.app DNS.

---

## 3. On-page SEO issues

### Title tags

| Page | Title |
|---|---|
| `/` | AI Automation Agency \| n8n Workflows, AI Agents & RAG Systems (65 chars ✅) |
| `/privacy`, `/terms` | Present |
| **All 27 others** | **MISSING** |

The one title that exists is well-constructed. Once the `metadata.ts` fix deploys, all PSEO pages inherit `<page title> | FLOLOGIXAUTOMATIONS` — e.g. *"n8n Workflow Automation Services | FLOLOGIXAUTOMATIONS"* (51 chars ✅).

**One fix before deploying:** `SITE_NAME` is `FLOLOGIXAUTOMATIONS` (all-caps, 16 chars), which eats ~17 characters of every title and reads as shouting. Consider `"Flologix Automations"` or `"Flologix"`.

### Meta descriptions

| Page | Length | Note |
|---|---|---|
| `/` | **205 chars** | Truncated at ~155. CTA "Hire a top AI automation agency" is cut off |
| PSEO pages | 121–163 chars | Mostly ✅ |

Homepage description must be rewritten to ≤155 chars with the CTA intact.

### Keywords

Your `keywords` meta tag is loaded via `metaToTags()` but **modern Google ignores it**. Harmless, but it is dead weight — do not spend time optimising it.

### Heading structure

Verified on `/services/n8n-workflow-automation`: 1× H1, 8× H2, 4× H3, 3× H4 — **good hierarchy**, no skipped levels. This is a genuine strength.

However: H1s on PSEO pages are brand-styled, not keyword-led. Verify each page's H1 contains the page's target term.

### Structured data

| Page type | Schemas present |
|---|---|
| Homepage | Organization, ProfessionalService, WebSite, SearchAction, FAQPage (4 Q), OfferCatalog (7 Offers), **AggregateRating ⚠️** |
| `/services/*` | 4 blocks (Service, BreadcrumbList, FAQPage, …) |
| `/industry/*` | 2 blocks |
| `/solutions/*` | 3 blocks |
| `/locations/*` | 4 blocks |

`BreadcrumbList` exists on service/location pages but not on all PSEO types — standardise it.

---

## 4. Content quality problems

### Keyword presence (occurrences of exact term in rendered text)

| Page | automations | ai automation | chatbot | **agentic** | whatsapp bot | ai agent |
|---|---|---|---|---|---|---|
| `/` | 1 | 1 | 1 | **0** | 1 | 1 |
| `/services` | 1 | 1 | 1 | **0** | 0 | 1 |
| `/services/n8n-workflow-automation` | 1 | 1 | 0 | **0** | 1 | 1 |
| `/services/ai-agent-development` | 1 | 1 | 1 | **0** | 1 | 1 |
| `/services/whatsapp-automation` | 1 | 1 | 1 | **0** | 1 | 1 |
| `/solutions/reduce-operational-costs` | 1 | 1 | 0 | **0** | 0 | 1 |
| `/industry/healthcare` | 1 | 1 | 1 | **0** | 0 | 1 |
| `/locations/hyderabad` | 1 | 1 | 0 | **0** | 1 | 1 |

### Findings

**a) `agentic` — zero occurrences sitewide.** This is one of your five target keywords and it appears **nowhere** on the site. "Agentic development" is a fast-growing, low-competition term where you have a direct service match (`ai-agent-development`). You are leaving the cheapest ranking available to you completely unclaimed.

**b) "automations" (plural) is your target, but you use "automation" (singular).** Users search both; your exact-match plural coverage is ~1 per page.

**c) `whatsapp bot` — 0 on the WhatsApp service page itself.** Your `/services/whatsapp-automation` page does not contain the phrase "WhatsApp bot" — the actual search term for that service.

**d) Thin content risk on hub pages.** `/services` = 283 words, `/blog` = 55 words (currently 500). Hub pages are doorway-thin.

**e) No topical depth.** With a 500-error blog, you have **zero** long-form content. For `automations` and `AI automations` — broad, competitive head terms — you need 15–25 substantive articles, not 6 landing pages.

**f) Missing trust content.** No case-study pages (404s), no client logos, no visible testimonials, no team/about content. For B2B buyers spending on automation, this is the difference between a enquiry and a scroll-past.

---

## 5. Internal linking opportunities

### Current state (verified on `/services/n8n-workflow-automation`)

Internal links present: `/` (×4), `/blog` (×4), `/#services` (×4), `/#contact` (×4), `/services` (×2), plus cross-links to 5 sibling services and 4 solutions.

**This is genuinely good** — `internal-links.ts` produces contextual service↔solution↔industry↔location cross-linking. Keep it.

### Problems

| Issue | Impact |
|---|---|
| 3 links to 404 `/case-studies/*` from every page | PageRank leak site-wide |
| `/blog` linked ×4 but returns 500 | Dead end |
| No breadcrumb navigation (visual) | Users + crawlers can't signal hierarchy |
| `/privacy`/`/terms` linked from every page footer | Dilutes crawl ratio slightly (minor) |
| Hub pages link *out* but few pages link *into* service pages | Authority not funnelled to money pages |

### Opportunities

1. **Remove the case-studies block** (or build the route) — immediate fix, already coded
2. **Add breadcrumb UI** to all PSEO pages — matches your existing `breadcrumbSchema`
3. **Link blog posts → service pages** with contextual anchors (blocked until blog is fixed)
4. **Build a pillar/cluster model:**
   - Pillar: `/blog/ai-automation-guide` (targets `automations`)
   - Clusters: n8n, WhatsApp bot, AI agents, RAG, invoice OCR
   - Every cluster links up to the pillar; pillar links down to all
5. **Add "Related Services" to industry/location pages** — currently they link out to solutions only

---

## 6. Pages that need improvement

| Priority | Page(s) | Issue | Action |
|---|---|---|---|
| 🔴 P0 | All 27 untitled pages | No `<title>` | Deploy `metadata.ts` fix |
| 🔴 P0 | `/blog` + 4 posts | HTTP 500 | Set Firebase env vars on Vercel |
| 🔴 P0 | `/` (schema) | Fabricated `AggregateRating` | Remove or add real reviews |
| 🔴 P0 | All pages (canonical) | → lovable.app | Deploy `SITE_URL` fix |
| 🟠 P1 | `/services` | 283 words, thin | Expand to 800+ w/ keyword focus |
| 🟠 P1 | `/locations/*` (6) | Generic, city-swapped | Add unique local proof, pricing, case refs |
| 🟠 P1 | `/industry/*` (6) | Industry claims unsupported | Add compliance/ROI specifics per industry |
| 🟠 P1 | `/solutions/*` (5) | Solutions without evidence | Add metrics, before/after |
| 🟡 P2 | `/` (description) | 205 chars | Rewrite ≤155 |
| 🟡 P2 | `/privacy`, `/terms` | No canonical | Add `noindex, follow` |
| 🟡 P2 | All PSEO | Missing `BreadcrumbList` | Standardise schema |
| 🟢 P3 | — | `/case-studies` | Build route from existing data |

---

## 7. Possible reasons for traffic / ranking drops

Ranked by likelihood.

### 7.1 Domain migration without signal transfer — **very likely**

The site was built and hosted on `lovable.app`, then moved to a custom domain. But every SEO signal still points back to `lovable.app`. In this scenario Google has typically:

1. Dropped or heavily suppressed `www.flologixautomations.com` as canonicalised-duplicate
2. Transferred ranking signals to `lovable.app`
3. Left both domains competing with different content

If the custom domain went live before the canonical/sitemap fix deployed — which your git history confirms it did — this is exactly the drop pattern you'd see.

### 7.2 Title tags stripped by a regression — **very likely, recent**

The `.filter((t) => t.content)` bug removed `<title>` from all PSEO routes. Google re-crawled, found 27 untitled pages, and dropped relevance signals. If this regressed in commit `8caa452` or nearby, expect a step-change decline.

### 7.3 Blog deindexed via HTTP 500 — **certain, ongoing**

A 500 is a *soft error*. Google cannot render the page, sees it as temporarily unavailable, and drops it from the index — typically within days. Your entire blog is almost certainly **deindexed right now**.

### 7.4 Case-study 404s — moderate

Site-wide links to 404s dilute crawl efficiency and leak equity, signalling low site quality.

### 7.5 `AggregateRating` manual action — **unknown but serious**

If Google issued a structured-data manual action, it can suppress rich results or the whole domain. Check **Search Console → Manual Actions** immediately. There is no way to detect this from outside.

### 7.6 Not causes

- **Not a server-speed problem** — 0.33s TTFB, 60 KB HTML, healthy
- **Not a crawl-budget problem** — 31 URLs is trivial
- **Not an AI-Overviews problem** — you are not losing traffic you had; you never had the fundamentals working

---

## 8. Quick SEO fixes

### Immediate — do today (2–3 hours)

**1. Commit and deploy the existing fix.** This is the whole ballgame.

```bash
cd "/Users/kirantej/Documents/Imp-fla-agency /Client - 10 FlologixAutomations/flologixautomations-website"
git add -A
git commit -m "fix(seo): correct canonical host, restore page titles, remove 404 case-study links"
```

Your working tree already contains all of:
- `SITE_URL` defaulting to `https://www.flologixautomations.com` ✅
- `public/robots.txt` → correct www sitemap ✅
- `<title>` filter fix in `metadata.ts` ✅
- `CASE_STUDIES_ROUTE_EXISTS = false` ✅

**Before deploying, verify `.env` is gitignored** — it contains a live Firebase private key and `N8N_WEBHOOK_URL`.

```bash
git check-ignore -v .env || echo "⚠️ .env IS NOT IGNORED — DO NOT COMMIT"
```

**2. Set Firebase env vars on Vercel** (fixes the 500s)

```
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY     ← multi-line, paste as one value
```

**3. Remove the fabricated AggregateRating**

```js
// src/seo/schema.ts — delete the aggregateRating property from
// localBusinessSchema / Organization schema until real reviews are on-page.
```

Either remove it, or — better — put genuine reviews on the page and mark those up. If you have real client testimonials, displaying them and marking them up is valuable. **Do not keep the markup without visible reviews.**

**4. Redirect lovable.app → www.** Must be done at the DNS/hosting provider for the lovable.app domain (301, same path).

### Short-term — this week (1–2 days)

**5. Rewrite homepage meta description** to ≤155 chars:

> AI automation agency for SMBs. Custom n8n workflows, AI agents, WhatsApp & Telegram bots, RAG and invoice OCR — cut costs up to 70%.

**6. Add `noindex, follow` to `/privacy` and `/terms`.**

**7. Change `SITE_NAME`** from `FLOLOGIXAUTOMATIONS` to `Flologix Automations` for SERP readability.

**8. Verify post-deploy** — re-run the crawl and confirm:
- `www.flologixautomations.com/services` has a `<title>`
- canonical is `https://www.flologixautomations.com/services`
- `/blog` returns 200

---

## 9. High-priority vs low-priority tasks

### 🔴 P0 — Critical (blocking all ranking). Target: day 1–3

| # | Task | Owner | Effort |
|---|---|---|---|
| 1 | Commit + deploy existing SEO fix (canonical, titles, robots, sitemap) | Dev | 1h |
| 2 | Set Firebase env vars on Vercel → blog returns 200 | Dev | 30m |
| 3 | Remove fabricated `AggregateRating` | Dev | 15m |
| 4 | 301 redirect `lovable.app` → `www` | Dev/Ops | 30m |
| 5 | Verify `.env` gitignored; rotate Firebase private key if exposed | Dev | 20m |
| 6 | Check Search Console for manual actions | Owner | 20m |
| 7 | Submit corrected sitemap in Search Console | Owner | 15m |

### 🟠 P1 — High (page 1 requires these). Target: week 1–4

| # | Task | Effort |
|---|---|---|
| 8 | Build `/case-studies` route from existing `caseStudies` data | 4h |
| 9 | Rewrite homepage description ≤155 chars | 15m |
| 10 | Add `noindex` to legal pages | 15m |
| 11 | Expand `/services` hub page to 800+ words | 3h |
| 12 | Add `agentic development` positioning sitewide (§10) | 3h |
| 13 | Standardise `BreadcrumbList` + add visual breadcrumbs | 3h |
| 14 | Add "Related Services" to industry/location pages | 2h |
| 15 | Write 5 pillar articles for target keywords | 15h |
| 16 | Add genuine testimonials + mark up `Review` schema | 4h |
| 17 | Build About/Team page with `Person` schema | 3h |

### 🟡 P2 — Medium. Target: month 2–3

| # | Task |
|---|---|
| 18 | Expand location pages with unique local proof (6 pages) |
| 19 | Expand industry pages with compliance/ROI specifics (6 pages) |
| 20 | Core Web Vitals optimisation (real-user monitoring) |
| 21 | Image optimisation + `alt` audit |
| 22 | Internal linking pillar/cluster build-out |
| 23 | Google Business Profile optimisation |

### 🟢 P3 — Low. Target: month 3+

| # | Task |
|---|---|
| 24 | Digital PR / link building |
| 25 | Build automation-specific calculator/tool |
| 26 | Multi-language expansion |
| 27 | Programmatic SEO at scale |

---

## 10. 30-day SEO recovery plan

### Reality check on timelines

Being direct: **no SEO work ranks a site on page 1 in 30 days**, especially for `automations` and `AI automations` — broad, commercial, competitive head terms. Anyone promising that is selling something.

What 30 days *can* deliver:

| Day 30 expectation | Detail |
|---|---|
| ✅ Technical foundation | 100% fixed and crawlable |
| ✅ Full reindexation | All 31 URLs clean in Search Console |
| ✅ Zero 404/500s | Healthy crawl profile |
| ✅ Rich results eligible | FAQ, Service, Breadcrumb, Review |
| ⏳ Rankings begin moving | Week 3–4, mostly long-tail |
| ❌ Page 1 for `automations` | Realistic: **4–9 months** |
| ❌ Page 1 for `AI automations` | Realistic: **6–12 months** |
| ✅ Page 1 for `WhatsApp bot` | Realistic: **2–4 months** (low competition) |
| ✅ Page 1 for `agentic development` | Realistic: **2–4 months** (low competition, currently unclaimed) |

**Focus the 30 days on fixing fundamentals and building the content base. Expect leads to lag rankings by 4–8 weeks.**

---

### Week 1 — Stop the bleeding (Days 1–7)

**Goal: make the site technically correct and fully crawlable.**

| Day | Task |
|---|---|
| **1** | Commit + deploy existing fix. Verify `.env` ignored. Rotate Firebase key if exposed |
| **1** | Set Firebase env vars on Vercel → confirm `/blog` returns 200 |
| **2** | Remove fabricated `AggregateRating` |
| **2** | 301 redirect `lovable.app` → `www` |
| **3** | Re-crawl all 31 URLs: confirm 0× missing title, 0× wrong canonical, 0× 500 |
| **4** | Search Console: check manual actions; submit corrected sitemap; request indexing of all URLs |
| **5** | Rewrite homepage description (≤155 ch); `noindex` legal pages; rename `SITE_NAME` |
| **6–7** | Build `/case-studies` route; add `Review` schema for genuine testimonials only |

**Exit criteria:** 31/31 pages return 200, all titled, all canonicalised to `www`, blog live.

---

### Week 2 — Keyword foundation (Days 8–14)

**Goal: establish topical authority around your five target terms.**

| Day | Task |
|---|---|
| **8** | Keyword map: assign one primary + 2–3 secondary keywords per page |
| **8** | Deploy `agentic development` positioning — add to `/services/ai-agent-development` (title, H1, H2, body, FAQ) |
| **9** | Add "WhatsApp bot" phrasing to `/services/whatsapp-automation` — the literal term users search |
| **10** | Rewrite titles/H1s across all 27 pages with primary keywords |
| **11** | Expand `/services` hub to 800+ words |
| **12** | Standardise `BreadcrumbList` on all PSEO pages + visual breadcrumbs |
| **13** | Add "Related Services" blocks to industry/location pages |
| **14** | Publish **Pillar 1: "The Complete Guide to Business Automation"** (2,500–3,500 w, targets `automations`) |

**Exit criteria:** every page has a unique keyword-targeted title, H1, description, and ≥1 contextual internal link.

---

### Week 3 — Content velocity (Days 15–21)

**Goal: publish the content that ranks for money keywords.**

| Day | Task |
|---|---|
| **15** | Publish **Pillar 2: "AI Automation for Small Business"** (targets `AI automations`) |
| **16** | Publish **"What is Agentic AI Development?"** (targets `agentic development` — lowest competition, highest chance of page 1) |
| **17** | Publish **"WhatsApp Business Automation: A Complete Guide"** (targets `whatsapp bot`) |
| **18** | Publish **"n8n vs Zapier vs Make: Which for SMB?"** (long-tail, high intent) |
| **19** | Publish **"How to Automate Invoice Processing with OCR"** |
| **20** | Internal linking: every new post links to 2–3 service pages + up to pillar; services link down to posts |
| **21** | GA4 + Search Console: verify events, conversions, and indexing |

**Exit criteria:** 5 substantial posts live, all internally linked, all indexed.

---

### Week 4 — Authority + measurement (Days 22–30)

**Goal: strengthen trust signals and set up measurement.**

| Day | Task |
|---|---|
| **22** | About/Team page with `Person` schema |
| **23** | Google Business Profile: complete, categorised, reviews flowing |
| **24** | Audit and rewrite location pages (6) with genuinely local content |
| **25** | Audit and rewrite industry pages (6) with ROI/compliance specifics |
| **26** | Core Web Vitals baseline via CrUX/Search Console; fix any failing metric |
| **27** | Image optimisation: compress, `alt` text with keywords, `next/image` |
| **28** | Start link building: guest posts, partner/agency directories, n8n community |
| **29** | Set up rank tracking for all 5 target keywords + 20 long-tail |
| **30** | Full re-audit; document month-2 backlog |

**Exit criteria:** complete measurement baseline, 12+ indexed pages, tracking live.

---

### Keyword strategy & realistic targets

Your five target keywords are **not equal**. Prioritise by winnability, not just volume.

| Keyword | Intent | Comp. | Your page | Month-1 | Month-3 | Month-6 |
|---|---|---|---|---|---|---|
| `agentic development` | Informational + commercial | **Low** | `/services/ai-agent-development` | — | Page 1-3 | **Page 1** |
| `whatsapp bot` | Transactional | **Low-Med** | `/services/whatsapp-automation` | — | Page 1-3 | **Page 1** |
| `chatbot development` | Transactional | Medium | `/services/telegram-bot-development` | — | Page 3-5 | Page 1-3 |
| `AI automations` | Commercial | **High** | Homepage, `/services` | — | Page 3-5 | Page 3-5 |
| `automations` | Broad, ambiguous | **Very high** | Pillar guide | — | Page 5+ | Page 3-5 |

**Note on `automations`:** this is an extremely broad term with mixed intent (job listings, home automation, business automation, no-code tools). Ranking #1 for it organically is unrealistic within 12 months. **Target `business automation`, `AI automation agency`, and `automation consulting`** instead — same intent, far better winnability. Use the generic term in pillar content, compete on the long-tail.

### Supporting long-tail (lower competition, faster wins)

```
ai automation agency india
business process automation services
whatsapp business api integration
whatsapp chatbot for business
n8n automation agency
n8n workflow consultant
rag development services
rag chatbot development
invoice processing automation ocr
telegram bot development services
agentic ai development company
ai agent development services
automate customer support ai
```

---

## Summary

You do not have an SEO content problem. You have a **deployment problem** — a working fix sitting uncommitted in your working tree while production serves canonical tags pointing at a third-party preview domain.

**Do Week 1 first.** Nothing else in this document matters until the site is technically sound and crawlable. The 30-day plan then builds the content authority that turns a technically-correct site into a page-1 ranking for `agentic development` and `whatsapp bot` within roughly 2–4 months.

The two broadest keywords will take longer. Build the foundation now; the rankings compound.

---

*Audit performed against live production on 10 October 2026. All findings verified by direct fetch; all source-code references point to the local repository at the time of writing.*