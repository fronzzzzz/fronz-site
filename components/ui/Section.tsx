/**
 * Section wrapper — consistent rhythm + the editorial container.
 * Optional `sink` flag alternates the background for magazine pacing.
 */
export function Section({
  id,
  children,
  sink = false,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  sink?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${sink ? "bg-paper-sink" : ""} scroll-mt-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
        {children}
      </div>
    </section>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker mb-5">{children}</p>;
}
