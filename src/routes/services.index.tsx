import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { services } from "@/data/services";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";

export const Route = createFileRoute("/services/")({
  head: () => {
    const meta = buildMeta("/services", "AI Automation Services", "Explore our AI automation services including n8n workflows, AI agents, WhatsApp bots, Telegram bots, RAG systems, and business process automation.");
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
        <h1 className="text-4xl font-bold sm:text-5xl">Our Services</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          End-to-end AI automation solutions for modern businesses. From workflow automation to AI agents — we build systems that scale.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="glass-card group rounded-2xl border border-border/50 p-6 hover:border-neon-blue/30 transition-all"
            >
              <h2 className="text-xl font-semibold group-hover:text-neon-blue transition-colors">{service.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{service.metaDesc.slice(0, 120)}...</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-neon-blue">
                <span>Starting at {service.price}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
