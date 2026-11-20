import { brand, siteUrl } from "@/config/brand";
import { formatKes } from "@/lib/format";
import type { Product } from "@/types";

export function waUrl(text?: string): string {
  const base = `https://wa.me/${brand.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telUrl(): string {
  return `tel:${brand.phoneTel}`;
}

export function productUrl(p: Pick<Product, "slug">): string {
  return `${siteUrl}/shop/${p.slug}`;
}

/** "Hello Heiz Bags, I'd like to order this bag: HW Mini-Handbag (KES 2,200) <link> Is it available?" */
export function productOrderMessage(p: Product): string {
  return [
    `Hello ${brand.name}, I'd like to order this bag:`,
    `${p.name} (${formatKes(p.priceKes)})`,
    productUrl(p),
    "Is it available?",
  ].join("\n");
}

export function productEnquiryMessage(p: Product): string {
  return [`Hello ${brand.name}, I have a question about this bag:`, `${p.name}`, productUrl(p)].join("\n");
}

export function generalMessage(): string {
  return `Hello ${brand.name}, I'd like to ask about your bags.`;
}

export type BasketItemForMessage = { product: Product; qty: number };

export type Fulfilment =
  | { kind: "pickup"; shopLabel: string }
  | { kind: "delivery"; area: string };

export function basketTotal(items: BasketItemForMessage[]): number {
  return items.reduce((sum, i) => sum + i.product.priceKes * i.qty, 0);
}

export function basketOrderMessage(
  items: BasketItemForMessage[],
  fulfilment: Fulfilment,
  name?: string,
): string {
  const lines: string[] = [`Hello ${brand.name}, I'd like to order:`, ""];
  items.forEach((i, n) => {
    const lineTotal = i.product.priceKes * i.qty;
    lines.push(
      `${n + 1}. ${i.product.name} × ${i.qty} @ ${formatKes(i.product.priceKes)} = ${formatKes(lineTotal)}`,
    );
    lines.push(`   ${productUrl(i.product)}`);
  });
  lines.push("", `Subtotal: ${formatKes(basketTotal(items))}`, "");
  if (fulfilment.kind === "pickup") {
    lines.push(`Pickup at: ${fulfilment.shopLabel}`);
  } else {
    const area = fulfilment.area.trim();
    lines.push(`Delivery, please advise${area ? ` (area: ${area})` : ""}`);
  }
  const n = name?.trim();
  if (n) lines.push(`Name: ${n}`);
  lines.push("", "Please confirm availability.");
  return lines.join("\n");
}

export function wishlistMessage(products: Product[]): string {
  return [
    `Hello ${brand.name}, these are the bags I like:`,
    "",
    ...products.map((p) => `- ${p.name} (${formatKes(p.priceKes)}) ${productUrl(p)}`),
  ].join("\n");
}

export function contactMessage(opts: { name?: string; message?: string; bag?: string }): string {
  const lines = [`Hello ${brand.name},`];
  if (opts.message?.trim()) lines.push(opts.message.trim());
  if (opts.bag?.trim()) lines.push(`Bag: ${opts.bag.trim()}`);
  if (opts.name?.trim()) lines.push(`Name: ${opts.name.trim()}`);
  return lines.join("\n");
}
