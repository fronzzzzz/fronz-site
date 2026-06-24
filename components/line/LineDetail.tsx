import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Kicker } from "@/components/ui/Section";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/ui/Faq";
import { PortfolioArc } from "@/components/line/PortfolioArc";
import { SITE } from "@/lib/content";
import type { LineDetail as LineDetailData } from "@/lib/lines";

export function LineDetail({ line }: { line: LineDetailData }) {
  // Alternate section backgrounds in render order so no two adjacent
  // sections ever share a bg (which would read as a doubled empty gap).
  // Hero is paper, so the first content section (problem) starts sunk.
  const order: string[] = [
    "problem",
    ...(line.domains ? ["domains"] : []),
    ...(line.differentiator ? ["differentiator"] : []),
    "method",
    "pricing",
    ...(line.whoFor ? ["whoFor"] : []),
    "whereFits",
    "faq",
  ];
  const sink: Record<string, boolean> = {};
  order.forEach((key, i) => (sink[key] = i % 2 === 0));

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <nav className="mb-10 font-mono text-xs uppercase tracking-widest text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Fronz
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">{line.name}</span>
            </nav>
            <p className="kicker mb-6">{line.eyebrow}</p>
            <h1 className="max-w-[16ch] text-[length:var(--text-display)] leading-[0.98]">
              {line.name}.{" "}
              <Highlight>{line.promise}</Highlight>
            </h1>
            <p className="mt-8 text-[length:var(--text-lead)] text-ink-muted">
              {line.heroSub}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-[2px] bg-ink px-6 py-3.5 font-mono text-sm tracking-wide text-paper transition-colors hover:bg-chartreuse-deep"
              >
                See pricing →
              </a>
              <Link
                href={SITE.bookingUrl}
                className="font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] transition-colors hover:decoration-chartreuse-deep"
              >
                {line.cta.button}
              </Link>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <Section sink={sink.problem}>
          <Kicker>The problem</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {line.problem.heading}
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {line.problem.points.map((p, i) => (
              <Reveal key={p.head} delay={i * 90} className="bg-paper-sink p-8">
                <span className="font-mono text-xs text-chartreuse-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)]">{p.head}</h3>
                <p className="mt-3 text-ink-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
          {line.problem.punch && (
            <Reveal
              as="p"
              className="mt-10 font-serif text-[length:var(--text-h3)] leading-snug"
            >
              {line.problem.punch}
            </Reveal>
          )}
          {line.problem.sources && (
            <Reveal
              as="p"
              className="mt-8 font-mono text-xs text-ink-muted"
            >
              Sources:{" "}
              {line.problem.sources.map((s, i) => (
                <span key={s.href}>
                  {i > 0 && " · "}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line underline-offset-2 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </span>
              ))}
            </Reveal>
          )}
        </Section>

        {/* DOMAINS (applied uses) */}
        {line.domains && (
          <Section sink={sink.domains}>
            <Kicker>{line.domains.eyebrow ?? "Applied uses"}</Kicker>
            <Reveal as="h2" className="text-[length:var(--text-h2)]">
              {line.domains.heading}
            </Reveal>
            {line.domains.sub && (
              <Reveal as="p" className="mt-5 text-lead text-ink-muted">
                {line.domains.sub}
              </Reveal>
            )}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {line.domains.items.map((d, i) => (
                <Reveal
                  key={d.name}
                  delay={i * 70}
                  className="flex flex-col border border-line bg-paper-sink p-7"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                    {d.name}
                  </p>
                  <h3 className="mt-3 font-serif text-[length:var(--text-h3)] leading-snug">
                    {d.outcome}
                  </h3>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                        Problem
                      </dt>
                      <dd className="mt-0.5 text-ink-muted">{d.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                        What we build
                      </dt>
                      <dd className="mt-0.5">{d.build}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                        The decision it unlocks
                      </dt>
                      <dd className="mt-0.5">{d.decision}</dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
            </div>
            {line.domains.note && (
              <Reveal as="p" className="mt-8 font-mono text-sm text-ink-muted">
                {line.domains.note}
              </Reveal>
            )}
          </Section>
        )}

        {/* DIFFERENTIATOR */}
        {line.differentiator && (
          <Section sink={sink.differentiator}>
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
              <Kicker>The difference</Kicker>
              <div>
                <Reveal
                  as="h2"
                  className="text-[length:var(--text-h2)] leading-tight"
                >
                  {line.differentiator.heading}
                </Reveal>
                <Reveal as="p" className="mt-6 text-lead text-ink-muted">
                  {line.differentiator.body}
                </Reveal>
              </div>
            </div>
          </Section>
        )}

        {/* METHOD */}
        <Section sink={sink.method}>
          <Kicker>How it works</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {line.method.heading}
          </Reveal>
          {line.method.sub && (
            <Reveal as="p" className="mt-5 text-lead text-ink-muted">
              {line.method.sub}
            </Reveal>
          )}

          {line.compactMethod ? (
            <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {line.method.steps.map((step) => (
                <div
                  key={step.n}
                  className="flex gap-3 border-t border-line pt-3"
                >
                  <span className="font-mono text-sm text-chartreuse-deep">
                    {step.n}
                  </span>
                  <div>
                    <p className="font-mono text-sm font-bold uppercase tracking-wide">
                      {step.name}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {line.method.steps.map((step, i) => (
                <Reveal
                  key={step.n}
                  delay={i * 70}
                  className="border-t-2 border-ink pt-5"
                >
                  <span className="font-mono text-4xl font-bold text-marker">
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-[length:var(--text-h3)]">
                    {step.name}
                  </h3>
                  <p className="mt-3 text-ink-muted">{step.body}</p>
                </Reveal>
              ))}
            </div>
          )}
        </Section>

        {/* PRICING / TIERS */}
        <Section id="pricing" sink={sink.pricing}>
          <Kicker>Pricing</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {line.tiers.heading}
          </Reveal>
          {line.tiers.sub && (
            <Reveal as="p" className="mt-5 text-lead text-ink-muted">
              {line.tiers.sub}
            </Reveal>
          )}

          {line.entryPoints && (
            <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
              {line.entryPoints.map((ep) => (
                <div
                  key={ep.who}
                  className="border-l-2 border-marker bg-paper px-5 py-4"
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                    {ep.who}
                  </p>
                  <p className="mt-1 text-ink-muted">{ep.start}</p>
                </div>
              ))}
            </Reveal>
          )}

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {line.tiers.items.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 90}
                className={`flex flex-col border p-8 ${
                  tier.featured
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper"
                }`}
              >
                {tier.meta && (
                  <p
                    className={`font-mono text-xs uppercase tracking-widest ${
                      tier.featured ? "text-marker" : "text-chartreuse-deep"
                    }`}
                  >
                    {tier.meta}
                  </p>
                )}
                <h3
                  className={`mt-3 text-[length:var(--text-h3)] ${tier.featured ? "text-paper" : ""}`}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 font-mono text-4xl">{tier.price}</p>
                {tier.tagline && (
                  <p
                    className={`mt-4 font-serif text-lg ${tier.featured ? "text-paper/85" : "text-ink"}`}
                  >
                    {tier.tagline}
                  </p>
                )}
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.points.map((pt) => (
                    <li
                      key={pt}
                      className={`flex gap-3 text-sm ${tier.featured ? "text-paper/80" : "text-ink-muted"}`}
                    >
                      <span
                        className={
                          tier.featured ? "text-marker" : "text-chartreuse-deep"
                        }
                        aria-hidden="true"
                      >
                        —
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={SITE.bookingUrl}
                  className={`mt-8 inline-block font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] ${
                    tier.featured ? "hover:text-marker" : "hover:text-chartreuse-deep"
                  }`}
                >
                  Start here →
                </Link>
              </Reveal>
            ))}
          </div>

          {line.support && (
            <Reveal className="mt-12 border-t border-line pt-8">
              <p className="kicker mb-4">{line.support.heading}</p>
              <ul className="grid gap-3 md:grid-cols-3">
                {line.support.points.map((pt) => (
                  <li
                    key={pt}
                    className="border-t-2 border-marker pt-3 text-sm text-ink-muted"
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </Section>

        {/* WHO IT'S FOR */}
        {line.whoFor && (
          <Section sink={sink.whoFor}>
            <Kicker>Who it's for</Kicker>
            <div className="mt-6 grid gap-10 md:grid-cols-2">
              <Reveal>
                <h3 className="text-[length:var(--text-h3)]">
                  This is for you if…
                </h3>
                <ul className="mt-5 space-y-3">
                  {line.whoFor.fit.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-chartreuse-deep" aria-hidden="true">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={90}>
                <h3 className="text-[length:var(--text-h3)]">
                  This isn't for you if…
                </h3>
                <ul className="mt-5 space-y-3">
                  {line.whoFor.notFit.map((f) => (
                    <li key={f} className="flex gap-3 text-ink-muted">
                      <span aria-hidden="true">✕</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Section>
        )}

        {/* WHERE IT FITS (intersections) */}
        <Section sink={sink.whereFits}>
          <Kicker>Where it fits</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            One arc: clarify, get found, get command.
          </Reveal>
          <Reveal as="p" className="mt-5 text-lead text-ink-muted">
            Each line stands alone, and each makes the next one work harder.
            Start where you're stuck; grow into the rest.
          </Reveal>
          <Reveal className="mt-12">
            <PortfolioArc current={line.slug} />
          </Reveal>
        </Section>

        {/* FAQ */}
        <Section sink={sink.faq}>
          <Kicker>Questions</Kicker>
          <Reveal as="h2" className="mb-10 text-[length:var(--text-h2)]">
            Good questions.
          </Reveal>
          <Reveal>
            <Faq items={line.faq} />
          </Reveal>
        </Section>

        {/* CTA */}
        <section id="book" className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <p className="kicker mb-6 text-paper/60">One next step</p>
            <h2 className="text-[length:var(--text-h2)] text-paper">
              {line.cta.heading}
            </h2>
            <p className="mt-6 text-lead text-paper/75">
              {line.cta.sub}
            </p>
            <Link
              href={SITE.bookingUrl}
              className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-marker px-7 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse"
            >
              {line.cta.button} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
