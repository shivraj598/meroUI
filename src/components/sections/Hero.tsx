"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

const INSTALL = "npm install mero-ui";

/**
 * Typographic manifesto hero: full-viewport stacked display type over a
 * hairline grid, with an install line and dual CTAs. Entry staggers once
 * the preloader signals mero:ready. Type does the talking — no preview
 * card, no terminal window.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [typed, setTyped] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? INSTALL
      : ""
  );
  const [copied, setCopied] = useState(false);
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const start = () => setReady(true);
    window.addEventListener("mero:ready", start);
    const fallback = window.setTimeout(start, 2600);
    return () => {
      window.removeEventListener("mero:ready", start);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!ready || reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(INSTALL.slice(0, i));
      if (i >= INSTALL.length) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [ready, reduced]);

  useEffect(() => {
    const el = section.current;
    if (!el || !ready) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.1,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.35,
      });
    }, el);
    return () => ctx.revert();
  }, [ready, reduced]);

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
    <section
      ref={section}
      id="top"
      className={`relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-6 pb-12 pt-24 md:px-10 md:pb-16 ${ready ? "is-ready" : ""}`}
    >
      <div className="relative mx-auto w-full max-w-[1440px]">
        <p className="hero-fade inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-4 py-1.5 font-mono text-[11px] tracking-wide text-muted">
          <span aria-hidden className="size-1.5 rounded-full bg-green dot-pulse" />
          13 primitives · React 19 · Tailwind 4
        </p>

        <h1 className="mt-6 font-semibold leading-[0.95] tracking-[-0.04em]">
          <span className="hero-line block text-[13.5vw] md:text-[9.5vw]">
            Interfaces
          </span>
          <span className="hero-line block text-[13.5vw] text-outline md:text-[9.5vw]">
            you own<span className="text-dim" style={{ WebkitTextStroke: "0" }}>.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-base leading-relaxed text-muted md:text-lg">
            A monochrome component library you copy into your repo. No runtime, no lock-in.
          </p>

          <div className="hero-fade flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={copy}
              aria-label="Copy install command"
              className="group flex items-center gap-3 rounded-md border border-code-border bg-code px-4 py-3 text-left transition-colors hover:border-code-ink/60"
            >
              <span aria-hidden className="font-mono text-sm text-code-muted">$</span>
              <span className="min-w-0 flex-1 truncate font-mono text-sm text-code-ink">
                {typed}
                <span className="caret ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-code-ink" />
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

        <p className="hero-fade mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          scroll for the index
        </p>
      </div>
    </section>
  );
}
