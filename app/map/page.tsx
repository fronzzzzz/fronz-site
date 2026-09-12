import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Highlight } from "@/components/ui/Highlight";
import { StarterFunnel } from "@/components/starter/StarterFunnel";
import { STARTER, calendlyUrl, starterTemplates } from "@/lib/content";

export const metadata: Metadata = {
  title: "GTM Clarity Map: see your whole business on one page",
  description: STARTER.sub,
  alternates: { canonical: "/map" },
};

function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "GTM Clarity Map",
    description: STARTER.sub,
    step: STARTER.parts.map((p) => ({
      "@type": "HowToStep",
      position: Number(p.n),
      name: p.title,
      text: p.body,
    })),
  };
}

export default function MapPage() {
  const templates = starterTemplates();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema()) }}
      />
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Header />
      <main>
        <section className="border-b border-line">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-14 md:px-10 md:py-20">
            <nav className="mb-8 font-mono text-xs uppercase tracking-widest text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Fronz
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">GTM Clarity Map</span>
            </nav>
            <p className="kicker mb-6">{STARTER.kicker}</p>
            <h1 className="max-w-[16ch] text-[length:var(--text-display)] leading-[0.98]">
              See your whole business{" "}
              <Highlight>{STARTER.highlight}</Highlight>
            </h1>
            <ol className="mt-10 grid gap-4 border-y border-line py-8 sm:grid-cols-3 sm:gap-8">
              {STARTER.process.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-mono text-sm text-chartreuse-deep">
                    0{i + 1}
                  </span>
                  <p className="text-sm text-ink-muted">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <StarterFunnel calendlyUrl={calendlyUrl()} />
          </div>
        </section>

        {templates.notion && (
          <section className="border-t border-line bg-paper-sink">
            <div className="mx-auto w-full max-w-[1180px] px-6 py-10 md:px-10 md:py-12">
              <div className="border border-line bg-paper px-6 py-5 md:px-8 md:py-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <div className="min-w-0 max-w-xl">
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                      {STARTER.download.heading}
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">
                      {STARTER.download.sub}
                    </p>
                  </div>
                  <a
                    href={templates.notion}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-[2px] border border-line bg-paper px-5 py-2.5 font-mono text-xs tracking-wide transition-colors hover:border-ink"
                  >
                    {STARTER.download.cta} →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
