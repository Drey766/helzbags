import { GoldWave } from "@/components/brand/GoldWave";

/** Black page header used by content pages. */
export function PageHero({ title, intro, children }: { title: React.ReactNode; intro?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="velvet" data-tone="dark">
      <div className="container-hz pb-4 pt-12 md:pt-16">
        <h1 className="display h-hero max-w-3xl text-surface">{title}</h1>
        {intro && <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-on-dark">{intro}</p>}
        {children}
      </div>
      <GoldWave tone="primary" height={56} />
    </section>
  );
}
