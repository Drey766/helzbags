type Props = {
  children: React.ReactNode;
  /** colour of the floating handle line */
  handle?: "gold" | "plum";
  className?: string;
  frameClassName?: string;
  /** "tile": 999px arch; "soft": 50% top radius for wide tiles */
  shape?: "tile" | "soft";
};

/**
 * Signature frame: an arched top (like a bag's body) with a thin handle arc floating above.
 * The handle lifts 4px on hover/focus of any ancestor with `.arch-group`.
 */
export function HandleArch({ children, handle = "gold", className = "", frameClassName = "", shape = "tile" }: Props) {
  const stroke = handle === "gold" ? "var(--zb-gold)" : "var(--zb-plum)";
  return (
    <div className={`relative pt-[14%] ${className}`}>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="arch-handle pointer-events-none absolute left-1/2 top-0 h-[18%] w-[46%] -translate-x-1/2 overflow-visible"
      >
        <path
          d="M8,40 C8,6 92,6 92,40"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="8" cy="39" r="1.6" fill={stroke} />
        <circle cx="92" cy="39" r="1.6" fill={stroke} />
      </svg>
      <div
        className={`relative overflow-hidden ${frameClassName}`}
        style={{ borderRadius: shape === "tile" ? "var(--radius-arch)" : "50% 50% 16px 16px / 34% 34% 16px 16px", isolation: "isolate" }}
      >
        {children}
      </div>
    </div>
  );
}
