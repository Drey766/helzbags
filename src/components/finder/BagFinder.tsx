"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { answersToQuery, finderConfig, finderKeys, findBags, isComplete, parseAnswers, type FinderAnswers } from "@/lib/finder";
import { ProductCard } from "@/components/product/ProductCard";
import { WhatsAppButton } from "@/components/brand/WhatsAppButton";
import { generalMessage } from "@/lib/whatsapp";

export function BagFinder() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const answers = useMemo(() => parseAnswers((k) => sp.get(k)), [sp]);
  const step = finderKeys.findIndex((k) => !answers[k]);
  const done = isComplete(answers);
  const results = useMemo(() => (done ? findBags(answers) : []), [answers, done]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new question or results for keyboard and screen-reader users.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, done]);

  function setAnswer(a: FinderAnswers) {
    const q = answersToQuery(a);
    router.push(`${pathname}${q ? `?${q}` : ""}`, { scroll: false });
  }

  function back() {
    const prevIdx = done ? finderKeys.length - 1 : step - 1;
    if (prevIdx < 0) return;
    const next: FinderAnswers = {};
    finderKeys.slice(0, prevIdx).forEach((k) => (next[k] = answers[k]));
    setAnswer(next);
  }

  const summary = finderConfig.questions
    .filter((q) => answers[q.key])
    .map((q) => ({ q: q.label, a: q.answers.find((x) => x.key === answers[q.key])?.label ?? "" }));

  if (done) {
    return (
      <div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="display h-section text-primary outline-none">
              {finderConfig.resultsTitle}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {summary.map((s) => (
                <li key={s.q} className="rounded-full bg-surface-soft px-3 py-1 text-primary">
                  <span className="sr-only">{s.q}: </span>
                  {s.a}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={back} className="btn btn-outline btn-sm">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              Change budget
            </button>
            <button type="button" onClick={() => setAnswer({})} className="btn btn-outline btn-sm">
              <RotateCcw aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              Start again
            </button>
          </div>
        </div>
        <p className="mt-6 text-muted" aria-live="polite">
          {results.length ? `${results.length} ${results.length === 1 ? "bag" : "bags"} for your day.` : ""}
        </p>
        {results.length ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
            {results.map((r) => (
              <li key={r.product.id}>
                <ProductCard product={r.product} />
                {r.reasons.length > 0 && (
                  <ul className="mt-2 space-y-1 px-1 text-sm text-muted">
                    {r.reasons.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-text" />
                        {x}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[28px] bg-surface-alt px-6 py-12 text-center">
            <p className="display text-3xl text-primary">No bags match all four answers.</p>
            <p className="mt-3 text-muted">Try a different budget, or ask us on WhatsApp what would suit your day.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={back} className="btn btn-outline">
                Change budget
              </button>
              <WhatsAppButton message={generalMessage()} label="Ask on WhatsApp" />
            </div>
          </div>
        )}
        <p className="mt-12 text-center text-sm text-muted">
          Or <Link href="/shop" className="text-primary underline underline-offset-4">browse every bag</Link>.
        </p>
      </div>
    );
  }

  const q = finderConfig.questions[step];
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center gap-3" aria-hidden="true">
        {finderKeys.map((k, i) => (
          <span key={k} className={`h-1 flex-1 rounded-full ${i < step ? "bg-primary" : i === step ? "bg-accent" : "bg-line"}`} />
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">
        Question {step + 1} of {finderKeys.length}
      </p>
      <fieldset className="mt-2">
        <legend className="w-full">
          <h2 ref={headingRef} tabIndex={-1} className="display h-section text-primary outline-none">
            {q.label}
          </h2>
        </legend>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {q.answers.map((a) => (
            <li key={a.key}>
              <button
                type="button"
                onClick={() => setAnswer({ ...answers, [q.key]: a.key })}
                className="group flex min-h-16 w-full items-center justify-between gap-4 rounded-2xl border border-line bg-white px-5 py-4 text-left transition-colors hover:border-primary hover:bg-primary hover:text-surface"
              >
                <span>
                  <span className="display block text-2xl leading-tight">{a.label}</span>
                  {a.hint && <span className="block text-sm text-muted group-hover:text-muted-on-dark">{a.hint}</span>}
                </span>
                <span aria-hidden="true" className="h-3 w-3 rounded-full border border-primary group-hover:border-accent group-hover:bg-accent" />
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
      {step > 0 && (
        <button type="button" onClick={back} className="mt-8 inline-flex min-h-11 items-center gap-2 text-primary underline-offset-4 hover:underline">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          Back
        </button>
      )}
    </div>
  );
}
