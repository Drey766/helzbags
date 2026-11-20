// Sanity checks for the Bag Finder. Run: node --experimental-strip-types --import ./scripts/register-alias.mjs scripts/check-finder.ts
import { findBags } from "@/lib/finder";

let failed = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
  if (!ok) failed++;
}

const laptop = findBags({ occasion: "work", carryItems: "laptop", carry: "any", budget: "any" });
check("Work + laptop returns results", laptop.length > 0, laptop.map((r) => r.product.name).join(", "));
check("Work + laptop: every bag fits a laptop", laptop.every((r) => r.product.fits.some((f) => f === "laptop" || f === "laptop-14")));

const evening = findBags({ occasion: "evening", carryItems: "essentials", carry: "any", budget: "any" });
const top = evening.slice(0, 3).map((r) => r.product);
check("Evening + essentials returns results", evening.length > 0, evening.slice(0, 5).map((r) => `${r.product.name}[${r.product.category}/${r.product.size}]`).join(", "));
check("Evening + essentials: clutches/small bags first", top.every((p) => p.category === "clutches" || p.size === "small"));

const baby = findBags({ occasion: "travel", carryItems: "baby", carry: "back", budget: "any" });
check("Baby things: only bottle/mum bags", baby.length > 0 && baby.every((r) => r.product.fits.includes("bottles") || r.product.idealFor.includes("mum")));

const budget = findBags({ occasion: "everyday", carryItems: "everything", carry: "shoulder", budget: "5-10" });
check("Budget 5–10k respected", budget.every((r) => r.product.priceKes >= 5000 && r.product.priceKes <= 10000), budget.map((r) => r.product.priceKes).join(","));

const reasons = laptop.flatMap((r) => r.reasons);
check("No scores or 'perfect match' in reasons", !reasons.some((x) => /perfect|match|score|%/i.test(x)), reasons.slice(0, 4).join(" | "));

process.exit(failed ? 1 : 0);
