"use client";

import { useState } from "react";
import { Check, Copy, Smartphone } from "lucide-react";
import { brand, hasTill } from "@/config/brand";

type Props = { className?: string; compact?: boolean };

const steps = ["Lipa na M-Pesa", "Buy Goods and Services", `Till number ${brand.mpesaTill}`, "Enter the amount", "Enter your PIN"];

/**
 * "Pay via M-Pesa · Till <number>" with a copy button and steps. An instruction, not an integration.
 * Renders nothing until the client gives a Till number.
 */
export function TillCard({ className = "", compact }: Props) {
  const [copied, setCopied] = useState(false);
  if (!hasTill) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(brand.mpesaTill);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-white ${className}`}>
      <div aria-hidden="true" className="absolute inset-y-0 left-0 flex">
        <span className="w-[5px] bg-primary" />
        <span className="ml-[3px] w-[3px] bg-accent-light" />
      </div>
      <div className="p-5 pl-7 sm:p-6 sm:pl-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-surface-soft text-primary">
              <Smartphone aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="eyebrow text-muted">Pay via M-Pesa</p>
              <p className="display tabular text-2xl text-primary">
                Till <span className="font-semibold tracking-wide">{brand.mpesaTill}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={copy}
            className="btn btn-outline btn-sm"
            aria-label={copied ? "Till number copied" : `Copy Till number ${brand.mpesaTill}`}
          >
            {copied ? (
              <Check aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Copy aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {!compact && (
          <ol className="mt-5 grid gap-2 text-sm text-ink sm:grid-cols-5 sm:gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-2 sm:flex-col sm:gap-1">
                <span className="tabular eyebrow text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-4 text-sm text-muted">
          Send your order on WhatsApp first so {brand.name} can confirm availability.
        </p>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Till number copied" : ""}
      </span>
    </div>
  );
}
