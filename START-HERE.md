# Heiz Bags: Claude Code kit

The site is built and was rebranded to Heiz Bags on 2026-11-20. Claude commits after each change set and notes it in `docs/PROGRESS.md`.

```
CLAUDE.md                     always-loaded rules, guardrails, design essentials
docs/BRIEF.md                 full spec: "Gilded Noir" design, personality mandate, pages, data
docs/PHASES.md                how the site was built (9 phases)
docs/PROGRESS.md              progress log + open questions for Heiz Bags
src/data/products.json        29 bags: HZ-001 HW Mini-Handbag (KES 2,200) and HZ-002 Heiz Laptop Handbag (KES 2,800) are theirs, plus 27 samples
data-raw/bag-notes.json       source text for rewriting samples (git-ignored, never shipped)
assets/                       HB monogram traced as SVG, gold wave, original logo
scripts/prepare-assets.mjs    favicon, Apple icon, share image
rebrand/                      rebrand brief, tools and REPORT.md
.claude/                      pre-approved build commands + content audit
```

## Continue work (VS Code)
In the Claude Code panel, with the mode on **Auto**:
```
Read CLAUDE.md and docs/PROGRESS.md, then <what you want changed>.
```

## Important: most of the bags are samples
The two bags from Heiz Bags' posts have no photos yet: they show a designed placeholder until you drop photos into `public/products/hz-001/` and `public/products/hz-002/` and list them in `products.json`. The other 27 bags, photos and prices come from another shop, renamed and rewritten, and are labelled "Sample price". While `NEXT_PUBLIC_DEMO_MODE=true`, the site says so, tags those bags "Sample", hides the source and isn't indexed by Google. That shop's initials are also "HB", so swap in Heiz Bags' real bags before launch and turn demo mode off.

## Good to know
- Confirmed details: phone/WhatsApp 0113 846 224, the pick-up point at Dynamic Mall, 5th floor, Shop ML 220, Tom Mboya Street (opposite Ambassadeur Hotel), and "Deliveries are done countrywide at a small fee."
- No M-Pesa Till, policy, Instagram handle, email or opening hours were given. Those are hidden and listed in the README checklist.
