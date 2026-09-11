import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Highlight } from "@/components/ui/Highlight";
import { StarterFunnel } from "@/components/starter/StarterFunnel";
import { STARTER, calendlyUrl, starterTemplates } from "@/lib/content";

export const metadata: Metadata = {
  title: "GTM Clarity Starter: see your whole business on one page",
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
              <span className="text-ink">GTM Clarity Starter</span>
            </nav>
            <p className="kicker mb-6">{STARTER.kicker}</p>
            <h1 className="max-w-[16ch] text-[length:var(--text-display)] leading-[0.98]">
              See your whole business{" "}
              <Highlight>{STARTER.highlight}</Highlight>
            </h1>
            <p className="mt-6 max-w-2xl text-[length:var(--text-lead)] text-ink-muted">
              {STARTER.sub}
            </p>
            <p className="mt-4 max-w-2xl font-serif text-xl">
              {STARTER.instruction}
            </p>

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

        <section className="bg-paper-sink">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-14 md:px-10 md:py-20">
            <StarterFunnel
              notionUrl={templates.notion}
              gdocUrl={templates.gdoc}
              calendlyUrl={calendlyUrl()}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
