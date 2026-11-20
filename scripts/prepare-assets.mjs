// Copies the brand SVGs into public/brand and renders the favicon, Apple icon and share image.
// Run from the project root after `npm install --save-dev sharp`:  node scripts/prepare-assets.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const require = createRequire(path.join(root, "package.json"));
const sharp = require("sharp");

const A = (f) => path.join(root, "assets", f);
const out = path.join(root, "public", "brand");
fs.mkdirSync(out, { recursive: true });

for (const f of ["zuri-logo.svg", "zuri-mark.svg", "gold-wave.svg", "logo-original.jpg"]) fs.copyFileSync(A(f), path.join(out, f));

// sharp (librsvg) does not understand CSS variables: use each fallback colour
const flat = (s) => s.replace(/var\(--[a-z-]+,\s*(#[0-9A-Fa-f]{6})\)/g, "$1");
const svg = (f) => Buffer.from(flat(fs.readFileSync(A(f), "utf8")));

const IVORY = "#FBF8F2", PLUM = "#2E0A5C";

async function icon(size, file, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(svg("zuri-mark.svg"), { density: 600 }).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: IVORY } })
    .composite([{ input: mark, gravity: "center" }]).png().toFile(path.join(out, file));
}
await icon(256, "favicon-256.png", 0.08);
await icon(180, "apple-touch-icon.png", 0.14);
await icon(512, "icon-512.png", 0.14);

// Share image 1200x630: ivory card, logo left, gold wave along the bottom, plum band on the right
const W = 1200, H = 630;
const logo = await sharp(svg("zuri-logo.svg"), { density: 400 }).resize({ width: 470 }).png().toBuffer();
const wave = await sharp(svg("gold-wave.svg"), { density: 200 }).resize({ width: W, height: 150, fit: "fill" }).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect x="790" y="0" width="410" height="${H}" fill="${PLUM}"/>
  <text x="995" y="250" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-style="italic" fill="#EEDC88">Carry elegance.</text>
  <text x="995" y="310" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-style="italic" fill="#EEDC88">Carry confidence.</text>
  <text x="995" y="380" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" letter-spacing="3" fill="#FBF8F2">WOMEN&#8217;S HANDBAGS</text>
  <text x="995" y="410" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" letter-spacing="3" fill="#FBF8F2">MOI AVENUE · NAIROBI</text>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: IVORY } })
  .composite([{ input: text }, { input: logo, left: 150, top: 95 }, { input: wave, left: 0, top: H - 140 }])
  .jpeg({ quality: 88 }).toFile(path.join(out, "og-image.jpg"));

console.log("Brand assets written to public/brand/");
