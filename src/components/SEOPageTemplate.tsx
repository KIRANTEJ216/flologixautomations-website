import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { findLinksForContext, type RelatedSection } from "@/seo/internal-links";

interface PageSection {
  id: string;
  title?: string;
  content: string[];
  type: "paragraph" | "list" | "steps" | "faq" | "stats" | "cta";
}

interface SEOPageTemplateProps {
  h1: string;
  metaTitle: string;
  metaDesc: string;
  sections: PageSection[];
  breadcrumbs: { name: string; url: string }[];
  schema: Record<string, unknown>[];
  faqs: { q: string; a: string }[];
  stats?: { label: string; value: string }[];
  ctaText?: string;
  ctaHref?: string;
  imageAlt?: string;
  readingTime?: string;
  lastUpdated?: string;
  author?: string;
  serviceSlug?: string;
  industrySlug?: string;
  locationSlug?: string;
}

export default function SEOPageTemplate(props: SEOPageTemplateProps) {
  const internalLinks = findLinksForContext(props.serviceSlug, props.industrySlug, props.locationSlug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {props.schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {props.breadcrumbs.map((crumb, i) => (
            <Fragment key={crumb.url}>
              {i > 0 && <span>/</span>}
              {i === props.breadcrumbs.length - 1 ? (
                <span className="text-foreground">{crumb.name}</span>
              ) : (
                <Link to={crumb.url} className="hover:text-foreground transition-colors">
                  {crumb.name}
                </Link>
              )}
            </Fragment>
          ))}
        </nav>

        {/* Meta info */}
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {props.readingTime && <span>📖 {props.readingTime}</span>}
          {props.lastUpdated && <span>🔄 Updated: {props.lastUpdated}</span>}
          {props.author && <span>✍️ By {props.author}</span>}
        </div>

        {/* H1 */}
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{props.h1}</h1>

        {/* Sections */}
        <div className="mt-12 space-y-16">
          {props.sections.map((section) => (
            <section key={section.id} id={section.id}>
              {section.title && (
                <h2 className="text-2xl font-semibold mb-6 sm:text-3xl">{section.title}</h2>
              )}
              {renderSectionContent(section)}
            </section>
          ))}
        </div>

        {/* Stats */}
        {props.stats && props.stats.length > 0 && (
          <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {props.stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-neon-blue">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </section>
        )}

        {/* FAQs */}
        {props.faqs.length > 0 && (
          <section className="mt-16" id="faqs">
            <h2 className="text-2xl font-semibold mb-8 sm:text-3xl">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {props.faqs.map((faq) => (
                <details key={faq.q} className="glass-card rounded-2xl border border-border/50 p-6 group cursor-pointer">
                  <summary className="font-medium text-foreground list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-muted-foreground transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed faq-answer">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-gradient-to-r from-neon-blue/10 via-neon-cyan/10 to-neon-purple/10 p-8 sm:p-12 text-center" id="cta">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Automate?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Get a free consultation. We'll analyze your processes and show you exactly how much you can save with automation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={props.ctaHref || "/#contact"}
              className="inline-flex items-center justify-center rounded-full bg-neon-blue px-8 py-3 text-base font-medium text-primary-foreground hover:bg-neon-blue/80 transition-colors"
            >
              {props.ctaText || "Get Free Consultation"}
            </a>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center rounded-full border border-neon-blue/30 px-8 py-3 text-base font-medium hover:bg-neon-blue/10 transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mt-16" id="related">
          <h2 className="text-2xl font-semibold mb-8">Explore More</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map((group) => (
              <div key={group.title} className="glass-card rounded-2xl border border-border/50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className="text-sm text-foreground hover:text-neon-blue transition-colors underline underline-offset-2">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function renderSectionContent(section: PageSection) {
  switch (section.type) {
    case "paragraph":
      return section.content.map((p, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed mt-4 first:mt-0">{p}</p>
      ));
    case "list":
      return (
        <ul className="space-y-3">
          {section.content.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-neon-blue" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div className="space-y-6">
          {section.content.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neon-blue/10 text-neon-blue text-sm font-bold">
                {i + 1}
              </div>
              <p className="text-muted-foreground leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      );
    case "stats":
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.content.map((stat, i) => (
            <div key={i} className="glass-card rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">{stat}</p>
            </div>
          ))}
        </div>
      );
    case "cta":
      return null; // Rendered separately
    default:
      return null;
  }
}
