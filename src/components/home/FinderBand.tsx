import Link from "next/link";
import { finderConfig } from "@/lib/finder";
import { DraftBadge } from "@/components/ui/DraftBadge";

/** Black band with the Bag Finder's first question inline. Each answer opens /bag-finder at step 2. */
export function FinderBand() {
  const first = finderConfig.questions[0];
  return (
    <section className="velvet relative overflow-hidden" data-tone="dark" aria-labelledby="finder-band-title">
      <div className="container-hz grid items-center gap-10 py-20 md:grid-cols-[1fr_1.3fr] md:py-28">
        <div className="relative">
          <h2 id="finder-band-title" className="display h-section text-surface">
            Not sure which bag? <em className="text-accent-light">Ask the Bag Finder</em>.
          </h2>
          <p className="mt-4 max-w-md text-muted-on-dark">
            {finderConfig.intro} <DraftBadge />
          </p>
        </div>
        <div className="rounded-[28px] border border-accent/30 bg-primary-deep/40 p-6 md:p-10">
          <p className="text-sm text-muted-on-dark">Question 1 of 4</p>
          <p className="display mt-2 text-3xl text-surface md:text-4xl">{first.label}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {first.answers.map((a) => (
              <li key={a.key}>
                <Link
                  href={`/bag-finder?${first.key}=${a.key}`}
                  className="inline-flex min-h-12 items-center rounded-full border border-accent/60 px-5 text-surface transition-colors hover:border-accent hover:bg-accent hover:text-primary"
                >
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
