// Publishes the OpenNext incremental-cache entries into the Workers Static
// Assets directory so the read-only static-assets incremental cache
// (cf-static-assets-incremental-cache) can serve prerendered pages.
// The store reads `<BUILD_ID>/<path>.cache` from `cdn-cgi/_next_cache/`, which
// is worker-only (never publicly exposed). Run after `opennextjs-cloudflare
// build` (and before deploy/preview).
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CACHE_DIR = path.join(ROOT, ".open-next", "cache");
const DEST_ROOT = path.join(
  ROOT,
  ".open-next",
  "assets",
  "cdn-cgi",
  "_next_cache",
);

if (!fs.existsSync(CACHE_DIR)) {
  console.log("No .open-next/cache directory — nothing to publish.");
  process.exit(0);
}

let copied = 0;
for (const buildId of fs.readdirSync(CACHE_DIR)) {
  const src = path.join(CACHE_DIR, buildId);
  const stat = fs.statSync(src);
  if (!stat.isDirectory()) continue;
  const dest = path.join(DEST_ROOT, buildId);
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src, { recursive: true })) {
    const from = path.join(src, file);
    if (!fs.statSync(from).isFile()) continue;
    const to = path.join(dest, file);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
    copied += 1;
  }
}
console.log(
  `Published ${copied} cache ${copied === 1 ? "entry" : "entries"} to ${DEST_ROOT}`,
);