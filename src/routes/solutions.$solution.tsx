import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import SEOPageTemplate from "@/components/SEOPageTemplate";
import { solutions, getSolution } from "@/data/solutions";
import { buildMeta, metaToTags, canonicalLink } from "@/seo/metadata";
import { breadcrumbSchema, faqSchema, howToSchema } from "@/seo/schema";

export const Route = createFileRoute("/solutions/$solution")({
  loader: ({ params }) => {
    const solution = getSolution(params.solution);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => {
    const { solution } = loaderData;
    const meta = buildMeta(`/solutions/${solution.slug}`, solution.metaTitle, solution.metaDesc);
    return {
      meta: metaToTags(meta),
      links: [canonicalLink(meta.canonical)],
    };
  },
  component: SolutionPage,
});

function SolutionPage() {
  const { solution } = Route.useLoaderData();

  const solutionFaqs = [
    { q: `How quickly will I see results from ${solution.title.toLowerCase()}?`, a: `Most clients see measurable results within 30 days of deployment. ROI is typically achieved within 3-6 months.` },
    { q: `What's the first step to get started?`, a: `We offer a free consultation where we analyze your current processes, identify automation opportunities, and provide a detailed proposal with ROI estimates.` },
    { q: `Do you provide ongoing support after deployment?`, a: `Yes. All our solutions come with a 14-day hyper-care period post-deployment, followed by ongoing support and maintenance options.` },
    { q: `Can this solution be customized for my specific needs?`, a: `Absolutely. Every solution we build is custom-designed for your specific workflows, systems, and business requirements. There are no one-size-fits-all solutions.` },
  ];

  return (
    <SEOPageTemplate
      h1={solution.h1}
      metaTitle={solution.metaTitle}
      metaDesc={solution.metaDesc}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Solutions", url: "/solutions" },
        { name: solution.title, url: `/solutions/${solution.slug}` },
      ]}
      schema={[
        breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Solutions", url: "/solutions" },
          { name: solution.title, url: `/solutions/${solution.slug}` },
        ]),
        faqSchema(solutionFaqs),
        howToSchema(solution.title, solution.intro, solution.approach.map((a, i) => ({ title: `Step ${i + 1}`, desc: a }))),
      ]}
      sections={[
        { id: "intro", title: "Overview", content: [solution.intro], type: "paragraph" },
        { id: "problem", title: "The Problem", content: [solution.problem], type: "paragraph" },
        { id: "approach", title: "Our Approach", content: solution.approach, type: "steps" },
        { id: "outcome", title: "The Outcome", content: [solution.outcome], type: "paragraph" },
      ]}
      faqs={solutionFaqs}
      stats={[
        { label: "Avg. Cost Reduction", value: "50-70%" },
        { label: "Implementation", value: "2-8 weeks" },
        { label: "Client Satisfaction", value: "98%" },
        { label: "ROI Timeline", value: "3-6 months" },
      ]}
      imageAlt={solution.imageAlt}
    />
  );
}
