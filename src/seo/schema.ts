import { SITE_URL, SITE_NAME } from "@/seo/metadata";

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}${url}`,
    areaServed: { "@type": "Country", name: "IN" },
  };
}

export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function localBusinessSchema(
  name: string,
  description: string,
  city: string,
  state: string,
  country: string,
  lat: string,
  lng: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE_NAME} — ${city}`,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: state,
      addressCountry: country,
    },
    geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
    url: `${SITE_URL}/locations/${city.toLowerCase().replace(/\s+/g, "-")}`,
    telephone: "+919985860659",
    areaServed: city,
  };
}

export function reviewSchema(review: { name: string; text: string; rating: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: SITE_NAME },
    author: { "@type": "Person", name: review.name },
    reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
    reviewBody: review.text,
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  author: string;
  path: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
  wordCount?: number;
  categories?: string[];
  keywords?: string[];
}

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/**
 * BlogPosting rather than Article: Google treats BlogPosting as the more
 * specific subtype, and Article markup on a blog URL is a common mismatch
 * signal. `image`, `dateModified`, `mainEntityOfPage` and the publisher logo
 * are all explicitly recommended by Google's Article structured data guidance.
 */
export function articleSchema(input: ArticleSchemaInput) {
  const url = `${SITE_URL}${input.path}`;
  const image = input.image?.startsWith("http")
    ? input.image
    : `${SITE_URL}${input.image || DEFAULT_OG_IMAGE}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: input.title.slice(0, 110),
    description: input.description,
    image: [image],
    datePublished: input.publishedAt,
    dateModified: input.modifiedAt || input.publishedAt,
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    ...(input.categories?.length ? { articleSection: input.categories } : {}),
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    inLanguage: "en",
    author: { "@type": "Person", name: input.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
      },
    },
  };
}

/** Collection page markup for /blog. */
export function blogIndexSchema(
  name: string,
  description: string,
  posts: { title: string; path: string; publishedAt: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name,
    description,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}${p.path}#article`,
      headline: p.title,
      url: `${SITE_URL}${p.path}`,
      datePublished: p.publishedAt,
    })),
  };
}

export function howToSchema(
  name: string,
  description: string,
  steps: { title: string; desc: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };
}

/**
 * About page markup.
 *
 * Deliberately carries no `Person` entity: naming founders or team members as
 * `Person` schema without real, attributable profiles would be the same class
 * of problem as the removed AggregateRating — asserting facts about people that
 * cannot be verified. Add `Person` entries here once there are real team
 * members with real profiles to point `sameAs` at.
 */
export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    name: "About Flologix Automations",
    description:
      "Flologix Automations is an AI automation agency building n8n workflows, AI agents, messaging bots and RAG systems for small and medium businesses.",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      legalName: SITE_NAME,
      alternateName: "FlologixAutomations",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      foundingDate: "2023",
      email: "contactus@flologixautomations.com",
      telephone: "+919985860659",
      description:
        "AI automation agency for small and medium businesses. Builds n8n workflow automation, AI agents, WhatsApp and Telegram bots, RAG systems and invoice processing automation.",
      knowsAbout: [
        "AI automation",
        "business process automation",
        "n8n workflow automation",
        "agentic development",
        "AI agent development",
        "AI chatbot development",
        "WhatsApp bot development",
        "Telegram bot development",
        "RAG systems",
        "retrieval augmented generation",
        "document OCR automation",
        "invoice processing automation",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "contactus@flologixautomations.com",
          telephone: "+919985860659",
          areaServed: "Worldwide",
          availableLanguage: ["English"],
        },
      ],
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Singapore" },
      ],
    },
  };
}

export function speakableSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".blog-content p", ".faq-answer"],
    },
    url: `${SITE_URL}${path}`,
  };
}
