import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { locations } from "@/data/locations";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";

export const Route = createFileRoute("/locations/")({
  head: () => {
    const meta = buildMeta("/locations", "AI Automation Locations | We Serve Globally", "Find AI automation services in your city. We serve Hyderabad, Dallas, Mumbai, Bangalore, New York, London and more locations worldwide.");
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: LocationsIndex,
});

function LocationsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
        <h1 className="text-4xl font-bold sm:text-5xl">Locations We Serve</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
          AI automation services delivered globally. Find the office nearest to you or work with us remotely.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              to={`/locations/${loc.slug}`}
              className="glass-card group rounded-2xl border border-border/50 p-6 hover:border-neon-blue/30 transition-all"
            >
              <h2 className="text-xl font-semibold group-hover:text-neon-blue transition-colors">{loc.city}, {loc.state}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{loc.country}</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{loc.metaDesc.slice(0, 100)}...</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
