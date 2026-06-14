
## 1. Remove "India" & "Worldwide" mentions
- `ContactSection.tsx`: drop the "India & Worldwide" location row and replace "10+ businesses in India" with a neutral line ("10+ businesses worldwide" → just "10+ growing businesses").
- `routes/index.tsx`: remove `areaServed: ["IN", "Worldwide"]` and `addressCountry: "IN"` from JSON-LD. Drop India-specific keywords ("AI automation for GST invoice processing India", "n8n automation services for startups" stays, India phrases out). Replace FAQ entry about GST India with a generic "invoice automation" entry.
- Audit Footer / other components for stray India copy (will scan during build).

## 2. SEO upgrades (high-ranking keywords)
- Tighten `<title>` to ≤60 chars with primary keyword first: "AI Automation Agency | n8n Workflows & AI Agents".
- Expand keyword set with high-intent terms: "hire AI automation agency", "n8n consulting", "AI workflow automation company", "custom AI agents", "business process automation experts", "workflow automation services", "AI chatbot agency", "intelligent document processing", "AI integration company", "automation as a service".
- Add per-section H2s using keyword variants (HeroSection subtitle, ServicesSection heading).
- Add `<link rel="canonical">` per leaf route + `og:url`.
- Add `sitemap.xml` and `robots.txt` (verify/replace existing) with the published domain.
- Add BreadcrumbList + WebSite (SearchAction) JSON-LD on root.
- Add `loading="lazy"` + `decoding="async"` to non-LCP images; mark hero image `fetchpriority="high"` and preload it via route `head().links`.

## 3. Performance (instant load)
- Preload the LCP hero asset; add `<link rel="preconnect">` for font hosts (or self-host via `@fontsource`).
- Convert hero/background heavy images to `?format=webp` via vite-imagetools (or compress existing) — only if assets exist; otherwise skip.
- Code-split below-the-fold sections (`CaseStudiesSection`, `TechnologiesSection`, `ContactSection`, `Footer`) with `React.lazy` + Suspense fallback to shrink initial JS.
- Remove unused Radix UI components from the bundle by ensuring they aren't imported in the homepage path (audit).
- Defer non-critical animations on first paint (respect `prefers-reduced-motion`).
- Add `Cache-Control` headers via route handlers where applicable for static JSON-LD assets (limited on Workers — skip if not trivial).

## 4. Contact form → new n8n webhook
- Update secret `N8N_WEBHOOK_URL` to `https://kktej3d.n8n-wsk.com/webhook-test/flocontactus` (requires user approval via secrets tool).
- `contact.functions.ts` already reads from `process.env.N8N_WEBHOOK_URL`, so no code change needed beyond the secret update.

## 5. Theme redesign — reference: Appzia Flutter Admin Panel
Appzia is a clean, modern light-mode admin UI: white/very-light-gray background, soft card surfaces, vibrant indigo/purple primary, sharp data viz accents (teal, amber, pink), rounded-2xl cards with subtle shadow, Inter/Poppins typography, generous whitespace, sidebar-style nav, pill buttons.

Proposed redesign:
- Switch from current pure-black neon theme to **light admin-style theme**:
  - `--background: oklch(0.99 0 0)` (near white)
  - `--foreground: oklch(0.18 0.02 260)` (slate-900)
  - `--primary: oklch(0.55 0.22 280)` (indigo-violet)
  - Accent set: teal `oklch(0.72 0.13 190)`, amber `oklch(0.82 0.16 75)`, pink `oklch(0.7 0.2 0)`
  - Card surfaces: white w/ `box-shadow: 0 4px 20px oklch(0 0 0 / 6%)`, `rounded-2xl`
- Replace "neon glow" utility classes (`glow-blue`, `text-glow-blue`, `glass-card` dark) with soft-shadow admin equivalents — keeping class names so existing markup still works.
- Typography: Inter (body) + Poppins (headings) via `<link>` in `__root.tsx`.
- Navbar: lighter, with subtle border and pill CTA.
- Hero: split layout with illustration placeholder on right, indigo gradient headline.
- Buttons: pill-shaped, indigo primary, subtle hover lift.

> Note: this is a substantial visual overhaul. I'll keep all section structure/content intact — only colors, typography, spacing, shadows, and button shapes change.

## Execution order
1. Update `N8N_WEBHOOK_URL` secret (user approval).
2. Strip India/Worldwide copy + JSON-LD.
3. Refresh SEO metadata, keywords, sitemap/robots, JSON-LD.
4. Theme overhaul in `src/styles.css` + tweak Navbar/Hero/Button accents.
5. Performance: lazy-load below-fold sections, preload LCP, font `<link>` preconnect.

## Questions before I build
- **Theme intensity**: Full light admin redesign (Appzia-style) or keep dark base but adopt Appzia's indigo accents + card style?
- **Sections to keep visually identical**: any section you want untouched during the redesign?
