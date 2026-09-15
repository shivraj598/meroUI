"use client";

import { useState } from "react";
import PromptBar from "@/components/ui/PromptBar";

export function ComposerLab() {
  const [variant, setVariant] = useState<"Rounded" | "Pill">("Rounded");

  return (
    <section id="composer" className="border-b border-line bg-panel/30 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* left: copy, sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint">Flagship — composer lab</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              The prompt bar<span className="text-dim">.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted md:text-base">
              A real composer, not a mock. @ sources, / commands, file chips,
              dictation, model picker — and a glimm rainbow sweep when you
              upgrade to the flagship.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setVariant("Rounded")}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  variant === "Rounded" ? "border-ink bg-ink text-canvas" : "border-line bg-canvas text-muted hover:text-ink"
                }`}
              >
                Rounded · 14px
              </button>
              <button
                type="button"
                onClick={() => setVariant("Pill")}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  variant === "Pill" ? "border-ink bg-ink text-canvas" : "border-line bg-canvas text-muted hover:text-ink"
                }`}
              >
                Pill · full
              </button>
            </div>

            <ul className="mt-8 space-y-3 font-mono text-xs leading-6 text-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink" /> Type <span className="text-ink">@</span> to attach sources & files
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink" /> Type <span className="text-ink">/</span> to run commands, ↑↓ + Enter to pick
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink" /> Try the mic → dictation lands as text
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-ink" /> Switch model to <span className="text-ink">Sprinkles 5</span> for the sweep
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
              <a
                href="/components/prompt-bar"
                className="inline-flex h-9 items-center rounded-full bg-ink px-5 font-mono text-xs uppercase tracking-[0.14em] text-canvas transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Open source
              </a>
              <span className="font-mono text-xs text-faint">prompt-bar.tsx · ~675 lines</span>
            </div>
          </div>

          {/* right: live stage */}
          <div className="rounded-xl border border-code-border bg-code p-4 shadow-raised md:p-8">
            {/* chrome */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-code-muted">live preview · {variant.toLowerCase()}</span>
              <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-code-muted sm:flex">
                <span className="size-1.5 rounded-full bg-green dot-pulse" /> interactive
              </span>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-[520px] rounded-xl bg-canvas p-3 shadow-card">
                <PromptBar variant={variant} />
              </div>
            </div>

            {/* code snippet */}
            <div className="mt-6 rounded-lg border border-code-border bg-canvas p-4 font-mono text-xs leading-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-faint">usage</span>
                <span className="text-[10px] text-faint">copy</span>
              </div>
              <pre className="mt-2 overflow-x-auto text-ink">
                <code className="code-syntax">{`import PromptBar from "@/components/ui/PromptBar";

<PromptBar variant="${variant}" />`}</code>
              </pre>
            </div>

            <p className="mt-4 text-center font-mono text-[11px] leading-5 text-code-muted">
              The file is yours. Change the palette, the radius, the menus — keep the behavior.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
