import { STARTER } from "@/lib/content";

type PrivacyNoteProps = {
  body?: string;
  variant?: "hero" | "dark" | "wizard" | "inline";
  className?: string;
};

const variantClass = {
  hero: "mt-6 max-w-2xl border-l-2 border-line pl-4",
  dark: "max-w-2xl border-l-2 border-chartreuse-deep pl-4",
  wizard: "border-l-2 border-chartreuse-deep bg-paper-sink px-4 py-3",
  inline: "mt-4 border-l-2 border-line pl-4",
} as const;

export function PrivacyNote({
  body,
  variant = "hero",
  className = "",
}: PrivacyNoteProps) {
  if (variant === "inline") {
    return (
      <div
        className={`${variantClass.inline} text-sm text-ink-muted ${className}`}
      >
        <p>{body ?? STARTER.privacyConnect}</p>
      </div>
    );
  }

  const copy = body ?? STARTER.privacy;
  const onDark = variant === "dark";

  return (
    <div
      className={`${variantClass[variant]} text-sm ${onDark ? "text-paper/70" : "text-ink-muted"} ${className}`}
    >
      <p
        className={`font-serif text-base font-bold ${onDark ? "text-paper" : "text-ink"}`}
      >
        {STARTER.privacyHeading}
      </p>
      <p className="mt-2">{copy}</p>
    </div>
  );
}
