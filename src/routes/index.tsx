import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/seo/metadata";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";

// Defer below-the-fold sections to shrink initial JS and speed up first paint
const AutomationToolsSection = lazy(() =>
  import("@/components/AutomationToolsSection").then((m) => ({
    default: m.AutomationToolsSection,
  })),
);
const ProcessSection = lazy(() =>
  import("@/components/ProcessSection").then((m) => ({ default: m.ProcessSection })),
);
const WhyUsSection = lazy(() =>
  import("@/components/WhyUsSection").then((m) => ({ default: m.WhyUsSection })),
);
const CaseStudiesSection = lazy(() =>
  import("@/components/CaseStudiesSection").then((m) => ({ default: m.CaseStudiesSection })),
);
const TechnologiesSection = lazy(() =>
  import("@/components/TechnologiesSection").then((m) => ({ default: m.TechnologiesSection })),
);
const ContactSection = lazy(() =>
  import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })),
);
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const TITLE = "AI Automation Agency | n8n Workflows, AI Agents & RAG Systems";

// Must stay <=155 chars: Google truncates the SERP snippet past ~155 and
// cuts the trailing CTA, which is the highest-value part of the description.
const DESCRIPTION =
  "AI automation agency for SMBs. Custom n8n workflows, AI agents, WhatsApp & Telegram bots, RAG and invoice OCR automation. Cut costs up to 70%.";
const KEYWORDS = [
  "AI automation agency",
  "hire AI automation agency",
  "best AI automation agency",
  "AI automation services",
  "n8n consulting",
  "n8n consulting services",
  "n8n workflow automation",
  "n8n automation agency",
  "n8n development services",
  "n8n integration services",
  "n8n experts for hire",
  "AI workflow automation company",
  "AI agent development",
  "custom AI agents for business",
  "build AI agents",
  "AI agent agency",
  "AI chatbot agency",
  "AI chatbot development",
  "WhatsApp automation",
  "WhatsApp business automation",
  "WhatsApp chatbot development",
  "Telegram bot development",
  "Telegram chatbot agency",
  "RAG systems",
  "retrieval augmented generation services",
  "RAG chatbot development",
  "AI knowledge base",
  "intelligent document processing",
  "invoice automation with AI OCR",
  "AI OCR invoice processing",
  "business process automation experts",
  "BPA consulting",
  "workflow automation services",
  "AI integration services",
  "enterprise automation solutions",
  "automation as a service",
  "AaaS",
  "no-code automation agency",
  "open source automation services",
  "LLM integration services",
  "OpenAI integration agency",
  "Claude AI integration",
  "Zapier alternative agency",
  "Make.com automation services",
  "best AI automation agency for small business",
  "custom AI automation solutions for enterprises",
  "AI automation consultant",
  "automate repetitive tasks with AI",
  "ai workflow automation for startups",
  // Primary target terms
  "agentic development",
  "agentic development company",
  "agentic ai development",
  "agentic ai agency",
  "whatsapp bot",
  "whatsapp bot development",
  "whatsapp bot for business",
  "business automation",
  "business automation company",
  "business process automation agency",
  "ai automation",
  "automation agency",
  "ai agents",
  "chatbot",
  "chatbot development",
  "chatbot company",
  "chatbot agency",
  // Buying-intent long tail
  "hire n8n developers",
  "n8n developer for hire",
  "hire AI agent developers",
  "whatsapp api integration",
  "whatsapp business api solution",
  "telegram bot developer",
  "rag development company",
  "hire rag developers",
  "ocr automation services",
  "invoice processing automation",
  "document processing automation",
  "workflow automation consultant",
  "automation consulting firm",
  "ai consulting for smb",
  "scaling with automation",
  "automate customer support",
  "ai customer support agent",
].join(", ");

