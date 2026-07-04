import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SEOPageTemplate from "@/components/SEOPageTemplate";
import { locations, getLocation } from "@/data/locations";
import { services } from "@/data/services";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";
import { breadcrumbSchema, localBusinessSchema, faqSchema, reviewSchema } from "@/seo/schema";
import { testimonials } from "@/data/testimonials";

export const Route = createFileRoute("/locations/$city")({
  loader: ({ params }) => {
    const location = getLocation(params.city);
    if (!location) throw notFound();
    return { location };
  },
  head: ({ loaderData }) => {
    const { location } = loaderData;
    const meta = buildMeta(`/locations/${location.slug}`, location.metaTitle, location.metaDesc);
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { location } = Route.useLoaderData();
  const localTestimonial = testimonials.find((t) => t.location === location.city);
  const locationFaqs = [
    { q: `What automation services do you offer in ${location.city}?`, a: `We offer n8n workflow automation, AI agent development, WhatsApp bots, Telegram bots, RAG systems, and business process automation to businesses in ${location.city} and surrounding areas.` },
    { q: `How much does automation cost in ${location.city}?`, a: `Pricing starts at $2,500 per workflow and varies based on complexity. We provide free consultations to assess your needs and provide accurate quotes.` },
    { q: `How long does it take to implement automation in ${location.city}?`, a: `Most automations go live in 2-4 weeks. Complex projects involving multiple system integrations typically take 4-8 weeks.` },
    { q: `Do you work with businesses outside ${location.city}?`, a: `Yes. While we have a strong presence in ${location.city}, we serve clients across ${location.state} and globally through remote delivery.` },
  ];

  return (
    <SEOPageTemplate
      h1={location.h1}
      metaTitle={location.metaTitle}
      metaDesc={location.metaDesc}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Locations", url: "/locations" },
        { name: location.city, url: `/locations/${location.slug}` },
      ]}
      schema={[
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Locations", url: "/locations" },
          { name: location.city, url: `/locations/${location.slug}` },
        ]),
        localBusinessSchema(
          `FLOLOGIXAUTOMATIONS — ${location.city}`,
          `AI automation agency serving ${location.city}`,
          location.city, location.state, location.country, location.lat, location.lng,
        ),
        faqSchema(locationFaqs),
        ...(localTestimonial ? [reviewSchema(localTestimonial)] : []),
      ]}
      sections={[
        { id: "intro", title: `AI Automation Services in ${location.city}`, content: [location.intro], type: "paragraph" },
        { id: "industries", title: `Industries We Serve in ${location.city}`, content: location.industries, type: "list" },
        { id: "services", title: "Our Services", content: services.map((s) => s.title), type: "list" },
        { id: "areas", title: "Service Areas", content: location.serviceArea.map((a) => `${a}, ${location.city}`), type: "list" },
        { id: "landmarks", title: "Nearby Locations We Cover", content: location.nearbyLandmarks, type: "list" },
        { id: "why", title: `Why Choose Us in ${location.city}?`, content: [
          `Local expertise: We understand the ${location.city} business landscape`,
          "Proven results: 98% client satisfaction rate across all services",
          "Quick deployment: Most automations live in 2-4 weeks",
          "Ongoing support: Dedicated support team for ${location.city} clients",
        ], type: "list" },
      ]}
      faqs={locationFaqs}
      stats={[
        { label: "Population Served", value: location.population },
        { label: "Businesses", value: location.businesses },
        { label: "Client Satisfaction", value: "98%" },
        { label: "Avg. Time to Deploy", value: "3 weeks" },
      ]}
      imageAlt={location.imageAlt}
      locationSlug={location.slug}
    />
  );
}
