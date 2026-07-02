import Link from "next/link";
import { Fragment } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Kicker } from "@/components/ui/Section";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterTable } from "@/components/case-study/BeforeAfterTable";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Renders {tokens} in headlines as <Highlight> swipes.
 * Use sparingly in copy — the marker is the reserved emphasis device.
 */
function withHighlights(text: string) {
  const parts = text.split(/(\{[^}]+\})/g);
  return parts.map((part, i) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return <Highlight key={i}>{part.slice(1, -1)}</Highlight>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * Render variants:
 *   - "case-study": public portfolio page, third-person, sells the Fronz ladder.
 *   - "deliverable": private client leave-behind, addresses "you", frames the
 *     ladder as "your recommended next step" from where the client sits today.
 * Non-visual differences (voice, framing) come from the data (lib/case-studies.ts
 * vs lib/deliverables.ts). Only breadcrumb + Where-It-Fits section branch here.
 */
export function CaseStudyDetail({
  study,
  variant = "case-study",
}: {
  study: CaseStudy;
  variant?: "case-study" | "deliverable";
}) {
  const isDeliverable = variant === "deliverable";
  // Alternate section backgrounds so no two adjacent sections share a bg.
  // Hero renders on paper; first content section (before/after) sits sunk.
  const order: string[] = [
    "beforeAfter",
    "fork",
    "recommendation", // dark ink break — doesn't participate in sink alternation
    ...(study.keystoneProduct ? ["keystone"] : []),
    ...(study.icp ? ["icp"] : []),
    ...(study.pitchOptions ? ["pitch"] : []),
    ...(study.mapFindings ? ["map"] : []),
    ...(study.nextSteps ? ["steps"] : []),
    "whereFits",
  ];
  const sink: Record<string, boolean> = {};
  order
    .filter((k) => k !== "recommendation")
    .forEach((key, i) => (sink[key] = i % 2 === 0));

  return (
    <>
      <Header />
      <main>
        {/* HERO ----------------------------------------------------- */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <nav className="mb-10 font-mono text-xs uppercase tracking-widest text-ink-muted">
              <Link href="/" className="hover:text-ink">
                Fronz
              </Link>
              <span className="mx-2">/</span>
              <Link href="/gtm-clarity" className="hover:text-ink">
                GTM Clarity
              </Link>
              <span className="mx-2">/</span>
              <span className="text-ink">
                {isDeliverable ? "Your recap" : "Case study"}
              </span>
            </nav>
            <p className="kicker mb-6">{study.hero.eyebrow}</p>
            <h1 className="max-w-[22ch] text-[length:var(--text-display)] leading-[0.98]">
              {withHighlights(study.hero.headline)}
            </h1>
            <p className="mt-8 max-w-[52ch] text-[length:var(--text-lead)] text-ink-muted">
              {study.hero.subhead}
            </p>

            {/* Metadata strip */}
            <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                  Client
                </dt>
                <dd className="mt-1 font-serif text-lg">{study.client.name}</dd>
                <dd className="text-sm text-ink-muted">{study.client.company}</dd>
                {study.client.note && (
                  <dd className="mt-1 text-xs text-ink-muted">
                    {study.client.note}
                  </dd>
                )}
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                  Format
                </dt>
                <dd className="mt-1 font-serif text-lg">{study.session.format}</dd>
                <dd className="text-sm text-ink-muted">{study.session.detail}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                  Date
                </dt>
                <dd className="mt-1 font-serif text-lg">{study.session.date}</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* BEFORE / AFTER ------------------------------------------- */}
        <Section sink={sink.beforeAfter}>
          <Kicker>{study.beforeAfter.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {study.beforeAfter.heading}
          </Reveal>
          {study.beforeAfter.intro && (
            <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
              {study.beforeAfter.intro}
            </Reveal>
          )}
          <Reveal className="mt-12">
            <BeforeAfterTable
              columns={study.beforeAfter.columns}
              rows={study.beforeAfter.rows}
            />
          </Reveal>
          {study.beforeAfter.notCaptured && (
            <div className="mt-14">
              <p className="kicker mb-6">What the table doesn't capture</p>
              <div className="grid gap-6 md:grid-cols-2">
                {study.beforeAfter.notCaptured.map((n, i) => (
                  <Reveal
                    key={n.head}
                    delay={i * 90}
                    className="border-l-2 border-marker bg-paper px-5 py-5"
                  >
                    <p className="font-serif text-lg leading-snug">{n.head}</p>
                    <p className="mt-2 text-sm text-ink-muted">{n.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* FORK — question + two options ---------------------------- */}
        <Section sink={sink.fork}>
          <Kicker>{study.fork.kicker}</Kicker>
          <Reveal
            as="p"
            className="max-w-[62ch] text-lead text-ink-muted"
          >
            {study.fork.heading}
          </Reveal>
          <Reveal className="mt-8 border border-ink bg-paper p-8 md:p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
              The question
            </p>
            <p className="mt-4 max-w-[28ch] font-serif text-[length:var(--text-h2)] leading-tight">
              {withHighlights(study.fork.question)}
            </p>
          </Reveal>
          <Reveal as="p" className="mt-8 max-w-[62ch] text-lead text-ink-muted">
            {study.fork.body}
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {study.fork.options.map((opt, i) => (
              <Reveal
                key={opt.label}
                delay={i * 90}
                className="flex flex-col border border-line bg-paper p-8"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                  {opt.label}
                </p>
                <h3 className="mt-2 text-[length:var(--text-h3)]">{opt.name}</h3>
                <p className="mt-1 font-mono text-xs italic text-ink-muted">
                  {opt.tagline}
                </p>
                <p className="mt-5 font-serif text-lg leading-snug">
                  {opt.promise}
                </p>

                <dl className="mt-6 space-y-4 border-t border-line pt-6">
                  {opt.attributes.map((a) => (
                    <div key={a.label}>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                        {a.label}
                      </dt>
                      <dd className="mt-1 text-sm">{a.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                      Strongest at
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {opt.strengths.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span
                            className="text-chartreuse-deep"
                            aria-hidden="true"
                          >
                            +
                          </span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                      Weakest at
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                      {opt.weaknesses.map((w) => (
                        <li key={w} className="flex gap-2">
                          <span aria-hidden="true">–</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Trap */}
          <div className="mt-16">
            <Reveal as="h3" className="text-[length:var(--text-h3)]">
              {study.fork.trap.heading}
            </Reveal>
            <Reveal as="p" className="mt-4 max-w-[62ch] text-ink-muted">
              {study.fork.trap.intro}
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
              {study.fork.trap.failures.map((f, i) => (
                <Reveal
                  key={f.head}
                  delay={i * 70}
                  className="bg-paper p-7"
                >
                  <span className="font-mono text-xs text-chartreuse-deep">
                    0{i + 1}
                  </span>
                  <h4 className="mt-3 font-serif text-lg leading-snug">
                    {f.head}
                  </h4>
                  <p className="mt-2 text-sm text-ink-muted">{f.body}</p>
                </Reveal>
              ))}
            </div>
            <Reveal
              as="p"
              className="mt-10 font-serif text-[length:var(--text-h3)] leading-snug"
            >
              {study.fork.trap.close}
            </Reveal>
          </div>
        </Section>

        {/* RECOMMENDATION — the dark break --------------------------- */}
        <section className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
            <p className="kicker mb-6 text-marker">
              {study.fork.recommendation.option}
            </p>
            <Reveal
              as="h2"
              className="max-w-[28ch] text-[length:var(--text-h2)] leading-tight text-paper"
            >
              {withHighlights(study.fork.recommendation.headline)}
            </Reveal>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {study.fork.recommendation.reasons.map((r, i) => (
                <Reveal
                  key={r.head}
                  delay={i * 90}
                  className="border-t-2 border-marker pt-5"
                >
                  <span className="font-mono text-3xl font-bold text-marker">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-paper">
                    {r.head}
                  </h3>
                  <p className="mt-3 text-sm text-paper/75">{r.body}</p>
                </Reveal>
              ))}
            </div>
            {study.fork.recommendation.close && (
              <Reveal
                as="p"
                className="mt-14 max-w-[62ch] font-serif text-lg leading-snug text-paper/85"
              >
                {study.fork.recommendation.close}
              </Reveal>
            )}
          </div>
        </section>

        {/* KEYSTONE PRODUCT ----------------------------------------- */}
        {study.keystoneProduct && (
          <Section sink={sink.keystone}>
            <Kicker>{study.keystoneProduct.kicker}</Kicker>
            <Reveal as="h2" className="text-[length:var(--text-h2)]">
              {study.keystoneProduct.heading}
            </Reveal>
            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              {/* Product details */}
              <Reveal className="border border-line bg-paper p-7">
                <dl className="space-y-5">
                  {study.keystoneProduct.details.map((d) => (
                    <div key={d.label}>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                        {d.label}
                      </dt>
                      <dd className="mt-1">{d.value}</dd>
                    </div>
                  ))}
                </dl>
                {study.keystoneProduct.subProductsOut && (
                  <div className="mt-8 border-t border-line pt-6">
                    <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                      Deliberately parked (roadmap, not the pitch)
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {study.keystoneProduct.subProductsOut.map((sp) => (
                        <li
                          key={sp}
                          className="border border-line px-2.5 py-1 font-mono text-xs text-ink-muted line-through decoration-line"
                        >
                          {sp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>

              {/* Market comparison table */}
              <Reveal delay={90}>
                <h3 className="text-[length:var(--text-h3)]">
                  {study.keystoneProduct.market.heading}
                </h3>
                {study.keystoneProduct.market.intro && (
                  <p className="mt-4 text-ink-muted">
                    {study.keystoneProduct.market.intro}
                  </p>
                )}
                <div className="mt-8 overflow-hidden border border-line">
                  <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr_1.4fr] bg-ink font-mono text-[0.7rem] uppercase tracking-widest text-paper">
                    <div className="p-3">Comparable</div>
                    <div className="p-3">Length</div>
                    <div className="p-3">Price</div>
                    <div className="p-3">Positioning</div>
                  </div>
                  {study.keystoneProduct.market.rows.map((row, i) => (
                    <div
                      key={row.name}
                      className={`grid grid-cols-[1.4fr_0.6fr_0.6fr_1.4fr] text-sm ${
                        i % 2 ? "bg-paper-sink" : "bg-paper"
                      }`}
                    >
                      <div className="border-t border-line p-3 font-serif">
                        {isDeliverable && row.url ? (
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-line decoration-1 underline-offset-[3px] hover:decoration-chartreuse-deep hover:text-chartreuse-deep"
                          >
                            {row.name}
                          </a>
                        ) : (
                          row.name
                        )}
                      </div>
                      <div className="border-t border-line p-3 font-mono text-xs text-ink-muted">
                        {row.length}
                      </div>
                      <div className="border-t border-line p-3 font-mono">
                        {row.price}
                      </div>
                      <div className="border-t border-line p-3 text-ink-muted">
                        {row.positioning}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 font-serif text-lg leading-snug">
                  {study.keystoneProduct.market.readOnPrice}
                </p>
              </Reveal>
            </div>
          </Section>
        )}

        {/* ICP ------------------------------------------------------ */}
        {study.icp && (
          <Section sink={sink.icp}>
            <Kicker>{study.icp.kicker}</Kicker>
            <Reveal as="h2" className="text-[length:var(--text-h2)]">
              {study.icp.heading}
            </Reveal>
            <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
              {study.icp.intro}
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {study.icp.personas.map((p, i) => (
                <Reveal
                  key={p.name}
                  delay={i * 90}
                  className={`flex flex-col border p-7 ${
                    p.recommended
                      ? "border-l-2 border-marker bg-paper"
                      : "border-line bg-paper"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[length:var(--text-h3)]">{p.name}</h3>
                      {p.pairedWith && (
                        <p className="mt-1 font-mono text-xs italic text-ink-muted">
                          {p.pairedWith}
                        </p>
                      )}
                    </div>
                    {p.recommended && (
                      <span className="whitespace-nowrap bg-marker px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink">
                        Recommended
                      </span>
                    )}
                  </div>
                  <dl className="mt-6 space-y-4 border-t border-line pt-5">
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                        Situation
                      </dt>
                      <dd className="mt-1 text-sm">{p.situation}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                        Explicit pain
                      </dt>
                      <dd className="mt-1 font-serif text-base italic">
                        {p.pain}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                        Where they are
                      </dt>
                      <dd className="mt-1 text-sm">{p.where}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
                        Why they buy
                      </dt>
                      <dd className="mt-1 text-sm">{p.why}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-chartreuse-deep">
                        Best proof
                      </dt>
                      <dd className="mt-1 text-sm">{p.proof}</dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
            </div>
            <Reveal
              as="p"
              className="mt-10 max-w-[70ch] font-serif text-lg leading-snug"
            >
              {study.icp.recommendation}
            </Reveal>
            {study.icp.realityCheck && (
              <Reveal
                as="p"
                className="mt-6 max-w-[70ch] text-sm text-ink-muted"
              >
                {study.icp.realityCheck}
              </Reveal>
            )}
          </Section>
        )}

        {/* PITCH OPTIONS -------------------------------------------- */}
        {study.pitchOptions && (
          <Section sink={sink.pitch}>
            <Kicker>{study.pitchOptions.kicker}</Kicker>
            <Reveal as="h2" className="text-[length:var(--text-h2)]">
              {study.pitchOptions.heading}
            </Reveal>
            <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
              {study.pitchOptions.intro}
            </Reveal>
            <div className="mt-12 space-y-14">
              {study.pitchOptions.groups.map((g) => (
                <div key={g.forkName}>
                  <Reveal as="h3" className="text-[length:var(--text-h3)]">
                    {g.forkName}
                  </Reveal>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {g.variants.map((v, i) => (
                      <Reveal
                        key={v.label}
                        delay={i * 90}
                        className="border-t-2 border-marker bg-paper p-6"
                      >
                        <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                          {v.label}
                        </p>
                        <blockquote className="mt-4 font-serif text-lg leading-snug">
                          {v.sentence}
                        </blockquote>
                      </Reveal>
                    ))}
                  </div>
                  {g.note && (
                    <Reveal
                      as="p"
                      className="mt-4 font-mono text-sm text-ink-muted"
                    >
                      {g.note}
                    </Reveal>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* MAP FINDINGS — 4-cell strip ------------------------------ */}
        {study.mapFindings && (
          <Section sink={sink.map}>
            <Kicker>{study.mapFindings.kicker}</Kicker>
            <Reveal as="h2" className="text-[length:var(--text-h2)]">
              {study.mapFindings.heading}
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
              {study.mapFindings.findings.map((f, i) => (
                <Reveal
                  key={f.label}
                  delay={i * 80}
                  className="bg-paper p-6"
                >
                  <span
                    className="text-2xl leading-none"
                    aria-hidden="true"
                  >
                    {f.icon}
                  </span>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                    {f.label}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{f.body}</p>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        {/* NEXT STEPS — with gate visualization --------------------- */}
        {study.nextSteps && (
          <Section sink={sink.steps}>
            <Kicker>{study.nextSteps.kicker}</Kicker>
            <Reveal as="h2" className="text-[length:var(--text-h2)]">
              {study.nextSteps.heading}
            </Reveal>
            {study.nextSteps.intro && (
              <Reveal
                as="p"
                className="mt-6 max-w-[62ch] text-lead text-ink-muted"
              >
                {study.nextSteps.intro}
              </Reveal>
            )}
            <ol className="mt-14 space-y-8">
              {study.nextSteps.steps.map((step, i) => (
                <Reveal
                  key={step.n}
                  delay={i * 60}
                  as="li"
                  className={`relative grid gap-6 border-t-2 pt-6 md:grid-cols-[10rem_1fr] ${
                    step.gate ? "border-ink" : "border-line"
                  }`}
                >
                  {/* Left rail — number + gate marker */}
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
                    {step.timing && (
                      <p className="mt-3 font-mono text-xs text-ink-muted">
                        {step.timing}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[length:var(--text-h3)]">
                      {step.name}
                    </h3>
                    <p className="mt-3 text-ink-muted">{step.body}</p>
                    {step.bullets && (
                      <ul className="mt-5 space-y-2 text-sm">
                        {step.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-ink-muted">
                            <span
                              className="text-chartreuse-deep"
                              aria-hidden="true"
                            >
                              —
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.deliverable && (
                      <p className="mt-5 border-l-2 border-marker pl-4 font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
                        Deliverable
                        <span className="ml-2 font-sans normal-case tracking-normal text-ink">
                          {step.deliverable}
                        </span>
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </ol>
          </Section>
        )}

        {/* WHERE IT FITS — variant-switched */}
        {isDeliverable ? (
          <DeliverableNextSteps sink={sink.whereFits} />
        ) : (
          <CaseStudyLadder sink={sink.whereFits} />
        )}

        {/* CTA ------------------------------------------------------ */}
        {study.cta && (
          <section className="bg-ink text-paper">
            <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
              <p className="kicker mb-6 text-paper/60">{study.cta.kicker}</p>
              <h2 className="text-[length:var(--text-h2)] text-paper">
                {study.cta.heading}
              </h2>
              <p className="mt-6 max-w-[62ch] text-lead text-paper/75">
                {study.cta.sub}
              </p>
              <Link
                href={study.cta.href}
                className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-marker px-7 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse"
              >
                {study.cta.button} →
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Variant sections: public case-study ladder vs. client deliverable   */
/* ------------------------------------------------------------------ */

/** Public case-study version: sells the Jam → Map → Build ladder to prospects. */
function CaseStudyLadder({ sink }: { sink: boolean }) {
  return (
    <Section sink={sink}>
      <Kicker>Where this work fits</Kicker>
      <Reveal as="h2" className="text-[length:var(--text-h2)]">
        This was the entry rung. Here&rsquo;s what completes it.
      </Reveal>
      <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
        The Jam produced the map, the fork, and the plan you just read.
        Executing that plan is a sequence, and Fronz meets the client at each
        rung.
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <Reveal className="flex flex-col border border-line bg-paper p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
              Rung 01 &middot; The decision
            </p>
            <span className="whitespace-nowrap bg-marker px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink">
              This case study
            </span>
          </div>
          <h3 className="mt-3 text-[length:var(--text-h3)]">GTM Clarity Jam</h3>
          <p className="mt-4 font-mono text-4xl">$1,500</p>
          <p className="mt-4 font-serif text-lg text-ink">
            A 2-hour recorded session. Walk in with a blur, walk out with a
            decision, a wedge, and a 90-day plan.
          </p>
          <p className="mt-6 flex-1 text-sm text-ink-muted">
            What you just read is the artifact this rung produces: a map, a
            fork, a recommended wedge, and the roadmap the next two rungs
            execute.
          </p>
          <Link
            href="/gtm-clarity"
            className="mt-8 inline-block font-mono text-sm underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-chartreuse-deep hover:text-chartreuse-deep"
          >
            About the Jam &rarr;
          </Link>
        </Reveal>

        <Reveal
          delay={90}
          className="flex flex-col border border-ink bg-ink p-8 text-paper"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-marker">
            Rung 02 &middot; The next natural step
          </p>
          <h3 className="mt-3 text-[length:var(--text-h3)] text-paper">
            Outreach Playbook
          </h3>
          <p className="mt-4 font-mono text-4xl">$7,500</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-marker">
            Founder · from $6,000 after a Jam
          </p>
          <p className="mt-4 font-serif text-lg text-paper/85">
            Turn the decision into the running outreach system a team can
            operate: messaging, ICP, channels, cadence, metrics.
          </p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-paper/75">
            <li className="flex gap-3">
              <span className="text-marker" aria-hidden="true">
                &mdash;
              </span>
              <span>Productized messaging set + one formalized ICP</span>
            </li>
            <li className="flex gap-3">
              <span className="text-marker" aria-hidden="true">
                &mdash;
              </span>
              <span>Channel selection with cadence templates and metrics</span>
            </li>
            <li className="flex gap-3">
              <span className="text-marker" aria-hidden="true">
                &mdash;
              </span>
              <span>Team enablement in a working handoff session</span>
            </li>
          </ul>
          <Link
            href="/gtm-clarity#pricing"
            className="mt-8 inline-block font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] hover:text-marker"
          >
            See Outreach Playbook &rarr;
          </Link>
        </Reveal>

        <Reveal
          delay={180}
          className="flex flex-col border border-line bg-paper p-8"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
            Rung 03 &middot; The full execution
          </p>
          <h3 className="mt-3 text-[length:var(--text-h3)]">GTM Build</h3>
          <p className="mt-4 font-mono text-4xl">$30,000</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
            Founder · 12 weeks embedded
          </p>
          <p className="mt-4 font-serif text-lg text-ink">
            12 weeks embedded with your team. We run the system live, and
            progressively hand it off so your team owns it by week 12.
          </p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-ink-muted">
            <li className="flex gap-3">
              <span className="text-chartreuse-deep" aria-hidden="true">
                &mdash;
              </span>
              <span>Missing rung designed, priced, launched</span>
            </li>
            <li className="flex gap-3">
              <span className="text-chartreuse-deep" aria-hidden="true">
                &mdash;
              </span>
              <span>Channel + content infrastructure stood up and running</span>
            </li>
            <li className="flex gap-3">
              <span className="text-chartreuse-deep" aria-hidden="true">
                &mdash;
              </span>
              <span>Progressive team ownership, complete by week 12</span>
            </li>
          </ul>
          <Link
            href="/gtm-clarity#pricing"
            className="mt-8 inline-block font-mono text-sm underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-chartreuse-deep hover:text-chartreuse-deep"
          >
            See GTM Build &rarr;
          </Link>
        </Reveal>
      </div>

      <Reveal className="mt-16 border-t border-line pt-10">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <p className="kicker">Once the go-to-market is built</p>
          <div>
            <h3 className="text-[length:var(--text-h3)] leading-snug">
              When reach becomes the constraint, Groundswell picks up where GTM
              Clarity leaves off.
            </h3>
            <p className="mt-4 text-ink-muted">
              Groundswell AI Customer Discoverability is the second Fronz line:
              how you become the answer AI recommends once your positioning,
              offer, and audience are dialed. Not urgent for The Sanctuary yet.
              It becomes the natural continuation after the full go-to-market
              buildout is landing customers.
            </p>
            <Link
              href="/groundswell"
              className="mt-5 inline-block font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] hover:text-chartreuse-deep"
            >
              Explore Groundswell &rarr;
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/** Client deliverable version: addresses the reader directly, marks the Jam
 *  as done, and frames Map + Playbook as their specific recommended next step. */
function DeliverableNextSteps({ sink }: { sink: boolean }) {
  return (
    <Section sink={sink}>
      <Kicker>Your recommended next step with Fronz</Kicker>
      <Reveal as="h2" className="text-[length:var(--text-h2)]">
        You&rsquo;ve made the decisions. Here&rsquo;s what turns them into a
        running system.
      </Reveal>
      <Reveal as="p" className="mt-6 max-w-[62ch] text-lead text-ink-muted">
        The Jam gave you the map, the fork, and the roadmap above. The next
        rung is where those decisions become productized messaging, a
        formalized ICP, and an outreach playbook your team can actually run.
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {/* Rung 01 — done */}
        <Reveal className="flex flex-col border border-line bg-paper p-8 opacity-90">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
              Rung 01 &middot; The decision
            </p>
            <span className="whitespace-nowrap border border-chartreuse-deep px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-chartreuse-deep">
              Done ✓
            </span>
          </div>
          <h3 className="mt-3 text-[length:var(--text-h3)]">GTM Clarity Jam</h3>
          <p className="mt-4 font-mono text-4xl text-ink-muted">$1,500</p>
          <p className="mt-4 font-serif text-lg text-ink-muted">
            You did this. This document is the artifact.
          </p>
          <p className="mt-6 flex-1 text-sm text-ink-muted">
            The map is drawn, the fork is named, the wedge is recommended, and
            the roadmap above is yours. The remaining decisions live in Steps
            01&ndash;05.
          </p>
        </Reveal>

        {/* Rung 02 — recommended for you */}
        <Reveal
          delay={90}
          className="flex flex-col border border-ink bg-ink p-8 text-paper"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-marker">
              Rung 02 &middot; Your next step
            </p>
            <span className="whitespace-nowrap bg-marker px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink">
              Recommended for you
            </span>
          </div>
          <h3 className="mt-3 text-[length:var(--text-h3)] text-paper">
            Outreach Playbook
          </h3>
          <p className="mt-4 font-mono text-4xl">$7,500</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-marker">
            Founder · net $6,000 after your Jam
          </p>
          <p className="mt-4 font-serif text-lg text-paper/85">
            Turn the roadmap above into a running outreach system your team
            can operate. The fastest, cleanest path from &ldquo;we
            decided&rdquo; to &ldquo;we&rsquo;re selling.&rdquo;
          </p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-paper/75">
            <li className="flex gap-3">
              <span className="text-marker" aria-hidden="true">
                &mdash;
              </span>
              <span>
                The one sentence, locked, plus the audience variants
                you&rsquo;ll actually use
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-marker" aria-hidden="true">
                &mdash;
              </span>
              <span>The missing rung designed, priced, ready to sell</span>
            </li>
            <li className="flex gap-3">
              <span className="text-marker" aria-hidden="true">
                &mdash;
              </span>
              <span>
                Formalized ICP + outreach playbook for your ~20-founder list
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-marker" aria-hidden="true">
                &mdash;
              </span>
              <span>Sequenced 90-day plan you and Anna can execute</span>
            </li>
          </ul>
          <Link
            href="/book"
            className="mt-8 inline-block font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] hover:text-marker"
          >
            Book a call to discuss &rarr;
          </Link>
        </Reveal>

        {/* Rung 03 — the bigger commit */}
        <Reveal
          delay={180}
          className="flex flex-col border border-line bg-paper p-8"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
            Rung 03 &middot; If you want it built
          </p>
          <h3 className="mt-3 text-[length:var(--text-h3)]">GTM Build</h3>
          <p className="mt-4 font-mono text-4xl">$30,000</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
            Founder · 12 weeks embedded
          </p>
          <p className="mt-4 font-serif text-lg text-ink">
            12 weeks embedded. Every &ldquo;next step&rdquo; in this document,
            run live with your team until you own it.
          </p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-ink-muted">
            <li className="flex gap-3">
              <span className="text-chartreuse-deep" aria-hidden="true">
                &mdash;
              </span>
              <span>Missing rung launched, priced, converting</span>
            </li>
            <li className="flex gap-3">
              <span className="text-chartreuse-deep" aria-hidden="true">
                &mdash;
              </span>
              <span>Email &amp; Telegram outreach infrastructure stood up</span>
            </li>
            <li className="flex gap-3">
              <span className="text-chartreuse-deep" aria-hidden="true">
                &mdash;
              </span>
              <span>
                Warm-up outreach system running against your ~20-founder list
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-chartreuse-deep" aria-hidden="true">
                &mdash;
              </span>
              <span>Your team trained to run it without us</span>
            </li>
          </ul>
          <p className="mt-6 border-l-2 border-line pl-3 text-xs italic text-ink-muted">
            Best fit after Outreach Playbook. Consider this once the
            wedge is proven.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-16 border-t border-line pt-10">
        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-start">
          <p className="kicker">Once your go-to-market is running</p>
          <div>
            <h3 className="text-[length:var(--text-h3)] leading-snug">
              When reach becomes your constraint, Groundswell is where we come
              back in.
            </h3>
            <p className="mt-4 text-ink-muted">
              Groundswell AI Customer Discoverability is the second Fronz line:
              how you become the answer AI recommends once your positioning,
              offer, and audience are dialed. Not urgent yet. It becomes the
              natural continuation after your go-to-market is landing customers
              and you want to widen the path to purchase.
            </p>
            <Link
              href="/groundswell"
              className="mt-5 inline-block font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] hover:text-chartreuse-deep"
            >
              Preview Groundswell &rarr;
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
