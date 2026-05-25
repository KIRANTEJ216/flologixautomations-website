import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AutomationToolsSection } from "@/components/AutomationToolsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TechnologiesSection } from "@/components/TechnologiesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://automate-flow-genie.lovable.app";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const TITLE = "AI Automation Agency | AI Automations, AI Agents & Workflow Automation";
const DESCRIPTION =
  "Top AI automation agency building AI automations workflows, AI agents, WhatsApp & Telegram bots, RAG systems, invoice OCR & business process automation. Cut costs 70%.";
const KEYWORDS = [
  "AI automation agency",
  "business process automation services",
  "AI workflow automation services",
  "AI automations services",
  "AI chatbot development services",
  "automation consulting services",
  "RPA services company",
  "AI integration services",
  "enterprise automation solutions",
  "AI SaaS automation services",
  "AI agents for business",
  "automate invoice processing using AI OCR",
  "AI automation for GST invoice processing India",
  "WhatsApp automation",
  "Telegram bot development",
  "RAG systems",
  "best AI automation agency for small business",
  "AI automations services for startups",
  "custom AI automation solutions for enterprises",
].join(", ");

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlologixAutomations",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description: DESCRIPTION,
  email: "contactus@flologixautomations.com",
  areaServed: ["IN", "Worldwide"],
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
  address: { "@type": "PostalAddress", addressCountry: "IN" },
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Invoice Automation with AI OCR & GST" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Process Automation" } },
    ],
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
      name: "Can you automate GST invoice processing in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build AI OCR pipelines that extract line items, validate GSTIN, calculate tax and post invoices into your ERP or accounting software automatically.",
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
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceJsonLd),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AutomationToolsSection />
        <ProcessSection />
        <WhyUsSection />
        <CaseStudiesSection />
        <TechnologiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
