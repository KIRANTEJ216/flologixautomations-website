import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { industries } from "@/data/industries";
import { solutions } from "@/data/solutions";
import { caseStudies } from "@/data/testimonials";

export interface InternalLink {
  label: string;
  href: string;
}

export interface RelatedSection {
  title: string;
  links: InternalLink[];
}

/**
 * Only routes that actually exist may be linked.
 *
 * The caseStudies data set is complete (challenge/solution/results) but there is
 * no /case-studies route, so linking it emitted 404s — which is worse than
 * omitting the section: it burns crawl budget and leaks internal PageRank into
 * nowhere. Re-enable the block below once the route is built.
 */
const CASE_STUDIES_ROUTE_EXISTS = false;

const staticLinks: Record<string, InternalLink[]> = {
  services: services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  locations: locations.map((l) => ({
    label: `AI Automation in ${l.city}`,
    href: `/locations/${l.slug}`,
  })),
  industries: industries.map((i) => ({
    label: `${i.name} Automation`,
    href: `/industry/${i.slug}`,
  })),
  solutions: solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })),
  caseStudies: CASE_STUDIES_ROUTE_EXISTS
    ? caseStudies.map((c) => ({ label: c.client, href: `/case-studies/${c.slug}` }))
    : [],
};

export function getRelatedServices(currentSlug?: string): InternalLink[] {
  return staticLinks.services.filter((s) => s.href !== `/services/${currentSlug}`);
}

export function getRelatedLocations(currentSlug?: string): InternalLink[] {
  return staticLinks.locations.filter((l) => l.href !== `/locations/${currentSlug}`);
}

export function getRelatedIndustries(currentSlug?: string): InternalLink[] {
  return staticLinks.industries.filter((i) => i.href !== `/industry/${currentSlug}`);
}

export function getRelatedSolutions(currentSlug?: string): InternalLink[] {
  return staticLinks.solutions.filter((s) => s.href !== `/solutions/${currentSlug}`);
}

export function getRelatedCaseStudies(): InternalLink[] {
  return staticLinks.caseStudies;
}

export interface LinkContext {
  serviceSlug?: string;
  industrySlug?: string;
  locationSlug?: string;
  /** Links per section. Blog posts use fewer than PSEO landing pages. */
  perSection?: number;
}

/**
 * Drops empty sections so a disabled route (see CASE_STUDIES_ROUTE_EXISTS)
 * never renders as an empty heading.
 */
function pushIfAny(sections: RelatedSection[], section: RelatedSection) {
  if (section.links.length > 0) sections.push(section);
}

export function findLinksForContext(
  serviceSlugOrContext?: string | LinkContext,
  industrySlug?: string,
  locationSlug?: string,
): RelatedSection[] {
  // Supports the original (service, industry, location) positional signature
  // used by SEOPageTemplate, plus an options object for new callers.
  const ctx: LinkContext =
    typeof serviceSlugOrContext === "object" && serviceSlugOrContext !== null
      ? serviceSlugOrContext
      : { serviceSlug: serviceSlugOrContext, industrySlug, locationSlug };

  const perSection = ctx.perSection ?? 4;
  const sections: RelatedSection[] = [];

  if (ctx.serviceSlug) {
    const svc = services.find((s) => s.slug === ctx.serviceSlug);
    if (svc) {
      sections.push({
        title: `Related ${svc.shortTitle} Insights`,
        links: [
          { label: "View all automation services", href: "/services" },
          ...getRelatedServices(ctx.serviceSlug).slice(0, perSection - 1),
        ],
      });
    }
  }

  if (ctx.industrySlug) {
    pushIfAny(sections, {
      title: "Industry Solutions",
      links: getRelatedIndustries(ctx.industrySlug).slice(0, perSection),
    });
  }

  if (ctx.locationSlug) {
    pushIfAny(sections, {
      title: "Service Locations",
      links: getRelatedLocations(ctx.locationSlug).slice(0, perSection),
    });
  }

  pushIfAny(sections, {
    title: "Explore Solutions",
    links: getRelatedSolutions().slice(0, perSection),
  });

  pushIfAny(sections, {
    title: "Case Studies",
    links: getRelatedCaseStudies().slice(0, 3),
  });

  pushIfAny(sections, {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/#contact" },
    ],
  });

  return sections;
}
