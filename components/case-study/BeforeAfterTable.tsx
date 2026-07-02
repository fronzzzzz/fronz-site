import type { BeforeAfterRow } from "@/lib/case-studies";

/**
 * BeforeAfterTable — the case study's hero visualization.
 * Mirrors the SUPPORT "Agency vs Fronz" pattern on the homepage:
 * strikethrough / muted on the before column, ink on the after column,
 * alternating row backgrounds for magazine rhythm.
 *
 * A left "label" spine holds the row category (mono kicker style), so the
 * reader can scan by dimension top-to-bottom without losing which row is which.
 */
export function BeforeAfterTable({
  columns,
  rows,
}: {
  columns: { before: string; after: string };
  rows: BeforeAfterRow[];
}) {
  return (
    <div className="overflow-hidden border border-line">
      <div className="grid grid-cols-[9rem_1fr_1fr] bg-ink font-mono text-xs uppercase tracking-widest text-paper md:grid-cols-[12rem_1fr_1fr]">
        <div className="p-4 text-paper/60">Dimension</div>
        <div className="p-4">{columns.before}</div>
        <div className="border-l border-paper/15 p-4 text-marker">
          {columns.after}
        </div>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`grid grid-cols-[9rem_1fr_1fr] md:grid-cols-[12rem_1fr_1fr] ${
            i % 2 ? "bg-paper-sink" : "bg-paper"
          }`}
        >
          <div className="border-t border-line p-4 font-mono text-[0.7rem] uppercase tracking-widest text-ink-muted">
            {row.label}
          </div>
          <div className="border-l border-t border-line p-4 text-ink-muted">
            <span className="line-through decoration-line decoration-1">
              {row.before}
            </span>
          </div>
          <div
            className={`border-l border-t border-line p-4 ${row.strong ? "font-medium" : ""}`}
          >
            {row.after}
          </div>
        </div>
      ))}
    </div>
  );
}
