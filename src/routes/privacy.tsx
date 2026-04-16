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
            <p className="mt-2">When you submit our contact form, we collect your name, email, company name, employee count, and the message you provide. We do not use cookies for tracking on the marketing pages.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Information</h2>
            <p className="mt-2">We use submitted information solely to respond to your inquiry, schedule consultations, and provide the services you request. We never sell your data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Data Storage</h2>
            <p className="mt-2">Form submissions are routed through our secure automation pipeline and stored in spreadsheet-based CRM tooling that we control. Data is retained only as long as necessary to serve you.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
            <p className="mt-2">We may use trusted automation platforms (e.g., workflow runners, email providers) to process your inquiry. These providers are bound by their own privacy commitments.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
            <p className="mt-2">You may request access to, correction of, or deletion of any personal data you have provided. Email <a className="text-foreground underline" href="mailto:kirantejk@flologixautomations.com">kirantejk@flologixautomations.com</a> with your request.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Contact</h2>
            <p className="mt-2">For privacy questions, contact <a className="text-foreground underline" href="mailto:kirantejk@flologixautomations.com">kirantejk@flologixautomations.com</a>.</p>
          </section>
        </div>

        <Link to="/" className="mt-12 inline-block text-sm text-foreground underline">← Back to home</Link>
      </main>
      <Footer />
    </div>
  );
}
