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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FlologixAutomations — AI Automation Agency | No-Code Experts" },
      { name: "description", content: "Custom business process workflows, AI agents, WhatsApp & Telegram bots, RAG systems, and process automation solutions. Reduce costs by 70% and scale without hiring." },
      { property: "og:title", content: "FlologixAutomations — Intelligent AI Automation Solutions" },
      { property: "og:description", content: "Transform your business with custom automation solutions. Workflow automation, AI agents, WhatsApp bots, and more." },
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
