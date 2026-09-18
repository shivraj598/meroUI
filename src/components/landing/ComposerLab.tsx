"use client";

import { useState } from "react";
import PromptBar from "@/components/ui/PromptBar";

export function ComposerLab() {
  const [variant, setVariant] = useState<"Rounded" | "Pill">("Rounded");
  return (
    <section id="composer" className="bg-panel px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-[1220px] grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Lab</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-[30px]">The composer.</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-muted">
            The only component we kept. Everything else will be built to match its radius, density, and focus system.
          </p>

          <div className="mt-6 inline-flex gap-1 rounded-full border border-line bg-canvas p-1">
            {(["Rounded", "Pill"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  variant === v ? "bg-ink text-canvas" : "text-muted hover:text-ink"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5 font-mono text-xs text-muted">
            <li className="flex gap-2">
              <span className="font-semibold text-ink">@</span> attach sources & files
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-ink">/</span> commands, ↑↓ to pick
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-ink">●</span> mic → dictation
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-ink">◆</span> model → Rainbow sweep on flagship
            </li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-line bg-canvas p-4 shadow-card md:p-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-xs font-medium text-canvas">
              <span className="size-1.5 rounded-full bg-green dot-pulse" />
              live · {variant.toLowerCase()}
            </span>
            <span className="font-mono text-xs text-faint">interactive</span>
          </div>

          <div className="mt-7 flex justify-center">
            <div className="w-full max-w-[560px] rounded-[20px] bg-panel p-2 ring-1 ring-line/60 md:p-3">
              <PromptBar variant={variant} />
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-code">
            <div className="flex items-center justify-between border-b border-code-border px-4 py-2.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-code-muted">Usage</span>
              <span className="size-2 rounded-full bg-line-strong" />
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-code-ink">
              <code>{`import PromptBar from "@/components/ui/PromptBar";\n<PromptBar variant="${variant}" />`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
