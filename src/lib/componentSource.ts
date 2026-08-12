// meroUI component source loader.
// Sources are embedded at build time by scripts/generate-component-source.mjs
// into componentSourceData.ts, so this module never touches the filesystem —
// it is safe to run inside the Cloudflare Worker where no fs exists.
import { ALL_COMPONENTS } from "@/components/docs/nav";
import { COMPONENT_SOURCES } from "./componentSourceData";

/** Raw .tsx source of a built component, or null when unavailable. */
export function getComponentSource(slug: string): string | null {
  const allowed = ALL_COMPONENTS.find((c) => c.slug === slug && c.built);
  if (!allowed) return null;
  return COMPONENT_SOURCES[slug] ?? null;
}