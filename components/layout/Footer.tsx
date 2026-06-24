import Link from "next/link";
import { SITE, NAV } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-sink">
      <div className="mx-auto w-full max-w-[1180px] px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <p className="font-serif text-3xl font-semibold tracking-tight">
              {SITE.name}
              <span className="text-chartreuse-deep">.</span>
            </p>
            <p className="mt-3 text-ink-muted">
              Lean systems you own, not agencies you rent. Built live at Moxa,
              first.
            </p>
          </div>

          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              <p className="kicker mb-1">Site</p>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <p className="kicker mb-1">Contact</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Made by a human, on
            purpose.
          </p>
          <p>Skip the retainers. Own the growth.</p>
        </div>
      </div>
    </footer>
  );
}
