import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchAllPosts } from "@/utils/blog.server";
import type { PostMeta } from "@/utils/blog.server";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — AI & Automation Insights | FLOLOGIXAUTOMATIONS" },
      { name: "description", content: "Latest articles on AI agents, workflow automation, WhatsApp bots, RAG systems, and the tools that scale modern businesses." },
      { property: "og:title", content: "Blog — AI & Automation Insights" },
      { property: "og:description", content: "Latest articles on AI, automation, and the tools that scale modern businesses." },
    ],
  }),
  loader: async () => {
    const { posts } = await fetchAllPosts();
    return { posts };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Blog</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">AI & Automation Insights</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Practical articles on AI agents, workflow automation, and the systems behind modern businesses.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">
            <p>No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {posts.map((p: PostMeta) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="glass-card group rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-foreground/40 hover:scale-[1.01]"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.categories?.map((cat: { name: string }) => (
                    <span key={cat.name} className="text-xs px-2 py-0.5 rounded-full bg-neon-blue/10 text-neon-blue">
                      {cat.name}
                    </span>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {p.published_at && new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <h2 className="mt-3 text-xl font-semibold group-hover:text-foreground">{p.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-medium text-foreground underline">Read article →</span>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
