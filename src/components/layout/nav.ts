export const mainNav = [
  { href: "/shop", label: "Shop" },
  { href: "/bag-finder", label: "Bag Finder" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/visit", label: "Find us" },
] as const;

export const footerNav = {
  shop: [
    { href: "/shop", label: "All bags" },
    { href: "/shop?isNew=1", label: "New in" },
    { href: "/bag-finder", label: "Bag Finder" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/basket", label: "Basket" },
  ],
  help: [
    { href: "/how-to-order", label: "How to order" },
    { href: "/faqs", label: "FAQs" },
    { href: "/visit", label: "Find us" },
    { href: "/contact", label: "Contact" },
  ],
  about: [
    { href: "/about", label: "About Heiz Bags" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
