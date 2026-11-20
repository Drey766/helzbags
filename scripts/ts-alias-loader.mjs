// Dev-only loader for running src/*.ts with node --experimental-strip-types (resolves "@/" and JSON).
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
const src = path.join(process.cwd(), "src");
export async function resolve(spec, ctx, next) {
  if (spec.startsWith("@/")) {
    let p = path.join(src, spec.slice(2));
    for (const ext of ["", ".ts", ".tsx", "/index.ts"]) if (fs.existsSync(p + ext) && fs.statSync(p + ext).isFile()) { p += ext; break; }
    return { url: pathToFileURL(p).href, shortCircuit: true };
  }
  return next(spec, ctx);
}
export async function load(url, ctx, next) {
  if (url.endsWith(".json")) return { format: "json", source: fs.readFileSync(new URL(url), "utf8"), shortCircuit: true };
  return next(url, ctx);
}
