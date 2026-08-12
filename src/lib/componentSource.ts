// meroUI component source loader.
// Reads each component's real source file at build time so the "Code" view
// on /components/[slug] always mirrors what ships. Server-only module: it
// touches the filesystem, so it must never be imported into a client bundle.
import fs from "node:fs";
import path from "node:path";
import { ALL_COMPONENTS } from "@/components/docs/nav";

const UI_DIR = path.join(process.cwd(), "src", "components", "ui");

/** "PromptBar" => "prompt-bar" (for matching docs slugs to file names). */
const kebab = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

/** Raw .tsx source of a built component, or null when unavailable. */
export function getComponentSource(slug: string): string | null {
  const allowed = ALL_COMPONENTS.find((c) => c.slug === slug && c.built);
  if (!allowed) return null;
  const file = fs
    .readdirSync(UI_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.slice(0, -4))
    .find((name) => kebab(name) === slug);
  if (!file) return null;
  return fs.readFileSync(path.join(UI_DIR, `${file}.tsx`), "utf8");
}