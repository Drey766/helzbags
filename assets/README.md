# Brand assets

- `logo-original.jpg` (150×150): the logo as Zuri Bags posted it.
- `zuri-logo.svg`: the logo **rebuilt as a vector** from the original (the two-tone shopping bag, "ZURI" and "bags"). Colours come from CSS variables `--logo-purple`, `--logo-gold`, `--logo-gold-light` and `--logo-gold-deep`. On plum backgrounds set `--logo-purple` to the ivory colour so the purple parts stay visible.
- `zuri-mark.svg`: the bag alone (favicon, small spaces, image fallbacks).
- `gold-wave.svg`: the gold ribbon from the bottom of their logo artwork, for section dividers. Colours from `--wave-deep`, `--wave-gold`, `--wave-light`; the two thin lines have class `zw-line` for the draw-in animation.

The SVGs contain gradients with fixed ids (`zb-panel`, `zb-word`, `zb-script`, `zw-gold`). When inlined more than once on a page, prefix the ids per instance.

`node scripts/prepare-assets.mjs` copies these into `public/brand/` and makes the favicon, Apple icon, a 512px icon and the share image (logo on ivory, "Carry elegance. Carry confidence." on plum, gold wave).

**Ask Zuri Bags for their original logo file** (vector or a large PNG) and photos of their bags, and replace these files when they arrive.
