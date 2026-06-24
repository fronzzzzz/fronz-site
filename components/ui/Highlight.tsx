/**
 * The signature device: a hand-roughened highlighter swipe behind a phrase.
 * Literally makes the words legible — the brand idea, made visual. Use sparingly:
 * one highlight per view, on the phrase that matters.
 */
export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block isolate">
      <svg
        aria-hidden="true"
        className="absolute inset-x-[-3%] bottom-[2%] -z-10 h-[68%] w-[106%]"
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
      >
        <path
          d="M3 14 C 32 8, 64 9, 102 10 C 142 11, 176 7, 197 13 C 200 20, 199 28, 195 32 C 158 36, 110 33, 70 33 C 44 33, 18 36, 6 31 C 1 26, 1 18, 3 14 Z"
          fill="var(--marker)"
          opacity="0.85"
        />
      </svg>
      {children}
    </span>
  );
}
