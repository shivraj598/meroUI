"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BUILT_COUNT } from "@/components/docs/nav";

const INSTALL_CMD = "npx meroui add button";

/**
 * Centered hero in the plain-modern register: badge pill, one headline,
 * one line of subtext, two actions, and an installable command as the
 * only visual. Entry waits for the preloader's mero:ready signal.
 */
export function Hero() {
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    window.addEventListener("mero:ready", start);
    const fallback = window.setTimeout(start, 2600);
    return () => {
      window.removeEventListener("mero:ready", start);
      window.clearTimeout(fallback);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      id="top"
      className={`relative flex min-h-[100dvh] items-center justify-center px-6 pt-24 pb-16 ${ready ? "is-ready" : ""}`}
    >
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <a
          href="/docs"
          className="hero-anim inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-4 py-1.5 font-mono text-[11px] tracking-wide text-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-green dot-pulse" />
          {BUILT_COUNT} components · React 19 + Tailwind CSS 4
        </a>

        <h1
          className="hero-anim mt-7 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Production-ready UI for Next.js&nbsp;16<span className="text-dim">.</span>
        </h1>

        <p
          className="hero-anim mt-6 max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Type-safe, accessible components you copy straight into your project.
          Zero config, zero dependencies.
        </p>

        <div
          className="hero-anim mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button href="/docs" size="lg">
            Get started
          </Button>
          <Button href="#components" variant="ghost" size="lg">
            Browse components
          </Button>
        </div>

        {/* install command */}
        <div
          className="hero-anim mt-12 flex w-full max-w-md items-center justify-between gap-3 rounded-md border border-code-border bg-code px-4 py-3"
          style={{ animationDelay: "320ms" }}
        >
          <p className="truncate font-mono text-sm">
            <span className="text-code-muted">$ </span>
            <span className="text-code-ink">{INSTALL_CMD}</span>
          </p>
          <button
            type="button"
            onClick={copy}
            className="shrink-0 rounded border border-code-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-code-muted transition-colors hover:border-code-ink/70 hover:text-code-ink"
          >
            {copied ? "copied" : "copy"}
          </button>
        </div>
      </div>
    </section>
  );
}
