"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Highlight } from "@/components/ui/Highlight";
import {
  CHAPTER_META,
  COVER,
  PRODUCTION,
  EVENTS,
  MOXA,
  NOW,
  RESUME_PDF,
  type PhotoSlotDef,
  type Stat,
} from "@/lib/resume";

type OpenFn = (slot: PhotoSlotDef) => void;

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

/** Staggered chapter-enter wrapper: blur -> sharp, keyed per chapter. */
function E({
  i = 0,
  as: Tag = "div",
  className = "",
  children,
}: {
  i?: number;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={`story-enter ${className}`}
      style={{ "--story-delay": `${i * 90}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Animated number: counts up when the chapter mounts. */
function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </>
  );
}

function StatRow({ stats, dark = false }: { stats: readonly Stat[]; dark?: boolean }) {
  return (
    <div
      className={`grid gap-px overflow-hidden border sm:grid-cols-3 ${
        dark ? "border-paper/25 bg-paper/25" : "border-line bg-line"
      }`}
    >
      {stats.map((stat) => (
        <div key={stat.label} className={`p-6 ${dark ? "bg-ink" : "bg-paper"}`}>
          <p className="font-mono text-4xl md:text-5xl">
            <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          </p>
          <p
            className={`mt-3 text-sm ${dark ? "text-paper/70" : "text-ink-muted"}`}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Clickable photo slot: real image when `src` is set, designed placeholder otherwise. */
function PhotoSlot({
  slot,
  onOpen,
  className = "",
}: {
  slot: PhotoSlotDef;
  onOpen: OpenFn;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(slot)}
      aria-label={`Enlarge: ${slot.label}`}
      className={`group relative overflow-hidden transition-colors ${
        slot.src
          ? "border border-line"
          : "border border-dashed border-line bg-paper-sink hover:border-ink"
      } ${className}`}
    >
      {slot.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slot.src}
          alt={slot.label}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <span className="max-w-[18ch] px-4 py-6 text-center font-mono text-[0.65rem] uppercase tracking-widest text-ink-muted">
            {slot.label}
          </span>
        </span>
      )}
      <span className="absolute bottom-2 right-2 font-mono text-[0.6rem] uppercase tracking-widest text-ink-muted opacity-0 transition-opacity group-hover:opacity-100">
        Enlarge +
      </span>
    </button>
  );
}

/** Prominent full-width image band: one hero slot + a row of three. */
function PhotoBand({
  slots,
  onOpen,
}: {
  slots: readonly PhotoSlotDef[];
  onOpen: OpenFn;
}) {
  const [hero, ...rest] = slots;
  return (
    <div className="grid gap-3">
      <PhotoSlot slot={hero} onOpen={onOpen} className="aspect-[16/9] w-full md:aspect-[21/9]" />
      <div className="grid grid-cols-3 gap-3">
        {rest.map((slot) => (
          <PhotoSlot key={slot.label} slot={slot} onOpen={onOpen} className="aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}

/** Role first and prominent; era + org grouped as supporting meta. */
function ChapterMeta({
  era,
  role,
  org,
}: {
  era: string;
  role: string;
  org: string;
}) {
  return (
    <div className="border-b border-line pb-5">
      <p className="font-serif text-xl md:text-2xl">{role}</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-muted">
        <span className="text-chartreuse-deep">{era}</span>
        <span className="mx-2 text-line" aria-hidden="true">
          ·
        </span>
        <span>{org}</span>
      </p>
    </div>
  );
}

/** Full-width chapter claim — overrides global h2 `text-wrap: balance` so lines use the full measure. */
function ChapterHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="w-full max-w-none text-[length:var(--text-h2)] leading-[1.05] [text-wrap:wrap]"
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* Chapters                                                            */
/* ------------------------------------------------------------------ */

function CoverChapter() {
  return (
    <div className="flex min-h-full flex-col justify-center py-16">
      <E i={0}>
        <p className="kicker">{COVER.kicker}</p>
      </E>
      <E i={1} as="h1" className="mt-8 text-[length:var(--text-display)] leading-[0.98]">
        {COVER.lead} <Highlight>{COVER.highlight}</Highlight>
      </E>
      <E i={2} as="p" className="mt-8 max-w-[52ch] text-[length:var(--text-lead)] text-ink-muted">
        {COVER.sub}
      </E>
      <E i={3} className="mt-16">
        <p className="font-mono text-sm text-ink-muted">
          {COVER.hint} <span aria-hidden="true">→</span>
        </p>
      </E>
    </div>
  );
}

function ProductionChapter({ open }: { open: OpenFn }) {
  return (
    <div className="py-12 md:py-16">
      <E i={0}>
        <ChapterHeadline>{PRODUCTION.headline}</ChapterHeadline>
      </E>
      <E i={1} className="mt-6">
        <ChapterMeta era={PRODUCTION.era} role={PRODUCTION.role} org={PRODUCTION.org} />
      </E>

      <E i={2} className="mt-8 max-w-[70ch] space-y-4">
        <p className="text-lead text-ink-muted">{PRODUCTION.narrative}</p>
        <p className="text-ink-muted">{PRODUCTION.secondary}</p>
      </E>

      <E i={3} className="mt-8 font-mono text-sm text-ink-muted">
        {PRODUCTION.brandsLead}{" "}
        {PRODUCTION.brands.map((brand, i) => (
          <span key={brand}>
            {i > 0 && (i === PRODUCTION.brands.length - 1 ? ", and " : ", ")}
            <span className="text-ink">{brand}</span>
          </span>
        ))}
        .{" "}
        <a
          href={PRODUCTION.portfolioHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-marker decoration-2 underline-offset-4 hover:text-ink"
        >
          {PRODUCTION.portfolioLabel} →
        </a>
      </E>

      <E i={4} className="mt-12">
        <PhotoBand slots={PRODUCTION.photoSlots} onOpen={open} />
      </E>

      <E i={5} className="mt-12">
        <StatRow stats={PRODUCTION.stats} />
      </E>
    </div>
  );
}

function EventsChapter({ open }: { open: OpenFn }) {
  return (
    <div className="py-12 md:py-16">
      <E i={0}>
        <ChapterHeadline>{EVENTS.headline}</ChapterHeadline>
      </E>
      <E i={1} className="mt-6">
        <ChapterMeta era={EVENTS.era} role={EVENTS.role} org={EVENTS.org} />
      </E>

      <E i={2} className="mt-8 max-w-[70ch] space-y-4">
        <p className="text-lead text-ink-muted">{EVENTS.narrative}</p>
        <p className="text-ink-muted">{EVENTS.secondary}</p>
      </E>

      <E i={3} className="mt-12">
        <p className="kicker">{EVENTS.keystoneKicker}</p>
        <div className="mt-4 grid gap-px overflow-hidden border border-ink bg-ink sm:grid-cols-2">
          {EVENTS.bigStats.map((stat) => (
            <div key={stat.label} className="bg-ink p-8 text-paper md:p-10">
              <p className="font-mono text-6xl md:text-7xl">
                <CountUp value={stat.value} duration={1600} />
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-marker">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </E>

      <E i={4} className="mt-12">
        <PhotoBand slots={EVENTS.photoSlots} onOpen={open} />
      </E>

      <E i={5} className="mt-12">
        <StatRow stats={EVENTS.stats} />
      </E>
    </div>
  );
}

function MoxaChapter({ open }: { open: OpenFn }) {
  return (
    <div className="py-12 md:py-16">
      <E i={0}>
        <ChapterHeadline>{MOXA.headline}</ChapterHeadline>
      </E>
      <E i={1} className="mt-6">
        <ChapterMeta era={MOXA.era} role={MOXA.role} org={MOXA.org} />
      </E>

      <E i={2} as="p" className="mt-8 max-w-[70ch] text-lead text-ink-muted">
        {MOXA.narrative}
      </E>

      <E i={3} className="mt-12">
        <p className="kicker">{MOXA.sequenceKicker}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOXA.sequence.map((step) => (
            <div key={step.n} className="border border-line bg-paper p-5">
              <p className="font-mono text-xs text-chartreuse-deep">{step.n}</p>
              <p className="mt-2 font-serif text-lg">{step.name}</p>
              <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </E>

      <E i={4} className="mt-12 flex flex-wrap items-start justify-center gap-6">
        {MOXA.screenshotSlots.map((slot, i) => (
          <PhotoSlot
            key={slot.label}
            slot={slot}
            onOpen={open}
            className={`aspect-[9/19] w-[42vw] max-w-[210px] rounded-[18px] ${
              i === 1 ? "md:mt-12" : ""
            }`}
          />
        ))}
      </E>

      <E i={5} className="mt-12">
        <StatRow stats={MOXA.stats} />
      </E>
    </div>
  );
}

function NowChapter() {
  return (
    <div className="py-12 md:py-16">
      <E i={0}>
        <ChapterHeadline>{NOW.headline}</ChapterHeadline>
      </E>
      <E i={1} className="mt-6">
        <ChapterMeta era={NOW.era} role={NOW.role} org={NOW.org} />
      </E>
      <E i={2} as="p" className="mt-8 max-w-[70ch] text-lead text-ink-muted">
        {NOW.narrative}
      </E>

      <E i={3} className="mt-12">
        <p className="kicker">{NOW.howIWork.kicker}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {NOW.howIWork.pairs.map((pair) => (
            <div key={pair.ai} className="border border-line bg-paper p-5">
              <p className="text-sm text-ink-muted">{pair.ai}</p>
              <p className="mt-2 font-serif text-lg">{pair.human}</p>
            </div>
          ))}
        </div>
      </E>

      <E i={4} className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
        {NOW.skills.map((skill) => (
          <div key={skill.group} className="bg-paper p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-chartreuse-deep">
              {skill.group}
            </p>
            <p className="mt-3 text-sm text-ink-muted">{skill.items}</p>
          </div>
        ))}
      </E>

      <E i={5} className="mt-6 font-mono text-xs uppercase tracking-widest text-ink-muted">
        {NOW.education}
      </E>

      <E i={6} className="mt-14 border border-ink bg-ink p-8 text-paper md:p-10">
        <h3 className="text-[length:var(--text-h3)] text-paper">
          {NOW.closing.heading}
        </h3>
        <p className="mt-4 max-w-[60ch] text-paper/75">{NOW.closing.softLine}</p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href={NOW.closing.consultHref}
            className="inline-block rounded-[2px] bg-marker px-6 py-3.5 font-mono text-sm tracking-wide text-ink transition-colors hover:bg-chartreuse"
          >
            {NOW.closing.consultLabel} →
          </Link>
          <a
            href={NOW.closing.emailHref}
            className="font-mono text-sm underline decoration-marker decoration-2 underline-offset-[6px] hover:text-marker"
          >
            {NOW.closing.emailLabel}
          </a>
          <a
            href={RESUME_PDF}
            download
            className="font-mono text-sm text-paper/70 underline decoration-paper/40 decoration-2 underline-offset-[6px] hover:text-paper"
          >
            {NOW.closing.downloadLabel}
          </a>
        </div>
      </E>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                            */
/* ------------------------------------------------------------------ */

function Lightbox({ slot, onClose }: { slot: PhotoSlotDef; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slot.label}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="story-enter w-full max-w-4xl"
      >
        {slot.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slot.src}
            alt={slot.label}
            className="max-h-[80vh] w-full border border-paper/20 object-contain"
          />
        ) : (
          <div className="flex aspect-[16/9] w-full items-center justify-center border border-dashed border-paper/40 bg-ink">
            <p className="max-w-[24ch] px-6 text-center font-mono text-xs uppercase tracking-widest text-paper/60">
              {slot.label} — photo coming soon
            </p>
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-paper/70">
            {slot.label}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-sm text-paper underline decoration-marker decoration-2 underline-offset-[6px] hover:text-marker"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The story shell: rail, stage, controls, keyboard nav                */
/* ------------------------------------------------------------------ */

export function ResumeStory() {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<PhotoSlotDef | null>(null);
  const last = CHAPTER_META.length - 1;

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(last, next));
      setIndex(clamped);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [last],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox) {
        if (e.key === "Escape") setLightbox(null);
        return;
      }
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, lightbox]);

  const open: OpenFn = (slot) => setLightbox(slot);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-[1180px] flex-col px-6 md:px-10">
      {/* Chapter rail */}
      <nav
        aria-label="Resume chapters"
        className="flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-line py-5"
      >
        {CHAPTER_META.map((meta, i) => (
          <button
            key={meta.id}
            type="button"
            onClick={() => go(i)}
            aria-current={i === index ? "step" : undefined}
            className={`font-mono text-xs uppercase tracking-widest transition-colors ${
              i === index
                ? "text-ink underline decoration-marker decoration-[3px] underline-offset-[6px]"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <span className="mr-2 text-chartreuse-deep">0{i + 1}</span>
            {meta.short}
          </button>
        ))}
      </nav>

      {/* Stage — keyed so each chapter re-runs its enter animation */}
      <div key={index} className="flex-1">
        {index === 0 && <CoverChapter />}
        {index === 1 && <ProductionChapter open={open} />}
        {index === 2 && <EventsChapter open={open} />}
        {index === 3 && <MoxaChapter open={open} />}
        {index === 4 && <NowChapter />}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between border-t border-line py-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="font-mono text-sm text-ink-muted transition-colors hover:text-ink disabled:opacity-30 disabled:hover:text-ink-muted"
        >
          ← Previous
        </button>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          {String(index + 1).padStart(2, "0")} / {String(CHAPTER_META.length).padStart(2, "0")}
          <span className="ml-4 hidden text-line sm:inline">·</span>
          <span className="ml-4 hidden sm:inline">{CHAPTER_META[index].era}</span>
        </p>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          className={`font-mono text-sm transition-colors disabled:opacity-30 ${
            index === last
              ? "text-ink-muted"
              : "text-ink underline decoration-marker decoration-2 underline-offset-[6px] hover:text-chartreuse-deep"
          }`}
        >
          Next chapter →
        </button>
      </div>

      {lightbox && <Lightbox slot={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
