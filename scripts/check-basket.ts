// Checks the basket WhatsApp message. Run: node --experimental-strip-types --import ./scripts/register-alias.mjs scripts/check-basket.ts
import { basketOrderMessage, basketTotal } from "@/lib/whatsapp";
import { getProducts } from "@/lib/products";

const ps = getProducts();
const items = [
  { product: ps.find((p) => p.id === "ZB-001")!, qty: 2 },
  { product: ps.find((p) => p.id === "ZB-002")!, qty: 1 },
];
const msg = basketOrderMessage(items, { kind: "pickup", shopLabel: "Sawa Mall, G12, Moi Avenue" }, "Wanjiru");
console.log(msg);
const checks: [string, boolean][] = [
  ["line 1 qty and line total", msg.includes("Chrisbella Handbag × 2 @ KES 5,300 = KES 10,600")],
  ["line 2 qty and line total", msg.includes("× 1 @ KES 4,500 = KES 4,500")],
  ["subtotal", msg.includes("Subtotal: KES 15,100") && basketTotal(items) === 15100],
  ["pickup", msg.includes("Pickup at: Sawa Mall, G12, Moi Avenue")],
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
