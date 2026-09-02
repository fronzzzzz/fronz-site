"use client";

export function PrintPdfLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden underline decoration-chartreuse-deep decoration-2 underline-offset-[5px] transition-colors hover:text-ink"
    >
      {children}
    </button>
  );
}
