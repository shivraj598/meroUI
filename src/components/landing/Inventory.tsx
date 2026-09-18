import Link from "next/link";

type Item = {
  name: string;
  slug: string;
  desc: string;
  glyph: string;
  built: boolean;
};

// Built set mirrors src/components/docs/nav.ts — keep in sync when adding primitives
const ITEMS: Item[] = [
  {
    name: "Thinking",
    slug: "thinking",
    desc: "Expandable agent trace: Steps, Reasoning, Search, Coding.",
    glyph: "◈",
    built: true,
  },
  {
    name: "Stream Text",
    slug: "stream-text",
    desc: "Word-by-word reveal. Markdown-aware, caret.",
    glyph: "≋",
    built: true,
  },
  {
    name: "Image Genesis",
    slug: "image-genesis",
    desc: "Shimmer + blur-up. Gemini image-creating effect.",
    glyph: "▣",
    built: true,
  },
  {
    name: "Tool Progress",
    slug: "tool-progress",
    desc: "Searching → Reading → Synthesizing. Step bar.",
    glyph: "⬡",
    built: true,
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    desc: "Collapsible threads, search, pinned. Shell primitive.",
    glyph: "▤",
    built: true,
  },
  {
    name: "Recommendation Card",
    slug: "recommendation-card",
    desc: "Holds shape, alternatives drawer, signal meter.",
    glyph: "⬔",
    built: true,
  },
];

export function Inventory() {
  return (
    <section id="index" className="bg-canvas px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-[1220px]">
        {/* section head */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-[30px]">Selective index.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Seven built, three soon. No bloat — only primitives you can&apos;t get polished elsewhere.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 font-mono text-xs text-muted">
            <span className="size-1.5 rounded-full bg-green" />
            7 live · 3 soon · copy–paste
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* featured — Prompt Bar */}
          <Link
            href="/components/prompt-bar"
            className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[28px] border border-ink bg-ink p-6 text-canvas md:col-span-5 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink">Live · Foundation</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-canvas text-ink transition-transform group-hover:rotate-12">
                ↗
              </span>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative mt-auto">
              <h3 className="text-2xl font-semibold tracking-tight">Prompt Bar</h3>
              <p className="mt-2 text-sm leading-6 text-canvas/60">
                @ sources, / commands, dictation, model picker. The composer that holds the system together.
              </p>
              <span className="mt-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-xs text-canvas/80">
                prompt-bar.tsx · live
              </span>
            </div>
          </Link>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {ITEMS.map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                className="group relative flex flex-col rounded-[24px] border border-line bg-panel p-6 transition-colors hover:border-line-strong hover:bg-canvas"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg border border-line bg-canvas text-[11px] text-muted">
                      {c.glyph}
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight text-ink">{c.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-muted group-hover:border-green/20 group-hover:bg-green/10 group-hover:text-green">
                    <span className="size-1.5 rounded-full bg-green" />
                    Live
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{c.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="font-mono text-xs text-faint">/{c.slug} · one file</span>
                  <span className="flex size-6 items-center justify-center rounded-full border border-line bg-canvas text-muted transition-transform group-hover:translate-x-0.5 group-hover:border-ink group-hover:text-ink">
                    ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* soon strip */}
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { name: "History", desc: "Grouped by time, keyboard nav." },
            { name: "Model Selector", desc: "Model picker with sweep." },
            { name: "User Settings", desc: "Profile, theme, shortcuts." },
          ].map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between rounded-2xl border border-dashed border-line bg-panel/60 px-4 py-3"
            >
              <div>
                <p className="text-xs font-semibold text-ink">{s.name}</p>
                <p className="mt-0.5 font-mono text-xs text-faint">{s.desc}</p>
              </div>
              <span className="shrink-0 rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-faint">
                Soon
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel px-5 py-4">
          <p className="text-sm leading-6 text-muted">
            7 live, 3 soon — History, Model Selector, User Settings next. All as one-file primitives + a reference
            ChatShell.
          </p>
          <Link href="/docs" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas hover:opacity-90">
            Browse docs
          </Link>
        </div>
      </div>
    </section>
  );
}
