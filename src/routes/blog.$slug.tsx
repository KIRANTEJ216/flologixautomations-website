import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchPost } from "@/utils/blog.server";
import type { Post } from "@/utils/blog.server";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { post, error } = await fetchPost({ data: params.slug });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.post.title} — FLOLOGIXAUTOMATIONS Blog` },
      { name: "description", content: loaderData.post.excerpt },
      { property: "og:title", content: loaderData.post.title },
      { property: "og:description", content: loaderData.post.excerpt },
      { property: "og:image", content: loaderData.post.featured_image || "https://flologixautomations.lovable.app/og-image.jpg" },
      { property: "article:published_time", content: loaderData.post.published_at },
      ...loaderData.post.tags?.map((t: { name: string }) => ({ property: "article:tag", content: t.name })) || [],
    ],
  }),
  component: BlogPost,
  notFoundComponent: () => {
    const { slug } = Route.useParams();
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 text-center">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <p className="mt-2 text-muted-foreground">No article exists at "{slug}".</p>
          <Link to="/blog" className="mt-6 inline-block text-foreground underline">← Back to blog</Link>
        </main>
        <Footer />
      </div>
    );
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{import.meta.env.DEV && error.message ? error.message : "An unexpected error occurred."}</p>
        <Link to="/blog" className="mt-6 inline-block text-foreground underline">← Back to blog</Link>
      </div>
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://flologixautomations.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://flologixautomations.lovable.app/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://flologixautomations.lovable.app/blog/${post.slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.published_at,
    publisher: { "@type": "Organization", name: "FLOLOGIXAUTOMATIONS" },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">← All articles</Link>

        {post.categories && post.categories.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.categories.map((cat: { name: string; slug: string }) => (
              <span key={cat.slug} className="text-xs px-2 py-0.5 rounded-full bg-neon-blue/10 text-neon-blue">
                {cat.name}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
          {post.published_at && new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.author}
        </p>

        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="mt-6 w-full rounded-2xl object-cover aspect-video"
          />
        )}

        <article
          className="blog-content mt-6"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-sm font-semibold mb-3">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: { name: string; slug: string }) => (
                <span key={tag.slug} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
