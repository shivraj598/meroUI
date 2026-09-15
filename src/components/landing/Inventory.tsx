import Link from "next/link";
import { COMPONENT_GROUPS } from "@/components/docs/nav";

export function Inventory() {
  return (
    <section id="index" className="border-b border-line px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        {/* header: stacked, not split */}
        <div className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            The inventory<span className="text-dim">.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
            Thirteen primitives, each a single file you own. No wrappers, no
            abstractions — just the source, ready to edit and ship.
          </p>
        </div>

        {/* bento: mixed sizes, not 3 equal cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Left tall: Featured - Prompt Bar */}
          <Link
            href="/components/prompt-bar"
            className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-line bg-panel md:col-span-5"
          >
            <div className="absolute inset-0">
              {/* subtle image */}
              <img
                src="https://picsum.photos/seed/meroui-prompt/800/900"
                alt=""
                aria-hidden
                className="h-full w-full object-cover opacity-[0.08] grayscale transition-opacity duration-500 group-hover:opacity-[0.12]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/80 to-transparent" />
            </div>
            <div className="relative flex h-full flex-col p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-line bg-canvas px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Controls · 4 / 13
                </span>
                <span className="flex size-7 items-center justify-center rounded-full bg-ink text-canvas transition-transform duration-200 group-hover:rotate-12">
                  ↗
                </span>
              </div>
              <div className="mt-auto">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">Flagship</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">Prompt Bar</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                  Composer with @ sources, / commands, dictation and a model
                  picker. Autoplay demo, glimm rainbow sweep.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-canvas">✎ composer</span>
                  <span className="rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">glimm</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Right grid: 2x2 + wide */}
          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {/* Feedback */}
            <div className="rounded-xl border border-line bg-canvas p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">Feedback — 5</p>
              <ul className="mt-4 space-y-0 divide-y divide-line">
                {COMPONENT_GROUPS[0].items.map((c, i) => (
                  <li key={c.slug}>
                    <Link
                      href={`/components/${c.slug}`}
                      className="group flex items-center justify-between py-3"
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex size-6 items-center justify-center rounded-md border border-line bg-panel font-mono text-[10px] text-muted transition-colors group-hover:bg-ink group-hover:text-canvas">
                          {c.glyph}
                        </span>
                        <span className="font-mono text-sm font-medium tracking-tight text-ink group-hover:underline decoration-line-strong underline-offset-4">
                          {c.name}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-dim transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controls (minus prompt-bar) */}
            <div className="rounded-xl border border-line bg-ink p-6 text-canvas">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Controls — 3 + flagship</p>
              <ul className="mt-4 space-y-3">
                {COMPONENT_GROUPS[1].items.filter((c) => c.slug !== "prompt-bar").map((c) => (
                  <li key={c.slug}>
                    <Link href={`/components/${c.slug}`} className="group flex items-baseline justify-between gap-3">
                      <span className="font-mono text-sm font-medium text-canvas group-hover:underline decoration-white/20 underline-offset-4">
                        {c.name}
                      </span>
                      <span className="hidden truncate font-mono text-[11px] text-white/50 sm:block">{c.blurb.slice(0, 28)}…</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-white/10 p-3">
                <p className="font-mono text-[11px] leading-5 text-white/80">
                  <span className="text-white">Tip:</span> Input + Toggle + Tabs share the same focus system — one tab ring, one contrast.
                </p>
              </div>
            </div>

            {/* Display - wide */}
            <div className="rounded-xl border border-line bg-panel p-6 md:col-span-2">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">Display — 4</p>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">all hairline + no shadow</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {COMPONENT_GROUPS[2].items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/components/${c.slug}`}
                    className="group flex items-center gap-3 rounded-lg border border-line bg-canvas px-4 py-4 transition-colors hover:border-ink hover:bg-ink"
                  >
                    <span className="flex size-8 items-center justify-center rounded-md bg-panel font-mono text-xs text-ink transition-colors group-hover:bg-white/10 group-hover:text-canvas">
                      {c.glyph}
                    </span>
                    <span>
                      <span className="block font-mono text-sm font-medium text-ink group-hover:text-canvas">{c.name}</span>
                      <span className="block font-mono text-[11px] text-muted group-hover:text-white/60">{c.blurb.split(".")[0]}.</span>
                    </span>
                    <span className="ml-auto text-dim group-hover:text-white">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* bottom wide bar: count */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-canvas px-6 py-4 md:col-span-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="text-ink">13 files</span> <span className="text-dim">·</span> each one is the docs
            </p>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="hidden text-faint sm:inline">Open any file → copy → own</span>
              <Link href="/docs" className="rounded-full bg-ink px-4 py-2 text-canvas transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Browse all
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
