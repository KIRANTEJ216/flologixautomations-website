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

const staticLinks: Record<string, InternalLink[]> = {
  services: services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  locations: locations.map((l) => ({ label: `AI Automation in ${l.city}`, href: `/locations/${l.slug}` })),
  industries: industries.map((i) => ({ label: `${i.name} Automation`, href: `/industry/${i.slug}` })),
  solutions: solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })),
  caseStudies: caseStudies.map((c) => ({ label: c.client, href: `/case-studies/${c.slug}` })),
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

export function findLinksForContext(serviceSlug?: string, industrySlug?: string, locationSlug?: string): RelatedSection[] {
  const sections: RelatedSection[] = [];

  if (serviceSlug) {
    const svc = services.find((s) => s.slug === serviceSlug);
    if (svc) {
      sections.push({ title: `Related ${svc.shortTitle} Insights`, links: [
        { label: `View all automation services`, href: "/services" },
        ...getRelatedServices(serviceSlug).slice(0, 4),
      ]});
    }
  }

  if (industrySlug) {
    sections.push({ title: "Industry Solutions", links: getRelatedIndustries(industrySlug).slice(0, 4) });
  }

  if (locationSlug) {
    sections.push({ title: "Service Locations", links: getRelatedLocations(locationSlug).slice(0, 4) });
  }

  sections.push(
    { title: "Explore Solutions", links: getRelatedSolutions().slice(0, 4) },
    { title: "Case Studies", links: getRelatedCaseStudies().slice(0, 3) },
    { title: "Quick Links", links: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/#contact" },
    ]}
  );

  return sections;
}
