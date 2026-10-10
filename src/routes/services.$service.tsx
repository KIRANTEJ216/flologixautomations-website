import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SEOPageTemplate from "@/components/SEOPageTemplate";
import { services, getService } from "@/data/services";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";
import { breadcrumbSchema, serviceSchema, faqSchema, howToSchema } from "@/seo/schema";

export const Route = createFileRoute("/services/$service")({
  loader: ({ params }) => {
    const service = getService(params.service);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return { meta: [{ title: "Service unavailable | Flologix" }, { name: "robots", content: "noindex" }] };
    const meta = buildMeta(
      `/services/${service.slug}`,
      service.metaTitle,
      service.metaDesc,
      [
        "AI automation agency",
        service.shortTitle,
        `${service.shortTitle} services`,
        "business automation",
        "AI automation",
        "hire AI automation agency",
        "AI agents",
        "chatbot",
        "automation consulting",
      ].join(", "),
    );
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();

  return (
    <SEOPageTemplate
      h1={service.h1}
      metaTitle={service.metaTitle}
      metaDesc={service.metaDesc}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: service.shortTitle, url: `/services/${service.slug}` },
      ]}
      schema={[
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]),
        serviceSchema(service.title, service.metaDesc, `/services/${service.slug}`),
        ...(!service.dedicatedLanding ? [faqSchema(service.faqs)] : []),
        howToSchema(`How We Build ${service.shortTitle}`, service.intro, service.steps),
      ]}
      sections={[
        ...(!service.dedicatedLanding ? [{ id: "intro", title: "Overview", content: [service.intro], type: "paragraph" as const }] : []),
        { id: "benefits", title: "Key Benefits", content: service.benefits.map((b) => `${b.title}: ${b.desc}`), type: "list" },
        { id: "problems", title: "Common Problems We Solve", content: service.problems, type: "list" },
        { id: "solutions", title: `Use Cases for ${service.shortTitle}`, content: service.solutions, type: "list" },
        { id: "process", title: "Our Process", content: service.steps.map((s) => `${s.title}: ${s.desc}`), type: "steps" },
      ]}
      faqs={service.faqs}
      stats={service.dedicatedLanding ? undefined : [
        { label: "Starting Price", value: service.price },
        { label: "Timeline", value: service.timeline },
        { label: "Satisfaction", value: "98%" },
        { label: "Cost Reduction", value: "Up to 70%" },
      ]}
      lead={service.dedicatedLanding ? service.intro : undefined}
      ctaText={`Discuss ${service.shortTitle}`}
      imageAlt={service.imageAlt}
      serviceSlug={service.slug}
    />
  );
}
