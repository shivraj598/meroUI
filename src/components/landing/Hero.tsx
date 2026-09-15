"use client";

import { useEffect, useRef, useState } from "react";
import PromptBar from "@/components/ui/PromptBar";

const INSTALL = "npx meroui add prompt-bar";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    const onReady = () => setReady(true);
    window.addEventListener("mero:ready", onReady, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("mero:ready", onReady);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className={`relative overflow-hidden border-b border-line ${ready ? "is-ready" : ""}`}
    >
      {/* hairline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line-strong) 1px, transparent 1px), linear-gradient(to bottom, var(--line-strong) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-6 pt-24 md:px-10 md:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* left: editorial */}
        <div className="flex flex-col justify-center py-8 md:py-10 lg:py-14">
          <div className="hero-anim inline-flex w-fit items-center gap-2 rounded-full border border-line bg-panel/50 px-3 py-1.5" style={{ animationDelay: "0ms" }}>
            <span className="size-1.5 rounded-full bg-green dot-pulse" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              13 primitives · zero runtime · fully owned
            </span>
          </div>

          <h1 className="hero-anim mt-6 font-semibold leading-[0.88] tracking-[-0.05em]" style={{ animationDelay: "80ms" }}>
            <span className="block text-[15vw] leading-none md:text-[8.2vw] lg:text-[6.2vw]">You own</span>
            <span className="block text-[15vw] leading-none text-outline md:text-[8.2vw] lg:text-[6.2vw]">the code.</span>
          </h1>

          <p className="hero-anim mt-6 max-w-[42ch] text-[15px] leading-7 text-muted md:text-[16px]" style={{ animationDelay: "160ms" }}>
            Copy-paste primitives for Next.js 16. One file per component, typed and accessible. No install, no lock-in.
          </p>

          <div className="hero-anim mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
            <a
              href="/docs"
              className="inline-flex h-11 items-center rounded-full bg-ink px-7 font-mono text-xs uppercase tracking-[0.14em] text-canvas transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
            >
              Browse components
            </a>
            <button
              type="button"
              onClick={copy}
              className="group inline-flex h-11 items-center gap-3 rounded-full border border-line bg-panel/60 px-5 font-mono text-sm text-ink backdrop-blur transition-colors hover:border-line-strong hover:bg-panel"
            >
              <span className="text-dim">$</span>
              <span className="hidden sm:inline">npx meroui add</span>
              <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-canvas transition-colors group-hover:bg-ink">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>

          <div className="hero-anim mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-faint" style={{ animationDelay: "320ms" }}>
            <span className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-ink" /> MIT license
            </span>
            <span className="h-3 w-px bg-line" aria-hidden />
            <span>React 19 · Tailwind 4 · TypeScript</span>
            <span className="h-3 w-px bg-line hidden sm:block" aria-hidden />
            <span className="hidden sm:inline">Shipped from Kathmandu</span>
          </div>
        </div>

        {/* right: framed composer */}
        <div className="hero-anim relative flex flex-col justify-center py-6 lg:py-10" style={{ animationDelay: "200ms" }}>
          {/* window */}
          <div className="relative overflow-hidden rounded-[18px] border border-line bg-code shadow-raised">
            {/* chrome */}
            <div className="flex items-center justify-between border-b border-code-border bg-code px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
                <span className="size-3 rounded-full bg-[#ffbd2e]" aria-hidden />
                <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
              </div>
              <span className="rounded-full border border-code-border bg-canvas px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                composer.tsx — prompt bar
              </span>
              <span className="hidden items-center gap-1 font-mono text-[10px] text-code-muted sm:flex">
                <span className="size-1.5 rounded-full bg-green dot-pulse" /> live preview
              </span>
            </div>

            {/* terminal line */}
            <div className="flex items-center gap-3 border-b border-code-border bg-panel/30 px-4 py-3 font-mono text-xs">
              <span className="text-code-muted">$</span>
              <span className="text-code-ink">{INSTALL}</span>
              <span className="ml-auto hidden rounded bg-ink px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-canvas sm:inline">↵ run</span>
            </div>

            {/* prompt bar showcase */}
            <div className="bg-surface p-4 md:p-6">
              <div className="rounded-xl bg-canvas p-2 shadow-card">
                {/* scale down slightly so it fits */}
                <div className="origin-top scale-[0.98] md:scale-100">
                  <PromptBar variant="Rounded" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                <span>Type <span className="text-ink">@</span> for sources · <span className="text-ink">/</span> for commands</span>
                <span className="flex items-center gap-1.5 text-code-muted">
                  100% owned file <span className="text-ink">→</span>
                </span>
              </div>
            </div>
          </div>

          {/* floating meta card */}
          <div className="pointer-events-none absolute -bottom-2 -left-2 hidden rounded-lg border border-line bg-canvas px-4 py-3 shadow-card md:flex md:items-center md:gap-3 lg:-left-6">
            <span className="flex size-8 items-center justify-center rounded-md bg-ink text-canvas">
              <span className="font-mono text-xs">◈</span>
            </span>
            <div>
              <p className="font-mono text-[11px] font-medium leading-none text-ink">Zero runtime</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Copy, paste, ship — no deps</p>
            </div>
          </div>

          {/* subtle image bleed behind */}
          <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 -z-10 hidden size-40 rounded-full bg-panel opacity-60 blur-2xl lg:block" />
        </div>
      </div>

      {/* bottom scroller hint */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-faint md:px-10">
        <span>Scroll to explore — 13 primitives</span>
        <span className="hidden items-center gap-2 md:flex">
          <span className="h-px w-12 bg-line" /> index below
        </span>
      </div>
    </section>
  );
}
