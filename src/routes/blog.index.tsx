import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchAllPosts } from "@/utils/blog.server";
import type { PostMeta } from "@/utils/blog.server";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";
import { blogIndexSchema } from "@/seo/schema";

const TITLE = "AI & Automation Insights";
const DESCRIPTION =
  "Latest articles on AI agents, workflow automation, WhatsApp bots, RAG systems, and the tools that scale modern businesses.";

export const Route = createFileRoute("/blog/")({
  head: () => {
    const meta = buildMeta("/blog", TITLE, DESCRIPTION);
    return {
      meta: metaToTags(meta),
      links: [
        canonicalLink(meta.canonical),
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: `${TITLE} — RSS`,
          href: `${meta.canonical}/rss.xml`,
        },
      ],
    };
  },
  loader: async () => {
    const { posts } = await fetchAllPosts();
    return { posts };
  },
  component: BlogIndex,
});

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  // Collection markup listing the posts, so /blog is a described entity rather
  // than just a set of links. Capped at 20 entries to keep the payload sane.
  const jsonLd = blogIndexSchema(
    TITLE,
    DESCRIPTION,
    posts.slice(0, 20).map((p: PostMeta) => ({
      title: p.title,
      path: `/blog/${p.slug}`,
      publishedAt: p.published_at,
    })),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Blog
          </p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">AI & Automation Insights</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Practical articles on AI agents, workflow automation, and the systems behind modern
            businesses.
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
                {p.featured_image && (
                  <img
                    src={p.featured_image}
                    alt=""
                    width={1200}
                    height={675}
                    loading="lazy"
                    className="mb-4 aspect-video w-full rounded-xl object-cover"
                  />
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-2 py-0.5 rounded-full bg-neon-blue/10 text-neon-blue"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {formatDate(p.published_at)}
                </p>
                <h2 className="mt-3 text-xl font-semibold group-hover:text-foreground">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-4 inline-block text-sm font-medium text-foreground underline">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
