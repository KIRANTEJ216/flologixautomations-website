import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FLOLOGIXAUTOMATIONS" },
      { name: "description", content: "How FLOLOGIXAUTOMATIONS collects, uses, and protects your information." },
      { property: "og:title", content: "Privacy Policy — FLOLOGIXAUTOMATIONS" },
      { property: "og:description", content: "How FLOLOGIXAUTOMATIONS collects, uses, and protects your information." },
    ],
    links: [
      { rel: "canonical", href: "https://flologixautomations.lovable.app/privacy" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Legal</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>

        <div className="prose prose-invert mt-10 space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-2">When you submit our contact form, we collect your name, email, company name, number of employees, and the message you provide. We may also collect basic technical information (browser type, referring page) for security and analytics. We do not use third-party tracking cookies on the marketing pages.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Information</h2>
            <p className="mt-2">We use submitted information solely to respond to your inquiry, schedule consultations, scope automation projects, and deliver the services you request. We never sell or rent your data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Data Storage</h2>
            <p className="mt-2">Form submissions are routed through our secure automation pipeline and stored in spreadsheet-based CRM tooling that we control. Data is retained only as long as necessary to serve you, after which it is archived or deleted.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
            <p className="mt-2">We may use trusted automation platforms (e.g., workflow runners, email providers, LLM APIs) to process your inquiry or build your solution. These providers are bound by their own privacy commitments and contractual data-processing terms.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
            <p className="mt-2">You may request access to, correction of, or deletion of any personal data you have provided. Email <a className="text-foreground underline" href="mailto:contactus@flologixautomations.com">contactus@flologixautomations.com</a> with your request and we will respond within a reasonable timeframe.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Security</h2>
            <p className="mt-2">We apply reasonable technical and organizational measures to protect data in transit (HTTPS) and at rest. However, no internet transmission or storage is fully secure, and we cannot guarantee absolute security.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Automation Outcomes Disclaimer</h2>
            <p className="mt-2">All automation, AI agent, and workflow solutions delivered by FLOLOGIXAUTOMATIONS are designed and tuned to achieve the best possible outcome for your specific use case. However, automation results depend on input data quality, third-party platform availability, evolving AI model behavior, and your operational environment. We do not guarantee specific business outcomes, revenue impact, or uninterrupted accuracy of AI-generated outputs. Clients are responsible for human review of business-critical actions.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
            <p className="mt-2">For privacy questions, contact <a className="text-foreground underline" href="mailto:contactus@flologixautomations.com">contactus@flologixautomations.com</a>.</p>
          </section>
        </div>

        <Link to="/" className="mt-12 inline-block text-sm text-foreground underline">← Back to home</Link>
      </main>
      <Footer />
    </div>
  );
}
