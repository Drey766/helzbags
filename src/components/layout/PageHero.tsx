import { GoldWave } from "@/components/brand/GoldWave";

/** Plum page header used by content pages. */
export function PageHero({ title, intro, children }: { title: React.ReactNode; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="velvet" data-tone="dark">
      <div className="container-zb pb-4 pt-12 md:pt-16">
        <h1 className="display h-hero max-w-3xl text-ivory">{title}</h1>
        {intro && <p className="mt-4 max-w-xl text-lg leading-relaxed text-lilac-text">{intro}</p>}
        {children}
      </div>
      <GoldWave tone="plum" height={56} />
    </section>
  );
}
