import finder from "@/data/finder.json";
import { getProducts } from "@/lib/products";
import { carryLabels, formatKes } from "@/lib/format";
import type { CarryKey, OccasionKey, Product } from "@/types";

export type FinderAnswer = { key: string; label: string; hint?: string; min?: number; max?: number };
export type FinderQuestion = { key: FinderKey; label: string; answers: FinderAnswer[] };
export type FinderKey = "occasion" | "carryItems" | "carry" | "budget";
export type FinderAnswers = Partial<Record<FinderKey, string>>;

export const finderConfig = finder as unknown as {
  status: string;
  title: string;
  intro: string;
  resultsTitle: string;
  questions: FinderQuestion[];
};

export const finderKeys: FinderKey[] = ["occasion", "carryItems", "carry", "budget"];

export function parseAnswers(get: (k: string) => string | null): FinderAnswers {
  const out: FinderAnswers = {};
  for (const q of finderConfig.questions) {
    const v = get(q.key);
    if (v && q.answers.some((a) => a.key === v)) out[q.key] = v;
  }
  return out;
}

export function isComplete(a: FinderAnswers): boolean {
  return finderKeys.every((k) => !!a[k]);
}

export type FinderResult = { product: Product; reasons: string[]; score: number };

const LAPTOP_FITS = ["laptop", "laptop-14"];

const occasionReason: Record<OccasionKey, string> = {
  work: "Made for work",
  outings: "Made for outings",
  evening: "Made for evenings",
  everyday: "Made for every day",
  travel: "Made for travel",
};

function budgetRange(key?: string) {
  const ans = finderConfig.questions.find((q) => q.key === "budget")?.answers.find((a) => a.key === key);
  return { min: ans?.min, max: ans?.max };
}

/**
 * Bags for your day. Hard requirements: a laptop must fit when the answer is "laptop";
 * files need a4/laptop; baby things need bottles or mum. Everything else ranks.
 * Reasons come only from the product data.
 */
export function findBags(answers: FinderAnswers, products: Product[] = getProducts()): FinderResult[] {
  const occasion = answers.occasion as OccasionKey | undefined;
  const items = answers.carryItems;
  const carry = answers.carry && answers.carry !== "any" ? (answers.carry as CarryKey) : undefined;
  const { min, max } = budgetRange(answers.budget);

  const results: FinderResult[] = [];
  for (const p of products) {
    const reasons: string[] = [];
    let score = 0;

    // Hard filters from "what do you carry"
    if (items === "laptop") {
      if (!p.fits.some((f) => LAPTOP_FITS.includes(f))) continue;
      reasons.push(p.fits.includes("laptop-14") ? "Fits a 14-inch laptop" : "Fits a laptop");
      score += 6;
    } else if (items === "files") {
      if (!p.fits.some((f) => f === "a4" || LAPTOP_FITS.includes(f))) continue;
      reasons.push(p.fits.includes("a4") ? "Takes A4 files" : "Room for a laptop and papers");
      score += 6;
    } else if (items === "baby") {
      if (!(p.fits.includes("bottles") || p.idealFor.includes("mum"))) continue;
      reasons.push(p.fits.includes("bottles") ? "Has space for bottles" : "Made for mums on the move");
      score += 6;
    } else if (items === "essentials") {
      if (p.size === "small") {
        reasons.push("Small, for the essentials");
        score += 4;
      } else if (p.size === "medium") score += 1;
      else if (p.size === "large") score -= 2;
      if (p.category === "pouches") score -= 3;
    } else if (items === "everything") {
      if (p.size === "large") {
        reasons.push("Large and roomy");
        score += 4;
      } else if (p.size === "medium") score += 2;
      else if (p.size === "small") score -= 3;
    }

    // Budget is a hard filter when chosen
    if (min != null && p.priceKes < min) continue;
    if (max != null && p.priceKes > max) continue;
    if (min != null || max != null) reasons.push(`Within budget at ${formatKes(p.priceKes)}`);

    // Occasion ranks strongly
    if (occasion) {
      if (p.occasions.includes(occasion) || p.idealFor.includes(occasion)) {
        score += 5;
        reasons.unshift(occasionReason[occasion]);
      } else {
        score -= 4;
      }
      if (occasion === "evening" && p.category === "clutches") score += 3;
    }

    // Carry preference ranks
    if (carry) {
      if (p.carry.includes(carry)) {
        score += 3;
        reasons.push(carry === "crossbody" ? "Worn crossbody" : carryLabels[carry]);
      } else if (p.carry.length) {
        score -= 2;
      }
    }

    if (p.status === "own") score += 1;
    results.push({ product: p, reasons: Array.from(new Set(reasons)).slice(0, 3), score });
  }

  return results
    .filter((r) => r.score > 0 || !occasion)
    .sort((a, b) => b.score - a.score || a.product.priceKes - b.product.priceKes);
}

export function answersToQuery(a: FinderAnswers): string {
  const sp = new URLSearchParams();
  for (const k of finderKeys) if (a[k]) sp.set(k, a[k]!);
  return sp.toString();
}
