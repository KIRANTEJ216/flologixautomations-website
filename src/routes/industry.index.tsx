import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { industries } from "@/data/industries";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";

export const Route = createFileRoute("/industry/")({
  head: () => {
    const meta = buildMeta("/industry", "AI Automation by Industry | Industry-Specific Solutions", "Industry-specific AI automation solutions for healthcare, e-commerce, financial services, manufacturing, real estate, and education.");
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: IndustryIndex,
});

function IndustryIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
        <h1 className="text-4xl font-bold sm:text-5xl">Automation by Industry</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Industry-specific AI automation solutions tailored to your sector's unique challenges and compliance requirements.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              to={`/industry/${ind.slug}`}
              className="glass-card group rounded-2xl border border-border/50 p-6 hover:border-neon-blue/30 transition-all"
            >
              <h2 className="text-xl font-semibold group-hover:text-neon-blue transition-colors">{ind.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{ind.metaDesc.slice(0, 100)}...</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
