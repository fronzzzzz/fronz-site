import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section, Kicker } from "@/components/ui/Section";
import { MotionHeadline } from "@/components/ui/MotionHeadline";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  SITE,
  HERO,
  PROBLEM,
  LINES,
  GUIDE,
  PROOF,
  OFFERS,
  WHY_FRONZ,
  LEAD,
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
            <MotionHeadline
              beats={HERO.beats}
              highlightIndex={HERO.highlightBeat}
            />
            <p className="mt-8 text-[length:var(--text-lead)] text-ink-muted">
              {HERO.sub}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button href={HERO.ctaHref}>{HERO.cta}</Button>
              <Button href={HERO.secondaryHref} variant="ghost">
                {HERO.secondaryCta}
              </Button>
            </div>

            <div className="mt-16 flex flex-row flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-6">
              {HERO.arc.map((step, i) => (
                <span key={step.href} className="inline-flex items-center gap-4">
                  {i > 0 && (
                    <span
                      className="font-mono text-sm tracking-widest text-marker"
                      aria-hidden="true"
                    >
                      &gt;&gt;
                    </span>
                  )}
                  <Link
                    href={step.href}
                    className="font-mono text-sm font-bold uppercase tracking-wide underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-chartreuse-deep hover:decoration-marker"
                  >
                    {step.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* [02] PROBLEM -------------------------------------------- */}
        <Section id="problem" sink>
          <Kicker>{PROBLEM.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
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

        {/* [03] UPSIDE (highlight) -------------------------------- */}
        <section id="lines" className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <p className="kicker mb-6 text-paper/60">{LINES.kicker}</p>
            <h2 className="max-w-3xl text-[length:var(--text-h2)] text-paper">
              {LINES.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-lead text-paper/75">
              {LINES.sub}
            </p>
            <Link
              href={LINES.ctaHref}
              className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-marker px-7 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse"
            >
              {LINES.cta} →
            </Link>
          </div>
        </section>

        {/* [04] THE GUIDE ----------------------------------------- */}
        <Section id="guide" sink>
          <div className="flex max-w-4xl flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 md:gap-12">
            <Reveal className="relative aspect-[4/5] w-full max-w-[11rem] shrink-0 overflow-hidden border border-line bg-paper sm:max-w-[13rem] md:max-w-[15rem]">
              <Image
                src="/stacey-fronek.jpg"
                alt="Portrait of Stacey Fronek sitting at an outdoor cafe holding a coffee cup, smiling at the camera"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 176px, 240px"
              />
            </Reveal>
            <div className="min-w-0 flex-1">
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
            </div>
          </div>
        </Section>

        {/* [05] PROOF --------------------------------------------- */}
        <Section id="proof">
          <Kicker>{PROOF.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {PROOF.heading}
          </Reveal>
          <Reveal className="mt-10 grid overflow-hidden border border-line md:grid-cols-2">
            <div className="bg-paper p-6 md:p-8">
              <p className="font-mono text-sm text-ink-muted">{PROOF.reach}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {PROOF.names.map((name) => (
                  <span key={name} className="font-serif text-lg text-ink">
                    {name}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-mono text-xs text-ink-muted">
                {PROOF.portfolio.lead}{" "}
                <a
                  href={PROOF.portfolio.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-marker underline-offset-2 transition-colors hover:text-ink"
                >
                  {PROOF.portfolio.label}
                </a>
                .
              </p>
            </div>
            <div className="border-t border-line bg-paper-sink p-6 md:border-t-0 md:border-l md:p-8">
              <p className="font-serif text-xl md:text-2xl">{PROOF.build.name}</p>
              <p className="mt-2 text-sm text-ink-muted">{PROOF.build.detail}</p>
            </div>
          </Reveal>
        </Section>

        {/* [06] OFFERS GATEWAY ------------------------------------ */}
        <Section id="offers">
          <Kicker>{OFFERS.kicker}</Kicker>
          <Reveal as="h2" className="max-w-2xl text-[length:var(--text-h2)]">
            {OFFERS.heading}
          </Reveal>
          <Reveal as="p" className="mt-5 max-w-2xl text-lead text-ink-muted">
            {OFFERS.sub}
          </Reveal>
          <Reveal className="mt-10">
            <Button href={OFFERS.ctaHref}>{OFFERS.cta}</Button>
          </Reveal>
        </Section>

        {/* [07] WHY FRONZ ----------------------------------------- */}
        <Section id="why-fronz" sink>
          <Kicker>{WHY_FRONZ.kicker}</Kicker>
          <Reveal as="h2" className="text-[length:var(--text-h2)]">
            {WHY_FRONZ.heading}
          </Reveal>

          <div className="mt-10 overflow-x-auto border border-line">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-3 bg-ink font-mono text-xs uppercase tracking-widest text-paper">
                <div className="p-4">Typical agency</div>
                <div className="border-l border-paper/15 p-4">In-house hire</div>
                <div className="border-l border-paper/15 p-4">Fronz</div>
              </div>
              {WHY_FRONZ.rows.map((row, i) => (
                <div
                  key={row.fronz}
                  className={`grid grid-cols-3 ${i % 2 ? "bg-paper-sink" : "bg-paper"}`}
                >
                  <div className="border-t border-line p-4 text-sm text-ink-muted line-through decoration-line">
                    {row.agency}
                  </div>
                  <div className="border-l border-t border-line p-4 text-sm text-ink-muted line-through decoration-line">
                    {row.inhouse}
                  </div>
                  <div className="border-l border-t border-line p-4 text-sm">
                    {row.fronz}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* [08] STARTER CTA --------------------------------------- */}
        <section id="starter" className="bg-ink text-paper">
          <div className="mx-auto w-full max-w-[1180px] px-6 py-20 md:px-10 md:py-28">
            <p className="kicker mb-6 text-paper/60">{LEAD.kicker}</p>
            <h2 className="text-[length:var(--text-h2)] text-paper">
              {LEAD.heading}
            </h2>
            <p className="mt-6 text-lead text-paper/75">{LEAD.body}</p>
            <Link
              href={LEAD.href}
              className="mt-10 inline-flex items-center gap-2 rounded-[2px] bg-marker px-7 py-4 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse"
            >
              {LEAD.cta} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
