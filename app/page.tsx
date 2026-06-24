import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Kicker } from "@/components/ui/Section";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/ui/LeadForm";
import {
  SITE,
  HERO,
  PROBLEM,
  LINES,
  GUIDE,
  PROOF,
  SUPPORT,
  PRICING,
  LEAD,
  FINAL_CTA,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* [01] HERO ------------------------------------------------ */}
        <section className="relative overflow-hidden">
          <div className="mx-auto flex min-h-[88vh] w-full max-w-[1180px] flex-col justify-center px-6 py-24 md:px-10">
            <p className="kicker mb-8">{HERO.kicker}</p>
            <h1 className="max-w-[14ch] text-[length:var(--text-display)] leading-[0.98]">
              {HERO.lead}{" "}
              <Highlight>{HERO.highlight}</Highlight>
            </h1>
            <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] text-ink-muted">
              {HERO.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href={HERO.ctaHref}>{HERO.cta}</Button>
              <Button href={HERO.secondaryHref} variant="ghost">
                {HERO.secondaryCta}
              </Button>
            </div>

            <div className="mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden border-y border-line sm:grid-cols-2">
              {LINES.items.map((line) => (
                <div key={line.id} className="bg-paper px-1 py-4 sm:px-0">
                  <p className="font-serif text-lg">{line.name}</p>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                    {line.legibleTo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [02] PROBLEM -------------------------------------------- */}
        <Section id="problem" sink>
          <Kicker>{PROBLEM.kicker}</Kicker>
          <Reveal as="h2" className="max-w-[18ch] text-[length:var(--text-h2)]">
            {PROBLEM.heading}
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {PROBLEM.pains.map((pain, i) => (
              <Reveal
                key={pain.head}
                delay={i * 90}
                className="bg-paper-sink p-8"
              >
                <span className="font-mono text-xs text-chartreuse-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)]">
                  {pain.head}
                </h3>
                <p className="mt-3 text-ink-muted">{pain.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* [03] THE PLAYBOOK (the three lines) -------------------- */}
        <Section id="lines">
          <Kicker>{LINES.kicker}</Kicker>
          <Reveal as="h2" className="max-w-[18ch] text-[length:var(--text-h2)]">
            {LINES.heading}
          </Reveal>
          <Reveal className="mt-6 font-serif text-[length:var(--text-h3)] leading-snug">
            {LINES.calloutPre} <Highlight>{LINES.calloutHighlight}</Highlight>
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-2xl text-lead text-ink-muted">
            {LINES.lead}
          </Reveal>
          {LINES.approach.map((para) => (
            <Reveal as="p" key={para} className="mt-4 max-w-2xl text-lead text-ink-muted">
              {para}
            </Reveal>
          ))}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {LINES.items.map((line, i) => (
              <Reveal key={line.id} delay={i * 90}>
                <Link
                  href={`/${line.id}`}
                  className="group flex h-full flex-col border border-line bg-paper p-8 transition-colors hover:border-ink"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                    {line.legibleTo}
                  </p>
                  <h3 className="mt-3 text-[length:var(--text-h3)]">
                    {line.name}
                  </h3>
                  <p className="mt-2 font-serif text-xl">{line.promise}</p>
                  <p className="mt-4 flex-1 text-ink-muted">{line.body}</p>
                  <p className="mt-6 font-mono text-lg">{line.span}</p>
                  <p className="mt-2 font-mono text-xs text-ink-muted">
                    {line.start}
                  </p>
                  <span className="mt-6 inline-block font-mono text-sm text-ink-muted underline decoration-marker decoration-2 underline-offset-[6px] group-hover:text-ink">
                    Explore {line.name} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* [04] THE GUIDE ----------------------------------------- */}
        <Section id="guide" sink>
          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center">
            <Reveal className="aspect-[4/5] border border-line bg-paper">
              {/* Real photo of Stacey goes here — editorial crop, honest light. */}
              <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-widest text-ink-muted">
                Photo: Stacey, building live
              </div>
            </Reveal>
            <div>
              <Kicker>{GUIDE.kicker}</Kicker>
              <Reveal
                as="h2"
                className="text-[length:var(--text-h2)] leading-tight"
              >
                {GUIDE.name}
              </Reveal>
              <Reveal as="p" className="mt-6 text-lead">
                {GUIDE.empathy}
              </Reveal>
              <Reveal as="p" className="mt-4 text-ink-muted">
                {GUIDE.authority}
              </Reveal>
              <Reveal as="p" className="mt-4 text-ink-muted">
                {GUIDE.proof}
              </Reveal>
            </div>
          </div>
        </Section>

        {/* [05] PROOF --------------------------------------------- */}
        <Section id="proof">
          <Kicker>{PROOF.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {PROOF.heading}
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
            {PROOF.logos.map((logo) => (
              <span
                key={logo}
                className="font-serif text-2xl text-ink-muted md:text-3xl"
              >
                {logo}
              </span>
            ))}
          </div>
          <p className="mt-10 font-mono text-sm text-ink-muted">{PROOF.note}</p>
        </Section>

        {/* [06] SUPPORT MODEL ------------------------------------- */}
        <Section id="support" sink>
          <Kicker>{SUPPORT.kicker}</Kicker>
          <Reveal as="h2" className="max-w-[20ch] text-[length:var(--text-h2)]">
            {SUPPORT.heading}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-2xl text-lead text-ink-muted">
            {SUPPORT.promise}
          </Reveal>

          <div className="mt-12 overflow-hidden border border-line">
            <div className="grid grid-cols-2 bg-ink font-mono text-xs uppercase tracking-widest text-paper">
              <div className="p-4">Agency retainer</div>
              <div className="p-4">Fronz</div>
            </div>
            {SUPPORT.rows.map((row, i) => (
              <div
                key={row.fronz}
                className={`grid grid-cols-2 ${i % 2 ? "bg-paper-sink" : "bg-paper"}`}
              >
                <div className="border-t border-line p-4 text-ink-muted line-through decoration-line">
                  {row.agency}
                </div>
                <div className="border-l border-t border-line p-4">
                  {row.fronz}
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {SUPPORT.extras.map((extra) => (
              <li
                key={extra}
                className="border-t-2 border-marker pt-3 text-sm text-ink-muted"
              >
                {extra}
              </li>
            ))}
          </ul>
        </Section>

        {/* [07] PRICING ------------------------------------------- */}
        <Section id="pricing">
          <Kicker>{PRICING.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {PRICING.heading}
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-2xl text-lead text-ink-muted">
            {PRICING.sub}
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PRICING.tiers.map((tier, i) => (
              <Reveal
                key={tier.line}
                delay={i * 90}
                className={`flex flex-col border p-8 ${
                  tier.featured
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper"
                }`}
              >
                <p
                  className={`font-mono text-xs uppercase tracking-widest ${
                    tier.featured ? "text-marker" : "text-chartreuse-deep"
                  }`}
                >
                  {tier.line}
                </p>
                <h3
                  className={`mt-3 text-[length:var(--text-h3)] ${tier.featured ? "text-paper" : ""}`}
                >
                  {tier.entry}
                </h3>
                <p className="mt-4 font-mono text-4xl">{tier.price}</p>
                <p
                  className={`mt-4 flex-1 text-sm ${tier.featured ? "text-paper/75" : "text-ink-muted"}`}
                >
                  {tier.detail}
                </p>
                <Link
                  href={SITE.bookingUrl}
                  className={`mt-6 inline-block font-mono text-sm underline decoration-2 underline-offset-[6px] ${
                    tier.featured
                      ? "decoration-marker hover:text-marker"
                      : "decoration-marker hover:text-chartreuse-deep"
                  }`}
                >
                  Start here →
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* [08] LEAD MAGNET --------------------------------------- */}
        <Section id="starter" sink>
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <Kicker>{LEAD.kicker}</Kicker>
              <Reveal as="h2" className="text-[length:var(--text-h2)]">
                {LEAD.heading}
              </Reveal>
              <Reveal as="p" className="mt-5 max-w-xl text-ink-muted">
                {LEAD.body}
              </Reveal>
            </div>
            <Reveal>
              <LeadForm />
            </Reveal>
          </div>
        </Section>

        {/* [09] FINAL CTA ----------------------------------------- */}
        <section id="book" className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <p className="kicker mb-6 text-paper/60">{FINAL_CTA.kicker}</p>
            <h2 className="max-w-[20ch] text-[length:var(--text-h2)] text-paper">
              {FINAL_CTA.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-paper/75">
              {FINAL_CTA.sub}
            </p>
            <Link
              href={FINAL_CTA.href}
              className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-marker px-7 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse"
            >
              {FINAL_CTA.cta} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
