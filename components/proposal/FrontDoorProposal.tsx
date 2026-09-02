import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Kicker } from "@/components/ui/Section";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/content";
import {
  JUPITERBLOCK_PROPOSAL as P,
  jupiterblockInvoiceUrl,
} from "@/lib/deliverables/jupiterblock-intensive";
import { PrintPdfLink } from "@/components/proposal/PrintPdfLink";

export function FrontDoorProposal() {
  return (
    <>
      <Header />
      <main>
        {/* HERO ----------------------------------------------------- */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <nav className="mb-10 font-mono text-xs uppercase tracking-widest text-ink-muted print:hidden">
              <Link href="/" className="hover:text-ink">
                Fronz
              </Link>
              <span className="mx-2">/</span>
              <Link href="/gtm-clarity" className="hover:text-ink">
                GTM Clarity
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">Your proposal</span>
            </nav>
            <p className="kicker mb-6">{P.hero.eyebrow}</p>
            <h1 className="max-w-[18ch] text-[length:var(--text-display)] leading-[0.98]">
              {P.hero.headlinePre}{" "}
              <Highlight>{P.hero.headlineHighlight}</Highlight>
            </h1>
            <p className="mt-8 max-w-[58ch] text-[length:var(--text-lead)] text-ink-muted">
              {P.hero.subhead}
            </p>

            <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                  Client
                </dt>
                <dd className="mt-1 font-serif text-lg">{P.meta.client}</dd>
                <dd className="text-sm text-ink-muted">{P.meta.company}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                  Format
                </dt>
                <dd className="mt-1 font-serif text-lg">{P.meta.format}</dd>
                <dd className="text-sm text-ink-muted">{P.meta.formatDetail}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                  Investment
                </dt>
                <dd className="mt-1 font-mono text-2xl">{P.meta.investment}</dd>
                <dd className="text-sm text-ink-muted">
                  {P.meta.investmentDetail}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* WHY ------------------------------------------------------ */}
        <Section sink>
          <Kicker>{P.why.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {P.why.heading}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
            {P.why.intro}
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {P.why.points.map((point, i) => (
              <Reveal
                key={point.n}
                delay={i * 90}
                className="bg-paper p-8"
              >
                <span className="font-mono text-xs text-chartreuse-deep">
                  {point.n}
                </span>
                <h3 className="mt-4 text-[length:var(--text-h3)]">
                  {point.head}
                </h3>
                <p className="mt-3 text-ink-muted">{point.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* THE WORK ------------------------------------------------- */}
        <Section>
          <Kicker>{P.work.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {P.work.heading}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
            {P.work.intro}
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {P.work.items.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 90}
                className="flex flex-col border border-line bg-paper p-8"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                  {item.n}
                </p>
                <h3 className="mt-3 text-[length:var(--text-h3)]">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm text-ink-muted">{item.body}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {item.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm text-ink">
                      <span
                        className="font-mono text-chartreuse-deep"
                        aria-hidden="true"
                      >
                        +
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* THREE DAYS ----------------------------------------------- */}
        <Section sink>
          <Kicker>{P.days.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {P.days.heading}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
            {P.days.intro}
          </Reveal>
          <ol className="mt-14 space-y-8">
            {P.days.items.map((day, i) => (
              <Reveal
                key={day.n}
                delay={i * 60}
                as="li"
                className="relative grid gap-6 border-t border-line pt-6 md:grid-cols-[10rem_1fr]"
              >
                <div>
                  <span className="font-mono text-4xl font-bold text-ink-muted">
                    {day.n}
                  </span>
                  <p className="mt-3 font-mono text-xs text-ink-muted">
                    Day {i + 1}
                  </p>
                </div>
                <div>
                  <h3 className="text-[length:var(--text-h3)]">{day.name}</h3>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-chartreuse-deep">
                        Together
                      </p>
                      <p className="mt-2 text-sm text-ink-muted">
                        {day.together}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-chartreuse-deep">
                        Between sessions
                      </p>
                      <p className="mt-2 text-sm text-ink-muted">
                        {day.between}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* PREP HOMEWORK -------------------------------------------- */}
        <Section>
          <Kicker>{P.youBring.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {P.youBring.heading}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
            {P.youBring.intro}
          </Reveal>
          <ol className="mt-14 space-y-10">
            {P.youBring.items.map((item, i) => (
              <Reveal
                key={item.n}
                delay={i * 60}
                as="li"
                className="border-t border-line pt-6"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-chartreuse-deep">
                    {item.n}
                  </span>
                  <h3 className="text-[length:var(--text-h3)]">{item.name}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {item.checks.map((check) => (
                    <li key={check} className="flex gap-3 text-ink">
                      <span
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-[2px] border border-ink"
                        aria-hidden="true"
                      />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
                {"note" in item && item.note ? (
                  <p className="mt-4 max-w-[62ch] pl-7 text-sm text-ink-muted">
                    {item.note}
                  </p>
                ) : null}
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* OUT OF SCOPE --------------------------------------------- */}
        <Section sink>
          <Kicker>{P.notThis.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {P.notThis.heading}
          </Reveal>
          <Reveal className="mt-6 font-serif text-[length:var(--text-h3)] leading-snug">
            {P.notThis.subhead}
          </Reveal>
          <ul className="mt-12 space-y-3">
            {P.notThis.items.map((item) => (
              <li key={item} className="flex gap-3 text-ink-muted">
                <span className="text-chartreuse-deep" aria-hidden="true">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Reveal as="p" className="mt-10 max-w-[62ch] text-lead text-ink-muted">
            {P.notThis.close}
          </Reveal>
        </Section>

        {/* HOW WE START — gate -------------------------------------- */}
        <Section>
          <Kicker>{P.start.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {P.start.heading}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
            {P.start.intro}
          </Reveal>
          <ol className="mt-14 space-y-8">
            {P.start.steps.map((step, i) => (
              <Reveal
                key={step.n}
                delay={i * 60}
                as="li"
                className={`relative grid gap-6 border-t-2 pt-6 md:grid-cols-[10rem_1fr] ${
                  step.gate ? "border-ink" : "border-line"
                }`}
              >
                <div>
                  <span
                    className={`font-mono text-4xl font-bold ${
                      step.gate ? "text-marker" : "text-ink-muted"
                    }`}
                  >
                    {step.n}
                  </span>
                  {step.gate && (
                    <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink">
                      Gate · blocks all below
                    </p>
                  )}
                  <p className="mt-3 font-mono text-xs text-ink-muted">
                    {step.timing}
                  </p>
                </div>
                <div>
                  <h3 className="text-[length:var(--text-h3)]">{step.name}</h3>
                  <p className="mt-3 text-ink-muted">
                    {"lead" in step && step.lead && "pdfLabel" in step && step.pdfLabel ? (
                      <>
                        {step.lead}{" "}
                        <PrintPdfLink>{step.pdfLabel}</PrintPdfLink>{" "}
                        {step.body}
                      </>
                    ) : (
                      step.body
                    )}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* CTA — closes the proposal -------------------------------- */}
        <section className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <p className="kicker mb-6 text-paper/60">{P.cta.kicker}</p>
            <h2 className="text-[length:var(--text-h2)] text-paper">
              {P.cta.heading}
            </h2>
            <p className="mt-4 font-mono text-4xl text-marker">{P.cta.price}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-paper/50">
              {P.cta.priceNote}
            </p>
            <p className="mt-6 max-w-[62ch] text-lead text-paper/75">
              {P.cta.sub}
            </p>
            <a
              href={jupiterblockInvoiceUrl()}
              className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-marker px-7 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse print:hidden"
            >
              {P.cta.button} →
            </a>
            <p className="mt-10 hidden font-mono text-xs break-all text-paper/60 print:block">
              Pay at {jupiterblockInvoiceUrl()}
            </p>
            <p className="mt-6 font-mono text-xs text-paper/50">
              Questions first?{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="underline decoration-marker underline-offset-2 hover:text-paper"
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </section>

        {/* PEEK — afterword, not part of the offer ------------------ */}
        <section className="border-t border-dashed border-line print:hidden">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-14 md:px-10 md:py-16">
            <Reveal className="mx-auto max-w-[72ch] border border-dashed border-line bg-paper-sink/70 px-6 py-8 md:px-10 md:py-10">
              <p className="kicker mb-4 text-ink-muted/70">{P.sprint.kicker}</p>
              <h2 className="font-serif text-[length:var(--text-h3)] text-ink-muted">
                {P.sprint.heading}
              </h2>
              <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-ink-muted">
                {P.sprint.intro}
              </p>
              <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                {P.sprint.items.map((item) => (
                  <li key={item.n}>
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-chartreuse-deep/80">
                      {item.n}
                    </p>
                    <h3 className="mt-2 font-serif text-lg text-ink-muted">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted/80">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-[58ch] text-sm italic text-ink-muted/70">
                {P.sprint.close}
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
