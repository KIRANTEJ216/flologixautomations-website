# AI SEO Reference — The Periodic Table

> Framework created by Kiran Tej. Reference for Flologix Automations SEO & AI SEO strategy.
> Last site audit: 2026-10-10. Scores below are measured, not aspirational.

---

## The framework

| Group | Elements |
|---|---|
| **Traditional SEO** | SEO · CTR · SERP · PPC · XML · URLs |
| **Technical SEO** | SSR · API · Schema Markup |
| **Content & Optimization** | AEO · GEO · E-E-A-T · NLP · LSI · CRO |
| **AI Models & Infrastructure** | LLMs · RAG · Vectors · Embeddings · Knowledge Graphs |
| **AI Search & Visibility** | AI Overviews · AI Visibility · AI Snippets · Citations · Mentions |
| **Metrics & Analytics** | GA · GSC · ROI · KPI · SOV |
| **Brand & Reputation** | ORM · Sentiment Analysis · Social Media Optimization |
| **Emerging Concepts** | Agentic Search · Share of Model · Zero-Click Results |

**The shift:**
```
SEO → Search Visibility → AI Visibility → Brand Visibility
```
Modern SEO is less about ranking #1 and more about being **discoverable, understandable, cited and mentioned** across search engines and AI systems.

---

## Current state of flologixautomations.com

Measured 2026-10-10 against production.

### Traditional SEO

| Element | Status | Note |
|---|---|---|
| XML | ✅ Done | 29 URLs, all on `www`, `lastmod` on every entry |
| URLs | ✅ Done | 301 chain, canonical on all 29 pages |
| SEO | 🟡 Partial | Foundation fixed; no content depth yet (blog empty) |
| SERP | ⚪ Not measured | GSC not connected |
| CTR | ⚪ Not measured | Needs GSC |
| PPC | ⚪ Not running | — |

### Technical SEO

| Element | Status | Note |
|---|---|---|
| SSR | ✅ Done | 1,435 words in raw HTML — AI crawlers don't run JS, so this is the biggest single lever |
| Schema Markup | 🟡 Good | Organization, ProfessionalService, WebSite, FAQPage, OfferCatalog, BreadcrumbList, BlogPosting, LocalBusiness, Service |
| API | 🟡 Partial | Firestore REST (blog); webhook for n8n publish |

### Content & Optimization

| Element | Status | Note |
|---|---|---|
| GEO | 🟡 68/100 | "GOOD" band. `llms.txt` missing |
| AEO | 🟡 Partial | Server-rendered, but no `/ai/` discovery endpoints |
| E-E-A-T | 🔴 Weak | No `/about`, no visible author entity, no case-study pages (route 404s) |
| NLP | 🟡 Partial | FAQ + HowTo schema present |
| LSI | ⚠️ Risk | `automation` at 3.9% density — GEO tool flagged this as stuffing |
| CRO | ⚪ Not measured | Needs GA4 + funnel tracking |

### AI Models & Infrastructure

| Element | Status | Note |
|---|---|---|
| LLMs | ✅ Understood | Service positioning aligned |
| RAG | ✅ Selling it | `/services/rag-systems` live |
| Knowledge Graphs | 🔴 Gap | `sameAs: []` is **empty** — no Wikipedia/Wikidata/LinkedIn disambiguation |
| Vectors/Embeddings | 🔴 Gap | No `/llms.txt`, no AI discovery JSON |

### AI Search & Visibility

| Element | Status | Note |
|---|---|---|
| AI bot access | ✅ Done | `User-agent: * / Allow: /` permits GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot |
| AI Visibility | 🟡 68/100 | Baseline established |
| AI Snippets | 🔴 Missing | No `/.well-known/ai.txt`, `/ai/summary.json`, `/ai/faq.json`, `/ai/service.json` |
| Citations | 🔴 Gap | No authoritative external citations; GEO method #1 is "+30–115%" impact |
| Mentions | ⚪ Not tracked | Needs citations check with a Perplexity/OpenAI key |

### Metrics & Analytics

| Element | Status | Note |
|---|---|---|
| GSC | 🔴 Not connected | **Next step.** No baseline data yet |
| GA | ⚪ Not verified | |
| KPI / ROI | ⚪ Undefined | Define: leads per organic session, pipeline from organic |
| SOV | ⚪ Not measured | OpenSEO installed for this |

### Brand & Reputation

| Element | Status | Note |
|---|---|---|
| ORM | ⚪ Not monitored | |
| Sentiment | ⚪ Not measured | Requires genuine reviews (see schema note below) |
| SMO | ⚪ Not running | |

### Emerging Concepts

| Element | Status | Note |
|---|---|---|
| Agentic Search | 🟡 Emerging fit | `agentic development` is a live target keyword, 0 competitors tracked |
| Share of Model | ⚪ Early | |
| Zero-Click | 🔴 At risk | Zero featured snippets possible while FAQ/HowTo markup is restricted to gov/health |

---

## Three notes worth keeping

**1. AEO and GEO are listed under "Content & Optimization," but they aren't content problems.** They're *crawlability and entity* problems — can an AI system fetch, parse, and attribute the page? That's Technical SEO. Worth reclassifying so they don't get deferred as "content work."

**2. The GEO paper behind our tooling found keyword stuffing at ~0% effect, sometimes negative.** Princeton KDD 2024 ranked nine interventions: *citing sources* (+30–115%), *adding statistics* (+40%), *quotations* (+30–40%) at the top; keyword stuffing at the bottom. This is why LSI is marked ⚠️ above — `automation` at 3.9% density is a real risk, not a shortfall. GEO is structurally different from classic SEO: **verifiability over repetition.**

**3. `HowTo` schema no longer produces rich results** (removed September 2023), and `FAQPage` is restricted to government/health sites. Both are still emitted on service pages. They cause no penalty and cost nothing, but don't expect stars or accordions from them. The GEO path to AI visibility is factual density in the body, not structured data alone.

---

## Schema policy note

`AggregateRating` was removed 2026-10-10. The markup claimed 4.9 stars / 27 reviews with **nothing visible on the page** — a structured-data policy violation that can trigger a manual action against the entire domain.

**Re-add it only when:** real reviews exist, they are visible on the page as stars + text, and they are attributable. Until then, `FAQPage` + `BreadcrumbList` + `Service` carry the entity signals honestly.

---

## Next actions, by framework group

| # | Action | Group | Cost |
|---|---|---|---|
| 1 | Connect GSC MCP | Metrics | Free |
| 2 | Generate `/llms.txt` from sitemap | AI Visibility | Free |
| 3 | Add `.well-known/ai.txt` + `/ai/*.json` | AI Snippets | Free |
| 4 | Populate `sameAs` with 3+ entity links | Knowledge Graphs | Free |
| 5 | Build `/about` with `Person` schema | E-E-A-T | Free |
| 6 | Link RSS in `<head>` | AI Discovery | Free |
| 7 | Reduce `automation` density below 3% | Content risk | Free |
| 8 | Publish 5 pillar articles | Content depth | Time |
| 9 | Build `/case-studies` route | Citations / E-E-A-T | Time |
| 10 | Set `lovable.app` → `www` 301 | Traditional SEO | Free — **highest risk, still open** |

Items 2–7 are all in-repo and need no third-party account.

---

*Framework by Kiran Tej. Site measurements from `docs/SEO-AUDIT-2026-10.md` and GEO Optimizer 4.19.0 audit run 2026-10-10.*