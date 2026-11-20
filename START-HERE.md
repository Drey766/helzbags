# Zuri Bags: Claude Code kit (unattended build)

One prompt builds the whole site in 9 phases. Claude commits after each phase and ticks it off in `docs/PROGRESS.md`.

```
CLAUDE.md                     always-loaded rules, guardrails, design essentials
docs/BRIEF.md                 full spec: "Gilded Plum" design, personality mandate, pages, data
docs/PHASES.md                the 9 phases (with screenshot checks if browser tools are installed)
docs/PROGRESS.md              progress log + open questions for Zuri Bags
src/data/products.json        29 bags: ZB-001 Chrisbella (KES 5,300) and ZB-002 (KES 4,500) are theirs, plus 27 samples
data-raw/bag-notes.json       source text for rewriting samples (git-ignored, never shipped)
assets/                       logo rebuilt as SVG, bag mark, gold wave, original logo
scripts/prepare-assets.mjs    favicon, Apple icon, share image
.claude/                      pre-approved build commands + content audit
```

## Steps (VS Code)
1. Unzip into a new folder, for example `E:\code\zuribags` (right-click the zip → **Extract All**).
2. Use **File → Open Folder** to open `zuribags`. Check that `CLAUDE.md`, `docs`, `src`, `assets` and `.claude` are at the top level.
3. In the Claude Code panel, set the mode to **Auto** and paste:
   ```
   Read CLAUDE.md and docs/PROGRESS.md, then build the whole site by running every phase in docs/PHASES.md in order without stopping for approval. Commit and update docs/PROGRESS.md after each phase. Finish with the Phase 9 report.
   ```

## If it stops partway
New conversation, mode still on Auto:
```
Read CLAUDE.md and docs/PROGRESS.md, then continue from the first unticked phase in docs/PHASES.md. Keep running all remaining phases without stopping.
```

## Important: most of the bags are samples
The two bags from Zuri's posts have no photos yet: they show a designed placeholder until you drop photos into `public/products/zb-001/` and `public/products/zb-002/` and list them in `products.json`. Grab them from their Instagram posts. The other 27 bags, photos and prices come from the leather shop you scraped, renamed and rewritten. Their prices (KES 3,650 to 26,000) are higher than Zuri's (4,500 to 5,300), so they are labelled "Sample price". While `NEXT_PUBLIC_DEMO_MODE=true`, the site says so, tags those bags "Sample", hides the source and isn't indexed by Google. Some sample photos may show the other shop's small logo on the leather, so swap in Zuri's real bags before launch and turn demo mode off.

## Good to know
- Confirmed details: phone/WhatsApp 0717 840 894, M-Pesa Till 5242805, the three shops, and "No refund, exchange within 48hrs".
- Sasa Mall G16 is in the bio but not in their recent posts, so it carries a "confirm" flag.
- No Instagram handle, email, opening hours or delivery details were given. Those are hidden and listed in the README checklist.
