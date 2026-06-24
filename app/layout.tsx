import type { Metadata } from "next";
import { Fraunces, Figtree, Space_Mono } from "next/font/google";
import "./globals.css";
import { RevealReady } from "@/components/ui/RevealReady";
import { SITE } from "@/lib/content";
import { schemaGraph } from "@/lib/schema";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "GTM consulting",
    "positioning workshop",
    "answer engine optimization",
    "AEO",
    "AI visibility",
    "business intelligence dashboards",
    "fractional growth",
    "no retainer consulting",
  ],
  authors: [{ name: "Stacey Fronek" }],
  creator: "Stacey Fronek",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="grain min-h-dvh">
        <RevealReady />
        <script
          type="application/ld+json"
          // JSON-LD: makes Fronz legible to machines — Groundswell, proven on its own site.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
        {children}
      </body>
    </html>
  );
}
