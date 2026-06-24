/**
 * JSON-LD @graph — Fronz being legible to machines.
 * This is Groundswell, demonstrated on its own site: structured, answer-first,
 * verifiable entities so AI engines can cite Fronz accurately.
 */
import { SITE } from "./content";
import type { LineDetail } from "./lines";

const personId = `${SITE.url}/#stacey`;
const orgId = `${SITE.url}/#org`;

/**
 * Per-line Service + FAQPage schema — answer-first, citable.
 * The line pages prove the very AEO that Groundswell sells.
 */
/** Parse a human price string ("$1,500", "$15k–$25k", "from $30,000") into numbers. */
function parsePrice(raw: string): { low: number; high: number } | null {
  const nums = [...raw.matchAll(/([\d,.]+)\s*(k)?/gi)]
    .map((m) => {
      const n = parseFloat(m[1].replace(/,/g, ""));
      return m[2] ? n * 1000 : n;
    })
    .filter((n) => !Number.isNaN(n) && n > 0);
  if (nums.length === 0) return null;
  return { low: Math.min(...nums), high: Math.max(...nums) };
}

export function lineSchema(line: LineDetail) {
  const offers = line.tiers.items.map((tier) => {
    const base = {
      name: `${line.name} — ${tier.name}`,
      description: tier.tagline ?? tier.points[0],
      priceCurrency: "USD",
    };
    const p = parsePrice(tier.price);
    if (p && p.low !== p.high) {
      return {
        "@type": "AggregateOffer",
        ...base,
        lowPrice: String(p.low),
        highPrice: String(p.high),
      };
    }
    return {
      "@type": "Offer",
      ...base,
      price: p ? String(p.low) : undefined,
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/${line.slug}#service`,
        name: `${line.name} by Fronz`,
        serviceType: line.name,
        description: line.heroSub,
        provider: { "@id": orgId },
        areaServed: "Worldwide",
        offers,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/${line.slug}#faq`,
        mainEntity: line.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Stacey Fronek",
      jobTitle: "Founder & GTM Systems Consultant",
      worksFor: { "@id": orgId },
      email: `mailto:${SITE.email}`,
      description:
        "GTM and growth-systems consultant who helps founders get understood by their customers and found by the AI those customers ask. A decade producing for PopSockets, Hotels.com, Xfinity, the Ethereum Foundation, and Protocol Labs.",
      knowsAbout: [
        "Go-to-market strategy",
        "Positioning",
        "Answer Engine Optimization",
        "Generative Engine Optimization",
        "Business intelligence",
        "Marketing systems",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": orgId,
      name: SITE.name,
      url: SITE.url,
      slogan: SITE.tagline,
      description: SITE.description,
      founder: { "@id": personId },
      email: `mailto:${SITE.email}`,
      areaServed: "Worldwide",
      priceRange: "$1,500–$30,000+",
      knowsAbout: [
        "GTM consulting",
        "Positioning workshops",
        "AI visibility / AEO",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          name: "GTM Clarity Jam",
          description:
            "A 2-hour 1:1 workshop that produces your core positioning sentence and launch wedge.",
          price: "1500",
          priceCurrency: "USD",
          category: "GTM Clarity",
        },
        {
          "@type": "Offer",
          name: "Groundswell Visibility Audit",
          description:
            "An audit of where AI engines omit your brand and a community-consensus plan to become the answer.",
          price: "1500",
          priceCurrency: "USD",
          category: "Groundswell",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": orgId },
      inLanguage: "en-US",
    },
  ],
};
