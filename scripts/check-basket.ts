// Checks the basket WhatsApp message. Run: node --experimental-strip-types --import ./scripts/register-alias.mjs scripts/check-basket.ts
import { basketOrderMessage, basketTotal } from "@/lib/whatsapp";
import { getProducts } from "@/lib/products";

const ps = getProducts();
const items = [
  { product: ps.find((p) => p.id === "HZ-001")!, qty: 2 },
  { product: ps.find((p) => p.id === "HZ-002")!, qty: 1 },
];
const msg = basketOrderMessage(items, { kind: "pickup", shopLabel: "Dynamic Mall, 5th floor, Shop ML 220, Tom Mboya Street" }, "Wanjiru");
console.log(msg);
const checks: [string, boolean][] = [
  ["line 1 qty and line total", msg.includes("HW Mini-Handbag × 2 @ KES 2,200 = KES 4,400")],
  ["line 2 qty and line total", msg.includes("Heiz Laptop Handbag × 1 @ KES 2,800 = KES 2,800")],
  ["subtotal", msg.includes("Subtotal: KES 7,200") && basketTotal(items) === 7200],
  ["pickup", msg.includes("Pickup at: Dynamic Mall, 5th floor, Shop ML 220, Tom Mboya Street")],
  ["name", msg.includes("Name: Wanjiru")],
  ["no false claims", !/placed|paid|confirmed/i.test(msg)],
];
const d = basketOrderMessage(items, { kind: "delivery", area: "Westlands" });
checks.push(["delivery note", d.includes("Delivery, please advise (area: Westlands)")]);
let failed = 0;
for (const [n, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${n}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
