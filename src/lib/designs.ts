// meroUI design-showcase content loader.
// Reads `content/web-design/*.md` at build time and parses each file's
// frontmatter into a renderable design entry. Server-only module: it touches
// the filesystem, so it must never be imported into a client bundle.
import fs from "node:fs";
import path from "node:path";

export type DesignEntry = {
  title: string;
  slug: string;
  summary: string;
  liveDemoUrl: string;
  image: string;
  thumbnail: string;
  tags: string[];
  date: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "web-design");

/** Minimal YAML-ish frontmatter parser: `key: value` lines between `---` fences. */
export function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const lines = raw.split("\n");
  if (lines[0]?.trim() !== "---") {
    return { data: {}, body: raw.trim() };
  }
  let end = 1;
  while (end < lines.length && lines[end].trim() !== "---") end += 1;

  const data: Record<string, unknown> = {};
  for (const line of lines.slice(1, end)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val: unknown = trimmed.slice(idx + 1).trim();
    if (
      (val as string).startsWith('"') &&
      (val as string).endsWith('"')
    ) {
      val = (val as string).slice(1, -1);
    } else if (
      (val as string).startsWith("[") &&
      (val as string).endsWith("]")
    ) {
      val = (val as string)
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    }
    data[key] = val;
  }
  return { data, body: lines.slice(end + 1).join("\n").trim() };
}

/** Load and sort all design entries (newest first). */
export function getDesigns(): DesignEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const entries = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data } = parseFrontmatter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        title: String(data.title ?? slug).trim(),
        slug: String(data.slug ?? slug).trim(),
        summary: String(data.summary ?? "").trim(),
        liveDemoUrl: String(data.liveDemoUrl ?? "").trim(),
        image: String(data.image ?? "").trim(),
        thumbnail: String(data.thumbnail ?? "").trim(),
        tags: Array.isArray(data.tags)
          ? data.tags.map(String)
          : [String(data.tags ?? "")].filter(Boolean),
        date: String(data.date ?? "").trim(),
      } satisfies DesignEntry;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return entries;
}