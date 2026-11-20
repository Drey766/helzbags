const kes = new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 });

/** 5300 → "KES 5,300" */
export function formatKes(amount: number): string {
  return `KES ${kes.format(amount)}`;
}

export function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const carryLabels: Record<string, string> = {
  hand: "By hand",
  shoulder: "On the shoulder",
  crossbody: "Crossbody",
  wrist: "On the wrist",
  back: "On the back",
};

export const sizeLabels: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

export const fitLabels: Record<string, string> = {
  phone: "Phone",
  wallet: "Wallet",
  keys: "Keys",
  cards: "Cards",
  coins: "Coins",
  notes: "Notes",
  a4: "A4 files",
  laptop: "Laptop",
  "laptop-14": "14-inch laptop",
  "make-up": "Make-up",
  toiletries: "Toiletries",
  bottles: "Bottles",
};
