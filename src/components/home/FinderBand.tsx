import Link from "next/link";
import { finderConfig } from "@/lib/finder";
import { DraftBadge } from "@/components/ui/DraftBadge";

/** Plum band with the Bag Finder's first question inline. Each answer opens /bag-finder at step 2. */
export function FinderBand() {
  const first = finderConfig.questions[0];
  return (
    <section className="velvet relative overflow-hidden" data-tone="dark" aria-labelledby="finder-band-title">
      <div className="container-zb grid items-center gap-10 py-20 md:grid-cols-[1fr_1.3fr] md:py-28">
        <div className="relative">
          <h2 id="finder-band-title" className="display h-section text-ivory">
            Not sure which bag? <em className="text-gold-light">Ask the Bag Finder</em>.
          </h2>
          <p className="mt-4 max-w-md text-lilac-text">
            {finderConfig.intro} <DraftBadge />
          </p>
        </div>
        <div className="rounded-[28px] border border-gold/30 bg-plum-deep/40 p-6 md:p-10">
          <p className="text-sm text-lilac-text">Question 1 of 4</p>
          <p className="display mt-2 text-3xl text-ivory md:text-4xl">{first.label}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {first.answers.map((a) => (
              <li key={a.key}>
                <Link
                  href={`/bag-finder?${first.key}=${a.key}`}
                  className="inline-flex min-h-12 items-center rounded-full border border-gold/60 px-5 text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-plum"
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
