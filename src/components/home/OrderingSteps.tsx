import Link from "next/link";
import { MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import steps from "@/data/steps.json";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { SectionHeading } from "./SectionHeading";

const icons = [ShoppingBag, MessageCircle, MapPin];

export function OrderingSteps({ compact }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "section bg-surface-alt"} aria-labelledby="steps-title">
      <div className="container-hz">
        {!compact && (
          <SectionHeading
            title={
              <span id="steps-title">
                {steps.title} <DraftBadge />
              </span>
            }
            intro={steps.intro}
            action={
              <Link href="/how-to-order" className="btn btn-outline btn-sm">
                How to order
              </Link>
            }
          />
        )}
        <ol className={`grid gap-8 md:grid-cols-3 md:gap-10 ${compact ? "" : "mt-12"}`}>
          {steps.steps.map((s, i) => {
            const Icon = icons[i] ?? ShoppingBag;
            return (
              <li key={s.key} className="relative">
                <div className="flex items-center gap-4">
                  <span className="display tabular text-5xl leading-none text-accent-text">{i + 1}</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-accent-light">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="display mt-5 text-2xl text-primary">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
