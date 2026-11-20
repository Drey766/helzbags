import { brand } from "@/config/brand";

/**
 * Schematic map of Nairobi CBD: Moi Avenue and Tom Mboya Street as two gold lines,
 * one plum pin per shop. Labelled "Not to scale". Positions are illustrative only.
 */
export function CbdMap({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const pins: Record<string, { x: number; y: number; lx: number; ly: number; anchor: "start" | "end" }> = {
    sasa: { x: 176, y: 118, lx: 148, ly: 112, anchor: "end" },
    sawa: { x: 202, y: 214, lx: 172, ly: 208, anchor: "end" },
    star: { x: 318, y: 176, lx: 288, ly: 168, anchor: "end" },
  };
  const dark = tone === "dark";
  const labelFill = dark ? "var(--zb-ivory)" : "var(--zb-ink)";
  const subFill = dark ? "var(--zb-lilac-text)" : "var(--zb-muted)";
  const streetFill = dark ? "var(--zb-gold-light)" : "var(--zb-gold-text)";

  return (
    <figure className={className}>
      <svg viewBox="0 0 480 340" role="img" aria-labelledby="cbd-map-title cbd-map-desc" className="h-auto w-full">
        <title id="cbd-map-title">Schematic map of Zuri Bags shops in Nairobi CBD</title>
        <desc id="cbd-map-desc">
          {brand.shops.map((s) => `${s.mall} ${s.unit} on ${s.street}`).join("; ")}. Not to scale.
        </desc>
        {/* faint street grid */}
        <g stroke={dark ? "var(--zb-lilac-text)" : "var(--zb-line)"} strokeWidth="1" opacity={dark ? 0.16 : 0.9}>
          {[60, 120, 180, 240, 300].map((y) => (
            <line key={`h${y}`} x1="20" y1={y} x2="460" y2={y - 30} />
          ))}
          {[80, 160, 260, 360, 430].map((x) => (
            <line key={`v${x}`} x1={x} y1="20" x2={x + 40} y2="320" />
          ))}
        </g>
        {/* Moi Avenue */}
        <path d="M150,24 C170,110 190,200 214,318" fill="none" stroke="var(--zb-gold)" strokeWidth="5" strokeLinecap="round" />
        {/* Tom Mboya Street */}
        <path d="M232,310 C262,230 300,150 380,40" fill="none" stroke="var(--zb-gold)" strokeWidth="5" strokeLinecap="round" />
        <text x="120" y="300" fill={streetFill} fontSize="13" letterSpacing="2" transform="rotate(-78 120 300)" fontFamily="var(--font-sans)">
          MOI AVENUE
        </text>
        <text x="330" y="270" fill={streetFill} fontSize="13" letterSpacing="2" transform="rotate(-56 330 270)" fontFamily="var(--font-sans)">
          TOM MBOYA STREET
        </text>
        {brand.shops.map((s) => {
          const p = pins[s.key];
          if (!p) return null;
          return (
            <g key={s.key}>
              <circle cx={p.x} cy={p.y} r="15" fill={dark ? "var(--zb-ivory)" : "var(--zb-plum)"} opacity=".14" />
              <path
                d={`M${p.x},${p.y + 2} c-7,-8 -11,-13 -11,-19 a11,11 0 1 1 22,0 c0,6 -4,11 -11,19 z`}
                fill="var(--zb-plum)"
                stroke={dark ? "var(--zb-gold-light)" : "var(--zb-ivory)"}
                strokeWidth="1.5"
              />
              <circle cx={p.x} cy={p.y - 17} r="3.5" fill="var(--zb-gold)" />
              <text x={p.lx} y={p.ly - 14} textAnchor={p.anchor} fill={labelFill} fontSize="17" fontFamily="var(--font-display)" fontWeight="600">
                {s.mall}
              </text>
              <text x={p.lx} y={p.ly + 4} textAnchor={p.anchor} fill={subFill} fontSize="12" fontFamily="var(--font-sans)" letterSpacing="1.5">
                {s.unit}
              </text>
            </g>
          );
        })}
        <g>
          <path d="M440,300 v-26 m0,0 l-6,10 m6,-10 l6,10" stroke={subFill} strokeWidth="1.5" fill="none" />
          <text x="440" y="318" textAnchor="middle" fill={subFill} fontSize="11" fontFamily="var(--font-sans)">
            N
          </text>
        </g>
      </svg>
      <figcaption className={`mt-2 text-xs tracking-wide ${dark ? "text-lilac-text" : "text-muted"}`}>
        Not to scale. Use Get directions for the exact location.
      </figcaption>
    </figure>
  );
}
