import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — FLOLOGIXAUTOMATIONS" },
      { name: "description", content: "Terms governing the use of FLOLOGIXAUTOMATIONS website and services." },
      { property: "og:title", content: "Terms of Service — FLOLOGIXAUTOMATIONS" },
      { property: "og:description", content: "Terms governing the use of FLOLOGIXAUTOMATIONS website and services." },
    ],
    links: [
      { rel: "canonical", href: "https://flologixautomations.lovable.app/terms" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Legal</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>

        <div className="mt-10 space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2">By accessing this website or engaging our services, you agree to these terms. If you do not agree, please do not use the site.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Services</h2>
            <p className="mt-2">FLOLOGIXAUTOMATIONS provides custom automation, AI agent, chatbot, and workflow consulting services. Specific deliverables are defined in individual service agreements.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Intellectual Property</h2>
            <p className="mt-2">All site content, branding, and code published here are owned by FLOLOGIXAUTOMATIONS unless otherwise stated. You may not republish or resell our content without written permission.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Payment & Refunds</h2>
            <p className="mt-2">Project payment terms are set in your contract. Refunds for completed milestones are not provided unless explicitly agreed.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Automation & AI Outcomes</h2>
            <p className="mt-2">All automations, AI agents, chatbots, RAG systems, and workflows we build are designed, tested, and tuned to deliver the best possible outcome for your business context. While we apply industry best practices and rigorous QA, automation outcomes are inherently subject to factors outside our full control — including input data quality, third-party API behavior, LLM model drift, platform downtime, and changing regulatory environments.</p>
            <p className="mt-2">We do not warrant that automations will be error-free, uninterrupted, or produce specific commercial results. AI-generated outputs may occasionally be inaccurate or incomplete and should be reviewed by a human before being used for business-critical decisions. Clients are responsible for monitoring deployed automations and notifying us of any issues so we can iterate.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p className="mt-2">FLOLOGIXAUTOMATIONS is not liable for indirect, incidental, or consequential damages arising from use of our website, automations, or services beyond the fees paid for the affected engagement.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
            <p className="mt-2">We may update these terms periodically. The latest version will always be available on this page.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
            <p className="mt-2">Questions? Reach us at <a className="text-foreground underline" href="mailto:contactus@flologixautomations.com">contactus@flologixautomations.com</a>.</p>
          </section>
        </div>

        <Link to="/" className="mt-12 inline-block text-sm text-foreground underline">← Back to home</Link>
      </main>
      <Footer />
    </div>
  );
}
