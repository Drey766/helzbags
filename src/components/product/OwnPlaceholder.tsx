import { Logo } from "@/components/brand/Logo";

/**
 * Designed placeholder for Heiz Bags' own bags until photos arrive:
 * primary velvet, a accent wave, the bag name in Cormorant and "Photos coming soon".
 */
export function OwnPlaceholder({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const nameSize = { sm: "text-lg md:text-xl", md: "text-2xl", lg: "text-4xl md:text-5xl" }[size];
  return (
    <div
      role="img"
      aria-label={`${name}, photos coming soon`}
      className={`velvet absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-4 text-center ${size === "sm" ? "pt-16" : ""}`}
    >
      {size !== "sm" && <Logo variant="mark" tone="dark" decorative className={size === "lg" ? "h-24 w-24" : "h-14 w-14"} />}
      <p className={`display mt-4 italic leading-tight text-accent-light ${nameSize}`}>{name}</p>
      <p className="eyebrow mt-2 text-muted-on-dark">Photos coming soon</p>
      <svg
        aria-hidden="true"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className={`absolute inset-x-0 h-10 w-full opacity-90 ${size === "sm" ? "bottom-[3%]" : "bottom-[12%]"}`}
      >
        <path d="M0,36 C80,10 160,12 220,30 C290,50 340,52 400,24 L400,30 C340,60 290,58 220,38 C160,20 80,20 0,44 Z" fill="var(--hz-accent)" />
        <path d="M0,26 C90,0 170,4 230,22 C300,42 350,44 400,16" fill="none" stroke="var(--hz-accent-light)" strokeWidth="1" opacity=".7" />
      </svg>
    </div>
  );
}
