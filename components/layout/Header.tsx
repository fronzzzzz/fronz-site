"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV, SITE, HERO } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
          <span className="text-chartreuse-deep">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-widest text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={HERO.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-[2px] bg-ink px-4 py-2.5 font-mono text-xs tracking-wide text-paper transition-colors hover:bg-chartreuse-deep sm:inline-block"
          >
            Book a Jam
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-[2px] w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-[2px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[2px] w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-paper px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-serif text-2xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={HERO.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block rounded-[2px] bg-ink px-5 py-3 font-mono text-sm tracking-wide text-paper"
          >
            Book a Jam
          </a>
        </nav>
      )}
    </header>
  );
}