/**
 * Central list of verified external profiles, used by every schema block below.
 *
 * Empty until real profiles exist. Kept as a named const so one edit here
 * updates Organization, ProfessionalService and any future WebPage markup at
 * once, rather than drifting between them.
 */
export const SAME_AS: string[] = [];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Flologix Automations",
  legalName: "Flologix Automations",
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: OG_IMAGE,
  description: DESCRIPTION,
  email: "contactus@flologixautomations.com",
  telephone: "+919985860659",
  foundingDate: "2023",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Singapore" },
  ],
  knowsAbout: [
    "AI automation",
    "business process automation",
    "n8n workflow automation",
    "agentic development",
    "AI agent development",
    "AI chatbot development",
    "WhatsApp bot development",
    "Telegram bot development",
    "RAG systems",
    "retrieval augmented generation",
    "document OCR automation",
    "invoice processing automation",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "contactus@flologixautomations.com",
      telephone: "+919985860659",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
  ],
  // `sameAs` is how AI engines and search engines disambiguate an organisation
  // against an entity they already know. It must point at profiles that REALLY
  // exist and resolve — pointing at a non-existent LinkedIn page is worse than
  // omitting it, because it asserts a link that cannot be verified.
  //
  // Currently empty because this company has no public profiles on LinkedIn,
  // Wikipedia, Wikidata, Crunchbase or X. To fill it in, add the exact URLs of
  // real, live profiles you control. Three or more is the working minimum;
  // five is better. See docs/AI-SEO-REFERENCE.md.
  //
  // TODO(kiran): add real profile URLs once the company pages exist, e.g.
  //   "https://www.linkedin.com/company/<slug>",
  //   "https://x.com/<handle>",
  //   "https://www.crunchbase.com/organization/<slug>"
  sameAs: SAME_AS,
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Flologix Automations — AI Automation Agency",
  url: SITE_URL,
  image: OG_IMAGE,
  logo: `${SITE_URL}/icon-512.png`,
  priceRange: "$$",
  description: DESCRIPTION,
  telephone: "+919985860659",
  email: "contactus@flologixautomations.com",
  // NOTE: intentionally no `aggregateRating` here. The previous markup claimed
  // ratingValue 4.9 / reviewCount 27 with no visible, verifiable reviews on the
  // page. Google requires rating markup to reflect genuine user-visible reviews;
  // inventing it is a structured-data policy violation that can earn a manual
  // action against the whole domain. Re-add `aggregateRating` only once real,
  // on-page, attributable reviews exist (and render them as stars too).
  serviceType: "AI automation agency",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Singapore" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Automation Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "n8n Workflow Automation Services" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agent Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Telegram Bot Development" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "RAG Systems & AI Knowledge Bases" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Invoice Automation with AI OCR" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Business Process Automation" },
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Flologix Automations",
  alternateName: "FlologixAutomations",
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: "Flologix Automations", url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an AI automation agency do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI automation agency designs, builds and maintains custom workflows, AI agents, chatbots and integrations that automate repetitive business tasks — saving time, cutting costs and helping you scale without hiring.",
      },
    },
    {
      "@type": "Question",
      name: "Why use n8n for workflow automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "n8n is an open-source workflow automation platform that gives you full ownership, zero vendor lock-in, custom code support and integration with 400+ apps — ideal for startups and enterprises building scalable automations.",
      },
    },
    {
      "@type": "Question",
      name: "Can you automate invoice processing with AI OCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build AI OCR pipelines that extract line items, validate tax numbers, calculate totals and post invoices into your ERP or accounting software automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How long does an AI automation project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most automations go live in 2–4 weeks. Complex AI agent or RAG systems typically take 4–8 weeks depending on integrations and data quality.",
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:site_name", content: "FlologixAutomations" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(organizationJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(websiteJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <Suspense fallback={null}>
        <AutomationToolsSection />
        <ProcessSection />
        <WhyUsSection />
        <CaseStudiesSection />
        <TechnologiesSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
}
