"use client";

import { useState } from "react";
import PromptBar from "@/components/ui/PromptBar";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("npx meroui add prompt-bar");
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <section id="top" className="bg-canvas px-5 pb-12 pt-28 md:px-6 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1220px]">
        {/* eyebrow */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs font-medium text-muted">
            <span className="size-1.5 rounded-full bg-green animate-pulse" />
            PromptBar — live
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Est. 2026 · Kathmandu · One file per primitive
          </span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:items-start">
          {/* left copy */}
          <div className="max-w-[560px]">
            <h1 className="text-[38px] font-[620] leading-[0.92] tracking-[-0.04em] text-ink md:text-[56px]">
              Chat
              <br />
              <span className="font-light tracking-[-0.045em] text-muted">interfaces,</span>
              <br />
              distilled.
            </h1>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-7 text-muted">
              A focused UI library for chatbots, agents, and AI websites. Only the essentials — thinking, streaming,
              image genesis — each as a file you own.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#index"
                className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-7 text-sm font-medium text-canvas transition hover:opacity-90"
              >
                Explore index
              </a>
              <button
                onClick={copy}
                className="inline-flex h-11 items-center gap-3 rounded-full border border-line bg-panel px-2 pl-5 text-sm text-ink transition hover:border-line-strong"
              >
                <span className="font-mono text-[13px]">
                  <span className="text-faint">$</span> npx meroui add
                </span>
                <span className="inline-flex h-7 items-center rounded-full bg-ink px-3 text-xs font-medium text-canvas">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              <span className="text-muted">13 → 1 kept</span>
              <span className="h-3 w-px bg-line" />
              <span>Zero runtime</span>
              <span className="h-3 w-px bg-line" />
              <span>Own the code</span>
            </div>
          </div>

          {/* right — live composer card */}
          <div className="relative">
            <div className="rounded-[28px] border border-line bg-surface p-3 shadow-card md:p-3.5">
              {/* card header */}
              <div className="flex items-center justify-between px-1 pb-3 pt-1">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Live composer</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[11px] text-muted">
                  <span className="size-1.5 rounded-full bg-green dot-pulse" />
                  prompt-bar.tsx
                </span>
              </div>

              <div className="rounded-[20px] bg-panel p-2 ring-1 ring-line/60">
                <PromptBar variant="Rounded" />
              </div>

              {/* mini features */}
              <div className="grid grid-cols-3 gap-2 pt-3">
                <div className="rounded-2xl bg-ink p-3 text-canvas">
                  <p className="text-xs font-semibold">Thinking</p>
                  <p className="mt-1 text-[11px] leading-4 text-canvas/60">Dots → shimmer</p>
                </div>
                <div className="rounded-2xl border border-line bg-panel p-3">
                  <p className="text-xs font-semibold text-ink">Streaming</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted">Word reveal</p>
                </div>
                <div className="rounded-2xl border border-line bg-panel p-3">
                  <p className="text-xs font-semibold text-ink">Genesis</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted">Blur → reveal</p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center font-mono text-[11px] text-faint">No aurora. Just type, space, and ink.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
