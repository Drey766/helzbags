import { brand } from "@/config/brand";

/**
 * Schematic map of the pick-up point: Tom Mboya Street as one accent line, the Dynamic Mall
 * pin on one side and Ambassadeur Hotel opposite (their own landmark). Labelled "Not to scale".
 */
export function CbdMap({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const shop = brand.shops[0];
  const dark = tone === "dark";
  const labelFill = dark ? "var(--hz-surface)" : "var(--hz-ink)";
  const subFill = dark ? "var(--hz-muted-on-dark)" : "var(--hz-muted)";
  const streetFill = dark ? "var(--hz-accent-light)" : "var(--hz-accent-text)";
  const pin = { x: 196, y: 150 };
  const hotel = { x: 300, y: 172 };

  return (
    <figure className={className}>
      <svg viewBox="0 0 480 340" role="img" aria-labelledby="cbd-map-title cbd-map-desc" className="h-auto w-full">
        <title id="cbd-map-title">{`Schematic map of the ${brand.name} pick-up point`}</title>
        <desc id="cbd-map-desc">
          {`${shop.mall}, ${shop.floor}, ${shop.unit}, on ${shop.street}, ${shop.landmark.toLowerCase()}. Not to scale.`}
        </desc>
        {/* faint street grid */}
        <g stroke={dark ? "var(--hz-muted-on-dark)" : "var(--hz-line)"} strokeWidth="1" opacity={dark ? 0.16 : 0.9}>
          {[60, 120, 180, 240, 300].map((y) => (
            <line key={`h${y}`} x1="20" y1={y} x2="460" y2={y - 30} />
          ))}
          {[80, 160, 260, 360, 430].map((x) => (
            <line key={`v${x}`} x1={x} y1="20" x2={x + 40} y2="320" />
          ))}
        </g>
        {/* Tom Mboya Street */}
        <path d="M96,318 C170,240 290,120 404,30" fill="none" stroke="var(--hz-accent)" strokeWidth="6" strokeLinecap="round" />
        <text x="150" y="306" fill={streetFill} fontSize="13" letterSpacing="2" transform="rotate(-43 150 306)" fontFamily="var(--font-sans)">
          {shop.street.toUpperCase()}
        </text>

        {/* Landmark opposite */}
        <g>
          <rect x={hotel.x - 9} y={hotel.y - 9} width="18" height="18" rx="3" fill="none" stroke={subFill} strokeWidth="1.5" />
          <text x={hotel.x + 18} y={hotel.y + 5} fill={subFill} fontSize="13" fontFamily="var(--font-sans)" letterSpacing="1">
            Ambassadeur Hotel
          </text>
        </g>

        {/* Pick-up point */}
        <g>
          <circle cx={pin.x} cy={pin.y} r="18" fill={dark ? "var(--hz-surface)" : "var(--hz-primary)"} opacity=".14" />
          <path
            d={`M${pin.x},${pin.y + 2} c-8,-9 -13,-15 -13,-22 a13,13 0 1 1 26,0 c0,7 -5,13 -13,22 z`}
            fill="var(--hz-primary)"
            stroke={dark ? "var(--hz-accent-light)" : "var(--hz-surface)"}
            strokeWidth="1.5"
          />
          <circle cx={pin.x} cy={pin.y - 20} r="4" fill="var(--hz-accent)" />
          <text x={pin.x - 26} y={pin.y - 30} textAnchor="end" fill={labelFill} fontSize="19" fontFamily="var(--font-display)" fontWeight="600">
            {shop.mall}
          </text>
          <text x={pin.x - 26} y={pin.y - 12} textAnchor="end" fill={subFill} fontSize="12" fontFamily="var(--font-sans)" letterSpacing="1.5">
            {`${shop.floor} · ${shop.unit}`}
          </text>
        </g>
      </svg>
      <figcaption className={`mt-2 text-xs tracking-wide ${dark ? "text-muted-on-dark" : "text-muted"}`}>
        Not to scale. Use Get directions for the exact location.
      </figcaption>
    </figure>
  );
}
