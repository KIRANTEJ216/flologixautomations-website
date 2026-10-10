import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { fetchPost, fetchRelatedPosts } from "@/utils/blog.server";
import type { Post, RelatedPost } from "@/utils/blog.server";
import { buildMeta, metaToTags, canonicalLink, SITE_URL } from "@/seo/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  speakableSchema,
  DEFAULT_OG_IMAGE,
} from "@/seo/schema";
import { findLinksForContext } from "@/seo/internal-links";

const BLOG_DESCRIPTION_FALLBACK =
  "Practical guidance on AI agents, workflow automation, and the systems behind modern businesses.";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { post } = await fetchPost({ data: params.slug });
    if (!post) throw notFound();

    const related = await fetchRelatedPosts({
      data: { slug: post.slug, categories: post.categories, tags: post.tags, limit: 3 },
    });
    return { post, related };
  },
  head: ({ loaderData }) => {
    // loaderData is absent when the loader threw notFound(); head() still runs
    // for the 404 render, so it must not assume the post resolved.
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Post not found — FLOLOGIXAUTOMATIONS" }] };
    }

    const path = `/blog/${post.slug}`;
    // seo.meta_title / meta_description override the defaults so titles can be
    // A/B tested without changing the visible H1.
    const meta = buildMeta(
      path,
      post.seo?.meta_title || post.title,
      post.seo?.meta_description || post.excerpt || BLOG_DESCRIPTION_FALLBACK,
    );

    // buildMeta's ogImage is the bare site default; prefer the post's own image.
    const ogImage = post.featured_image?.startsWith("http")
      ? post.featured_image
      : `${SITE_URL}${post.featured_image || DEFAULT_OG_IMAGE}`;

    return {
      meta: [
        ...metaToTags(meta),
        { property: "og:image", content: ogImage },
        { property: "og:type", content: "article" },
        { property: "og:url", content: meta.canonical },
        { name: "twitter:image", content: ogImage },
        { property: "article:published_time", content: post.published_at },
        ...(post.updated_at
          ? [{ property: "article:modified_time", content: post.updated_at }]
          : []),
        ...post.categories.map((c) => ({ property: "article:section", content: c })),
        ...post.tags.map((t) => ({ property: "article:tag", content: t })),
      ],
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: BlogPost,
  notFoundComponent: BlogPostNotFound,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {import.meta.env.DEV && error instanceof Error && error.message ? error.message : "An unexpected error occurred."}
        </p>
        <Link to="/blog" className="mt-6 inline-block text-foreground underline">
          ← Back to blog
        </Link>
      </div>
    </div>
  ),
});

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function BlogPost() {
  const { post, related } = Route.useLoaderData();

  const path = `/blog/${post.slug}`;
  const description = post.excerpt || BLOG_DESCRIPTION_FALLBACK;

  const schema = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: path },
    ]),
    articleSchema({
      title: post.title,
      description,
      author: post.author,
      path,
      publishedAt: post.published_at,
      ...(post.updated_at ? { modifiedAt: post.updated_at } : {}),
      ...(post.featured_image ? { image: post.featured_image } : {}),
      ...(post.seo?.word_count ? { wordCount: post.seo.word_count } : {}),
      ...(post.categories.length ? { categories: post.categories } : {}),
      ...(post.tags.length ? { keywords: post.tags } : {}),
    }),
    speakableSchema(path),
    // FAQPage must be backed by the same questions rendered on the page below,
    // otherwise Google treats the structured data as a mismatch.
    ...(post.faqs?.length ? [faqSchema(post.faqs.map((f) => ({ q: f.q, a: f.a })))] : []),
  ];

  const internalLinks = findLinksForContext({ perSection: 3 });
  const publishedLabel = formatDate(post.published_at);
  const updatedLabel = post.updated_at ? formatDate(post.updated_at) : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </nav>

        {post.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-neon-blue/10 px-2 py-0.5 text-xs text-neon-blue"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {publishedLabel && <span>{publishedLabel}</span>}
          <span>· {post.author}</span>
          {post.seo?.reading_time && <span>· {post.seo.reading_time}</span>}
          {updatedLabel && updatedLabel !== publishedLabel && (
            <span className="text-xs">· Updated {updatedLabel}</span>
          )}
        </div>

        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            width={1200}
            height={675}
            className="mt-8 aspect-video w-full rounded-2xl object-cover"
          />
        )}

        <article className="blog-content mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

        {/* FAQ — visible text here must match the FAQPage JSON-LD above */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16" id="faqs">
            <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="glass-card group cursor-pointer rounded-2xl border border-border/50 p-6"
                >
                  <summary className="flex list-none items-center justify-between font-medium text-foreground">
                    {faq.q}
                    <span className="text-muted-foreground transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="faq-answer mt-4 leading-relaxed text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {post.tags.length > 0 && (
          <div className="mt-12 border-t border-border pt-6">
            <p className="mb-3 text-sm font-semibold">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-posts">
            <h2 id="related-posts" className="text-2xl font-semibold sm:text-3xl">
              Related articles
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r: RelatedPost) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="glass-card rounded-2xl border border-border/50 p-5 transition-all duration-300 hover:border-foreground/40"
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {formatDate(r.published_at)}
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-snug">{r.title}</h3>
                  {r.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{r.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links: routes are contextually relevant to the blog as a
            whole, and every href is verified to exist. */}
        <nav className="mt-16 border-t border-border pt-8" aria-label="Explore more">
          <div className="grid gap-8 sm:grid-cols-2">
            {internalLinks.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {section.title}
                </h2>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-foreground hover:text-neon-blue">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <section className="mt-16 rounded-2xl bg-gradient-to-r from-neon-blue/10 via-neon-cyan/10 to-neon-purple/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Automate?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tell us which process is eating your team's time and we'll show you what automating it
            would look like.
          </p>
          <Link
            to="/"
            hash="contact"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Free Consultation
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function BlogPostNotFound() {
  const { slug } = Route.useParams();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <p className="mt-2 text-muted-foreground">No article exists at &ldquo;{slug}&rdquo;.</p>
        <Link to="/blog" className="mt-6 inline-block text-foreground underline">
          ← Back to blog
        </Link>
      </main>
      <Footer />
    </div>
  );
}
