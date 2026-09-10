import { Highlight } from "@/components/ui/Highlight";

export function MotionHeadline({
  beats,
  highlightIndex = 1,
  className = "max-w-[24ch] text-[length:var(--text-display)] leading-[0.98]",
}: {
  beats: readonly string[];
  highlightIndex?: number;
  className?: string;
}) {
  return (
    <h1 className={className}>
      {beats.map((beat, i) => (
        <span key={beat}>
          {i > 0 && " "}
          {i === highlightIndex ? <Highlight>{beat}</Highlight> : beat}
        </span>
      ))}
    </h1>
  );
}
