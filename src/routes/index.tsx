import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";

// Defer below-the-fold sections to shrink initial JS and speed up first paint
const AutomationToolsSection = lazy(() =>
  import("@/components/AutomationToolsSection").then((m) => ({ default: m.AutomationToolsSection })),
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
const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer })),
);

const SITE_URL = "https://flologixautomations.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const TITLE = "AI Automation Agency | n8n Workflows, AI Agents & RAG Systems";
const DESCRIPTION =
  "Hire a top AI automation agency. Custom n8n workflow automation, AI agents, WhatsApp & Telegram chatbots, RAG systems, invoice OCR and business process automation. Cut costs up to 70% and scale faster.";
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
].join(", ");


const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlologixAutomations",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: DESCRIPTION,
  email: "contactus@flologixautomations.com",
  sameAs: [],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "FlologixAutomations — AI Automation Agency",
  url: SITE_URL,
  image: OG_IMAGE,
  priceRange: "$$",
  description: DESCRIPTION,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "27",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Automation Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "n8n Workflow Automation Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Agent Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Telegram Bot Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "RAG Systems & AI Knowledge Bases" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Invoice Automation with AI OCR" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Process Automation" } },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlologixAutomations",
  url: SITE_URL,
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
    links: [
      { rel: "canonical", href: SITE_URL },
    ],
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
