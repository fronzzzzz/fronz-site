/**
 * Tier price display that adapts to the three price shapes:
 * - "$1,500"        -> big mono figure (unchanged)
 * - "from $7,500"   -> small mono "from" label + big mono figure
 * - "Custom scope"  -> serif statement, not a fake number
 */
export function TierPrice({
  price,
  featured = false,
  className = "",
}: {
  price: string;
  featured?: boolean;
  className?: string;
}) {
  const accent = featured ? "text-marker" : "text-chartreuse-deep";

  if (!/\d/.test(price)) {
    return (
      <p className={`font-serif text-3xl leading-tight ${className}`}>
        {price}
      </p>
    );
  }

  const from = price.match(/^from\s+(.*)$/i);
  if (from) {
    return (
      <p className={`flex items-baseline gap-2.5 ${className}`}>
        <span
          className={`font-mono text-xs uppercase tracking-widest ${accent}`}
        >
          from
        </span>
        <span className="font-mono text-4xl">{from[1]}</span>
      </p>
    );
  }

  return <p className={`font-mono text-4xl ${className}`}>{price}</p>;
}
