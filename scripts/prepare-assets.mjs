// Renders the favicon, Apple icon, 512px icon and share image from the Heiz Bags monogram.
// Run from the project root (sharp is a devDependency):  node scripts/prepare-assets.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const require = createRequire(path.join(root, "package.json"));
const sharp = require("sharp");

const A = (f) => path.join(root, "assets", f);
const out = path.join(root, "public", "brand");
const app = path.join(root, "src", "app");
fs.mkdirSync(out, { recursive: true });

for (const f of ["gold-wave.svg", "logo-original.jpg"]) fs.copyFileSync(A(f), path.join(out, f));

// Asset files only: brand colours mirror src/config/brand.ts (primary, accentLight, accent, accentDeep, surface).
const BLACK = "#181818", GOLD_LIGHT = "#ECCB5B", GOLD = "#CBAC43", GOLD_DEEP = "#8F7425", IVORY = "#FAF8F3";
const MARK_W = 1259, MARK_H = 934;
const d = fs.readFileSync(A("heiz-mark.svg"), "utf8").match(/ d="([^"]+)"/)[1];
const grad = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${GOLD_LIGHT}"/><stop offset=".55" stop-color="${GOLD}"/><stop offset="1" stop-color="${GOLD_DEEP}"/></linearGradient>`;
const mark = (x, y, w) => `<g transform="translate(${x} ${y}) scale(${w / MARK_W})"><path fill="url(#g)" fill-rule="evenodd" d="${d}"/></g>`;

function tile(size, pad) {
  const w = size - 2 * pad;
  const h = (MARK_H * w) / MARK_W;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs>${grad}</defs><rect width="100%" height="100%" fill="${BLACK}"/>${mark(pad, (size - h) / 2, w)}</svg>`,
  );
}

await sharp(tile(256, 30)).png().toFile(path.join(out, "favicon-256.png"));
await sharp(tile(512, 60)).png().toFile(path.join(out, "icon-512.png"));
await sharp(tile(180, 22)).png().toFile(path.join(out, "apple-touch-icon.png"));
fs.copyFileSync(path.join(out, "favicon-256.png"), path.join(app, "icon.png"));
fs.copyFileSync(path.join(out, "apple-touch-icon.png"), path.join(app, "apple-icon.png"));

// Share image 1200x630: black card, gold monogram, letter-spaced name, their bio line.
const W = 1200, H = 630, MW = 460, MH = (MARK_H * MW) / MARK_W;
const og = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>${grad}</defs>
  <rect width="100%" height="100%" fill="${BLACK}"/>
  ${mark((W - MW) / 2, 70, MW)}
  <text x="${W / 2}" y="${90 + MH + 70}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" letter-spacing="16" fill="${GOLD}">HEIZ BAGS</text>
  <text x="${W / 2}" y="${90 + MH + 130}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-style="italic" fill="${IVORY}">Elevate your style with the perfect handbag.</text>
</svg>`);
await sharp(og).jpeg({ quality: 90 }).toFile(path.join(out, "og-image.jpg"));
fs.copyFileSync(path.join(out, "og-image.jpg"), path.join(app, "opengraph-image.jpg"));

console.log("Brand assets written to public/brand/ and src/app/");
