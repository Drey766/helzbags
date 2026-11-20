# Brand assets

- `logo-original.jpg` (240×240): the logo as Heiz Bags shared it (gold "HB" script monogram and "Heiz_bags" on black).
- `heiz-mark.svg`: the **HB monogram traced as a vector** from that small raster (interim: replace it with the client's own vector file when they send one). The site inlines the same path from `src/components/brand/monogram.ts` and fills it with a gold gradient from CSS variables (`--logo-gold-light`, `--logo-gold`, `--logo-gold-deep`); the wordmark beside it is live text.
- `gold-wave.svg`: the gold ribbon used as a section divider. Colours from `--wave-deep`, `--wave-gold`, `--wave-light`; the two thin lines have class `wave-line` for the draw-in animation.

`node scripts/prepare-assets.mjs` copies the wave and original logo into `public/brand/` and renders the favicon, Apple icon, a 512px icon and the share image (gold monogram on black, "HEIZ BAGS" and their bio line) into `public/brand/` and `src/app/`.

**Ask Heiz Bags for their original logo file** (vector or a large PNG) and photos of their bags, and replace these files when they arrive.
