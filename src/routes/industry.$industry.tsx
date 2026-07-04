import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SEOPageTemplate from "@/components/SEOPageTemplate";
import { industries, getIndustry } from "@/data/industries";
import { services } from "@/data/services";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/seo/schema";

export const Route = createFileRoute("/industry/$industry")({
  loader: ({ params }) => {
    const industry = getIndustry(params.industry);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    const { industry } = loaderData;
    const meta = buildMeta(`/industry/${industry.slug}`, industry.metaTitle, industry.metaDesc);
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();

  const industryFaqs = [
    { q: `How can ${industry.name} businesses benefit from AI automation?`, a: `${industry.name} businesses can reduce operational costs by 50-70%, eliminate manual data entry errors, accelerate processing times, and free staff to focus on high-value work.` },
    { q: `Is AI automation secure for ${industry.name} companies?`, a: `Yes. We deploy all automation on secure infrastructure with encryption, access controls, and full audit trails. For regulated industries, we ensure HIPAA/GDPR/SOC2 compliance.` },
    { q: `How quickly can we implement automation in ${industry.name}?`, a: `Simple automations go live in 1-2 weeks. Complex multi-system processes take 4-8 weeks depending on integration requirements.` },
    { q: `Do you integrate with ${industry.name} specific software?`, a: `Yes. We integrate with industry-specific software through APIs, database connectors, and custom middleware when needed.` },
  ];

  return (
    <SEOPageTemplate
      h1={industry.h1}
      metaTitle={industry.metaTitle}
      metaDesc={industry.metaDesc}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Industries", url: "/industry" },
        { name: industry.name, url: `/industry/${industry.slug}` },
      ]}
      schema={[
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industry" },
          { name: industry.name, url: `/industry/${industry.slug}` },
        ]),
        faqSchema(industryFaqs),
      ]}
      sections={[
        { id: "intro", title: `AI Automation for ${industry.name}`, content: [industry.intro], type: "paragraph" },
        { id: "challenges", title: "Key Challenges We Solve", content: industry.challenges, type: "list" },
        { id: "opportunities", title: "Automation Opportunities", content: industry.automationOpportunities.map((o) => `${o.title}: ${o.desc}`), type: "list" },
        { id: "solutions", title: "Our Solutions", content: industry.solutions, type: "list" },
        { id: "services", title: "Related Services", content: services.map((s) => s.title), type: "list" },
      ]}
      faqs={industryFaqs}
      stats={industry.stats.map((stat) => {
        const [val, ...rest] = stat.split(" ");
        return { label: stat, value: val };
      })}
      imageAlt={industry.imageAlt}
      industrySlug={industry.slug}
    />
  );
}
