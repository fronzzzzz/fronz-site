import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { LINE_SLUGS } from "@/lib/lines";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...LINE_SLUGS.map((slug) => ({
      url: `${SITE.url}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
