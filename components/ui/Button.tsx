import Link from "next/link";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-mono text-sm tracking-wide transition-colors duration-200 px-6 py-3.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-chartreuse-deep rounded-[2px]",
  ghost:
    "text-ink underline decoration-marker decoration-2 underline-offset-[6px] hover:decoration-chartreuse-deep px-0 py-1",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
