import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { TechnologiesSection } from "@/components/TechnologiesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlologixAutomations — AI Automation Agency | n8n, Make, AI Agents" },
      { name: "description", content: "Custom n8n workflows, AI agents, WhatsApp & Telegram bots, RAG systems, and process automation solutions. Reduce costs by 70% and scale without hiring." },
      { property: "og:title", content: "FlologixAutomations — Intelligent AI Automation Solutions" },
      { property: "og:description", content: "Transform your business with custom automation solutions. n8n workflows, AI agents, WhatsApp bots, and more." },
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
      <ProcessSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <TechnologiesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
