type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, intro, tone = "light", align = "left", className = "", action, as: H = "h2" }: Props) {
  const dark = tone === "dark";
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-6 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"} ${className}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow flex items-center gap-3 ${center ? "justify-center" : ""} ${dark ? "text-gold" : "text-gold-text"}`}>
            <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-gold" : "bg-gold-text"}`} />
            {eyebrow}
            {center && <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-gold" : "bg-gold-text"}`} />}
          </p>
        )}
        <H className={`display h-section mt-3 ${dark ? "text-ivory" : "text-plum"}`}>{title}</H>
        {intro && <p className={`mt-4 text-[1.05rem] leading-relaxed ${dark ? "text-lilac-text" : "text-muted"}`}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
