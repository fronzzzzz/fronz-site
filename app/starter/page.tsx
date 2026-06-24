import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { StarterMapForm } from "@/components/ui/StarterMapForm";
import { SITE, STARTER, starterTemplates } from "@/lib/content";

export const metadata: Metadata = {
  title: "GTM Clarity Starter — see your whole business on one page",
  description: STARTER.sub,
  alternates: { canonical: "/starter" },
};

function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "GTM Clarity Starter",
    description: STARTER.sub,
    step: STARTER.parts.map((p) => ({
      "@type": "HowToStep",
      position: Number(p.n),
      name: p.title,
      text: p.body,
    })),
  };
}

export default function StarterPage() {
  const templates = starterTemplates();
  const hasTemplates = Boolean(templates.notion || templates.gdoc);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema()) }}
      />
      <Header />
      <main>
        {/* Intro ------------------------------------------------- */}
        <section className="border-b border-line">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
            <nav className="mb-8 font-mono text-xs uppercase tracking-widest text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Fronz
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">GTM Clarity Starter</span>
            </nav>
            <p className="kicker mb-6">{STARTER.kicker}</p>
            <h1 className="max-w-[16ch] text-[length:var(--text-display)] leading-[0.98]">
              See your whole business{" "}
              <Highlight>{STARTER.highlight}</Highlight>
            </h1>
            <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] text-ink-muted">
              {STARTER.sub}
            </p>
            <p className="mt-6 max-w-2xl font-serif text-xl">
              {STARTER.instruction}
            </p>
          </div>
        </section>

        {/* The exercise ------------------------------------------ */}
        <Section>
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {STARTER.parts.map((part, i) => (
              <Reveal key={part.n} delay={i * 90} className="bg-paper p-8">
                <span className="font-mono text-xs text-chartreuse-deep">
                  {part.n}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)]">
                  {part.title}
                </h3>
                <p className="mt-3 text-ink-muted">{part.body}</p>
                <ul className="mt-5 space-y-2">
                  {part.prompts.map((prompt) => (
                    <li
                      key={prompt}
                      className="border-l-2 border-line pl-3 font-mono text-sm text-ink-muted"
                    >
                      {prompt}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Templates --------------------------------------------- */}
        {hasTemplates && (
          <Section sink>
            <Reveal as="h2" className="text-[length:var(--text-h3)]">
              {STARTER.templatesHeading}
            </Reveal>
            <p className="mt-3 max-w-2xl text-ink-muted">
              {STARTER.templatesNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {templates.notion && (
                <a
                  href={templates.notion}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[2px] border border-line bg-paper px-6 py-3.5 font-mono text-sm tracking-wide transition-colors hover:border-ink"
                >
                  Copy the Notion template →
                </a>
              )}
              {templates.gdoc && (
                <a
                  href={templates.gdoc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[2px] border border-line bg-paper px-6 py-3.5 font-mono text-sm tracking-wide transition-colors hover:border-ink"
                >
                  Copy the Google Doc template →
                </a>
              )}
            </div>
          </Section>
        )}

        {/* The wall ---------------------------------------------- */}
        <Section sink>
          <Reveal as="h2" className="max-w-[22ch] text-[length:var(--text-h2)]">
            {STARTER.wall.heading}
          </Reveal>
          <p className="mt-6 max-w-2xl text-ink-muted">{STARTER.wall.body}</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {STARTER.wall.quotes.map((quote) => (
              <li
                key={quote}
                className="border-t-2 border-marker pt-3 font-serif text-lg"
              >
                {quote}
              </li>
            ))}
          </ul>

          <Reveal className="mt-14 border-t border-line pt-10">
            <p className="font-serif text-[length:var(--text-h2)] leading-tight">
              <Highlight>{STARTER.wall.punchHead}</Highlight>
            </p>
            <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
              <p className="text-lead text-ink-muted">
                {STARTER.wall.punchLine}
              </p>
              <p className="text-lead">
                <span className="font-semibold text-ink">
                  {STARTER.wall.sellHighlight}
                </span>{" "}
                {STARTER.wall.sell}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* Send your map + CTA ----------------------------------- */}
        <Section>
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
            <div>
              <h2 className="text-[length:var(--text-h2)]">
                {STARTER.ctaHeading}
              </h2>
              <p className="mt-6 max-w-xl text-lead text-ink-muted">
                {STARTER.ctaBody}
              </p>
              <Link
                href={SITE.bookingUrl}
                className="mt-8 inline-flex items-center gap-2 rounded-[2px] bg-ink px-7 py-4 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep"
              >
                {STARTER.cta} →
              </Link>
              <p className="mt-8 font-mono text-xs text-ink-muted">
                {STARTER.footnote}
              </p>
            </div>
            <Reveal>
              <StarterMapForm />
            </Reveal>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
