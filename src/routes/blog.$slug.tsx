import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const url = `https://flologixautomations.lovable.app/blog/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Post — FLOLOGIXAUTOMATIONS Blog" }] };
    }
    return {
      meta: [
        { title: `${loaderData.post.title} — FLOLOGIXAUTOMATIONS Blog` },
        { name: "description", content: loaderData.post.excerpt },
        { property: "og:title", content: loaderData.post.title },
        { property: "og:description", content: loaderData.post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: loaderData.post.date },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.post.title,
            description: loaderData.post.excerpt,
            datePublished: loaderData.post.date,
            author: { "@type": "Person", name: loaderData.post.author },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
      ],
    };
  },
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
        <p className="mt-2 text-sm text-muted-foreground">Unable to load this article. Please try again later.</p>
        {import.meta.env.DEV && error.message && (
          <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">{error.message}</pre>
        )}
        <Link to="/blog" className="mt-6 inline-block text-foreground underline">← Back to blog</Link>
      </div>
    </div>
  ),
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">← All articles</Link>
        <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">
          {post.date && new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.author}
        </p>
        <article
          className="blog-content mt-4"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </main>
      <Footer />
    </div>
  );
}
