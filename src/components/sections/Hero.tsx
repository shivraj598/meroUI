"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const INSTALL = "npm install mero-ui";

/**
 * Hero, kept deliberately plain: stacked display type, one line of
 * subcopy, an install line with copy, and a single CTA. No entrance
 * animation, no scroll effects, no motion library — static markup
 * plus hover states.
 */
export function Hero() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="top" className="px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      <div className="mx-auto w-full max-w-[1440px]">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-4 py-1.5 font-mono text-[11px] tracking-wide text-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-green" />
          13 primitives · React 19 · Tailwind 4
        </p>

        <h1 className="mt-6 font-semibold leading-[0.95] tracking-[-0.04em]">
          <span className="block text-[13.5vw] md:text-[9vw]">
            Interfaces
          </span>
          <span className="block text-[13.5vw] text-outline md:text-[9vw]">
            you own.
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            A monochrome component library you copy into your repo. No runtime, no lock-in.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={copy}
              aria-label="Copy install command"
              className="group flex items-center gap-3 rounded-md border border-code-border bg-code px-4 py-3 text-left transition-colors hover:border-code-ink/60"
            >
              <span aria-hidden className="font-mono text-sm text-code-muted">$</span>
              <span className="min-w-0 flex-1 truncate font-mono text-sm text-code-ink">
                {INSTALL}
              </span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-code-muted transition-colors group-hover:text-code-ink">
                {copied ? "copied ✓" : "copy"}
              </span>
            </button>
            <Button href="/docs" size="lg" className="shrink-0">
              Get started
            </Button>
          </div>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          scroll for the index
        </p>
      </div>
    </section>
  );
}
