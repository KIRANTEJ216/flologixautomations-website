import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { solutions } from "@/data/solutions";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";

export const Route = createFileRoute("/solutions/")({
  head: () => {
    const meta = buildMeta("/solutions", "AI Automation Solutions | Business Problem Solvers", "Explore our AI automation solutions: reduce costs, improve customer response, scale without hiring, automate invoice processing, and improve SEO rankings.");
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
        <h1 className="text-4xl font-bold sm:text-5xl">Solutions for Your Business</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          Targeted automation solutions designed to solve specific business challenges. Pick your problem, we'll build the solution.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              to={`/solutions/${solution.slug}`}
              className="glass-card group rounded-2xl border border-border/50 p-6 hover:border-neon-blue/30 transition-all"
            >
              <h2 className="text-xl font-semibold group-hover:text-neon-blue transition-colors">{solution.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{solution.metaDesc.slice(0, 120)}...</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
