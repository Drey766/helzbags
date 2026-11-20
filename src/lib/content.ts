import { brand, shopLabel } from "@/config/brand";

/** Fill {tokens} in drafted copy from brand.ts, so contacts and policy wording live in one place. */
export function fillTokens(text: string): string {
  const map: Record<string, string> = {
    till: brand.mpesaTill,
    phone: brand.phoneDisplay,
    refunds: brand.policy.refunds,
    exchange: brand.policy.exchange,
    policyHelp: brand.policyHelp,
    shops: brand.shops.map(shopLabel).join("; "),
    name: brand.name,
  };
  return text.replace(/\{(\w+)\}/g, (m, k: string) => map[k] ?? m);
}
