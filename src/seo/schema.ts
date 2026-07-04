const SITE_URL = "https://flologixautomations.lovable.app";
const SITE_NAME = "FLOLOGIXAUTOMATIONS";

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

export function localBusinessSchema(name: string, description: string, city: string, state: string, country: string, lat: string, lng: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE_NAME} — ${city}`,
    description,
    address: { "@type": "PostalAddress", addressLocality: city, addressRegion: state, addressCountry: country },
    geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng },
    url: `${SITE_URL}/locations/${city.toLowerCase().replace(/\s+/g, "-")}`,
    telephone: "+919381154482",
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

export function articleSchema(title: string, description: string, author: string, date: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Person", name: author },
    datePublished: date,
    publisher: { "@type": "Organization", name: SITE_NAME },
    image: image || `${SITE_URL}/og-image.jpg`,
  };
}

export function howToSchema(name: string, description: string, steps: { title: string; desc: string }[]) {
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

export function speakableSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".blog-content p", ".faq-answer"] },
    url: `${SITE_URL}${path}`,
  };
}
