import Link from "next/link";

const SOON = [
  { name: "Thinking", desc: "Bouncing dots → shimmer. ChatGPT / Gemini variants." },
  { name: "Streaming", desc: "Word-by-word reveal. Markdown aware." },
  { name: "Image Genesis", desc: "Shimmer + blur-up while generating." },
  { name: "Tool Progress", desc: "Searching → Reading → Synthesizing." },
  { name: "Sidebar", desc: "Collapsible threads, search, pinned." },
  { name: "History", desc: "Grouped by time, keyboard nav." },
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
              One kept, six next. No bloat — only primitives you can&apos;t get polished elsewhere.
            </p>
          </div>
          <span className="inline-flex rounded-full border border-line bg-panel px-3 py-1 font-mono text-xs text-muted">
            1 kept · 6 next · PromptBar is live
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* kept — featured */}
          <Link
            href="/components/prompt-bar"
            className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[28px] border border-ink bg-ink p-6 text-canvas md:col-span-5 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink">Kept · Foundation</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-canvas text-ink transition-transform group-hover:rotate-12">
                ↗
              </span>
            </div>

            {/* subtle grid */}
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
                prompt-bar.tsx · ~675 lines
              </span>
            </div>
          </Link>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {SOON.map((c) => (
              <div
                key={c.name}
                className="rounded-[24px] border border-line bg-panel p-6 transition-colors hover:border-line-strong"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-ink">{c.name}</h3>
                  <span className="rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-muted">
                    Soon
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{c.desc}</p>
                <div className="mt-4 h-px w-full bg-line" />
                <p className="mt-3 font-mono text-xs text-faint">One file, no deps, copy–paste.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-panel px-5 py-4">
          <p className="text-sm leading-6 text-muted">
            Want the full AI shell? Sidebar + History + Composer + Settings — as primitives + a reference ChatShell.
          </p>
          <Link href="/docs" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas hover:opacity-90">
            Read the plan
          </Link>
        </div>
      </div>
    </section>
  );
}
