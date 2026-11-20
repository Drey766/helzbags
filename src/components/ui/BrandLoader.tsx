/**
 * Loading state in Zuri's own shapes: the bag's handle draws itself and a gold line
 * sweeps beneath it. Static when reduced motion is on.
 */
export function BrandLoader({ label = "Loading", className = "", size = "md" }: { label?: string; className?: string; size?: "sm" | "md" }) {
  const w = size === "sm" ? 56 : 76;
  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <svg width={w} height={w * 1.1} viewBox="0 0 100 110" aria-hidden="true" focusable="false">
        {/* body: plum and pale-gold side panels with the gold front, as in the logo */}
        <path d="M14,40 H24 L16,100 H4 Z" fill="var(--zb-plum)" />
        <path d="M27,41 L36,40 L34,100 H20 Z" fill="var(--zb-gold-light)" />
        <path d="M38,40 H92 L91,60 C89,70 75,73 68,80 C61,87 58,94 58,100 H35 Z" fill="var(--zb-gold)" opacity=".9" />
        {/* handle, drawn on a loop */}
        <path
          className="zb-loader-handle"
          d="M44,41 V32 A18,18 0 0 1 80,32 V41"
          fill="none"
          stroke="var(--zb-plum)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </svg>
      <span aria-hidden="true" className="block h-px w-24 overflow-hidden">
        <span className="zb-loader-line block h-px w-full bg-gradient-to-r from-gold-deep via-gold-light to-gold" />
      </span>
      <span className="eyebrow text-gold-text">{label}</span>
    </div>
  );
}
