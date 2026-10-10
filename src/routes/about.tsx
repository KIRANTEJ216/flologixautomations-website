import { createFileRoute } from "@tanstack/react-router";
import { canonicalLink, SITE_URL } from "@/seo/metadata";
import { breadcrumbSchema, aboutPageSchema } from "@/seo/schema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => {
    const meta = {
      title: "About Flologix Automations | AI Automation Agency for SMBs",
      description:
        "Flologix Automations is an AI automation agency building n8n workflows, AI agents, WhatsApp and Telegram bots, and RAG systems for small and medium businesses.",
      canonical: `${SITE_URL}/about`,
    };
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
        { property: "og:url", content: meta.canonical },
        { property: "og:type", content: "website" },
      ],
      links: [canonicalLink(meta.canonical)],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(aboutPageSchema()) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ]),
          ),
        },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          About Flologix Automations
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We are an AI automation agency. We build software that removes repetitive
          manual work for small and medium businesses — so teams can serve more
          customers without hiring more people.
        </p>

        <h2 className="mt-12 text-2xl font-bold">What we do</h2>
        <p className="mt-4">
          Most small businesses lose their working week to processes a person repeats
          hundreds of times: copying data between systems, answering the same customer
          questions, chasing invoices, re-keying records, compiling reports. That work
          is predictable enough to automate and important enough to be worth automating
          properly.
        </p>
        <p className="mt-4">
          We design and build those systems. Each engagement starts with finding the
          processes where time is actually being lost, then implements only the
          automation that earns its keep. We work with open-source tooling wherever
          possible so you are not locked into a platform you cannot leave.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Our services</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>n8n workflow automation</strong> — custom multi-step workflows and
            API integrations, self-hosted or cloud.
          </li>
          <li>
            <strong>AI agent development</strong> — agentic systems that reason over
            your data and act on it, built on GPT-4, Claude or open-source models.
          </li>
          <li>
            <strong>WhatsApp and Telegram bot development</strong> — customer support,
            lead qualification and order automation on the official Business APIs.
          </li>
          <li>
            <strong>RAG systems</strong> — retrieval-augmented search that answers
            questions from your own documents, with citations.
          </li>
          <li>
            <strong>Business process automation</strong> — end-to-end process redesign,
            including invoice processing and OCR.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold">Who we work with</h2>
        <p className="mt-4">
          We build for small and medium businesses — typically 20 to 500 people — across
          healthcare, e-commerce, financial services, manufacturing, real estate and
          education. We have delivered projects in India, the United States, the United
          Kingdom, the UAE and Singapore.
        </p>
        <p className="mt-4">
          We are deliberately not an enterprise consultancy. If you need a system that
          serves ten thousand concurrent users with five nines of uptime, we will tell
          you that is the wrong shape of problem for us.
        </p>

        <h2 className="mt-12 text-2xl font-bold">How we work</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6">
          <li>
            <strong>Discovery.</strong> We map the processes that consume the most
            manual hours and identify what is genuinely automatable.
          </li>
          <li>
            <strong>Design.</strong> We specify the workflow, the integrations and the
            failure handling before writing code.
          </li>
          <li>
            <strong>Build.</strong> We implement in short, reviewable increments so you
            see working software early rather than at the end.
          </li>
          <li>
            <strong>Handover.</strong> You get the system, the documentation and the
            ability to maintain it without us.
          </li>
        </ol>

        <h2 className="mt-12 text-2xl font-bold">Technology</h2>
        <p className="mt-4">
          Our stack centres on n8n for orchestration, with PostgreSQL, Redis, and
          containerised deployment on Docker. For model inference we work with OpenAI
          GPT-4, Anthropic Claude, Google Gemini and self-hosted open-source models,
          choosing per use case based on cost, latency and data-residency requirements.
          Messaging automation runs on the official WhatsApp Business API and Telegram
          Bot API.
        </p>
        <p className="mt-4">
          We prefer open source for the parts that touch your data, because
          self-hosting is the only way to guarantee where your data lives.
        </p>

        <h2 className="mt-12 text-2xl font-bold">Talk to us</h2>
        <p className="mt-4">
          If you have a process you suspect should be automated, tell us what it is. We
          will tell you honestly whether automation is the right answer — sometimes it
          is not, and we would rather say so at the start.
        </p>
        <p className="mt-4">
          Email{" "}
          <a href="mailto:contactus@flologixautomations.com" className="underline">
            contactus@flologixautomations.com
          </a>{" "}
          or call{" "}
          <a href="tel:+919985860659" className="underline">
            +91 99 858 606 59
          </a>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}