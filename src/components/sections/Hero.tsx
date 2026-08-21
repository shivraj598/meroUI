"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { BUILT_COUNT } from "@/components/docs/nav";

const PACKAGE_MANAGERS = ["npm", "yarn", "pnpm", "bun"] as const;

const CODE: Record<(typeof PACKAGE_MANAGERS)[number], string> = {
  npm: "npm install mero-ui",
  yarn: "yarn add mero-ui",
  pnpm: "pnpm add mero-ui",
  bun: "bun add mero-ui",
};

const TERMINAL_LINES = [
  "mero-ui@latest",
  "⡿ resolving dependencies",
  "✓ added 1 package in 1.2s",
  "no dependencies. that's the whole install.",
];

/**
 * Hero with integrated interactive install terminal.
 * Entry waits for the preloader's mero:ready signal.
 * Terminal features: live typing, package manager tabs, 3D magnetic tilt,
 * and scroll-triggered entrance animation.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [pm, setPm] = useState<(typeof PACKAGE_MANAGERS)[number]>("npm");
  const [typed, setTyped] = useState("");
  const [copied, setCopied] = useState(false);

  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let i = reduced ? CODE[pm].length : 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(CODE[pm].slice(0, i));
      if (i >= CODE[pm].length) window.clearInterval(id);
    }, 34);
    return () => window.clearInterval(id);
  }, [pm, reduced]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE[pm]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Scroll-triggered entrance + 3D magnetic tilt
  useEffect(() => {
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });

      if (reduced) return;

      const scene = el.querySelector<HTMLElement>(".hero-terminal");
      if (!scene) return;
      const rx = gsap.quickTo(scene, "rotationX", {
        duration: 0.6,
        ease: "power3.out",
      });
      const ry = gsap.quickTo(scene, "rotationY", {
        duration: 0.6,
        ease: "power3.out",
      });

      const move = (e: PointerEvent) => {
        const rect = scene.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        ry(px * 8);
        rx(-py * 8);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      scene.addEventListener("pointermove", move);
      scene.addEventListener("pointerleave", leave);

      return () => {
        scene.removeEventListener("pointermove", move);
        scene.removeEventListener("pointerleave", leave);
      };
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      ref={section}
      id="top"
      className={`relative flex min-h-[100dvh] items-center justify-center px-6 pt-24 pb-6 ${ready ? "is-ready" : ""}`}
    >
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <a
          href="/docs"
          className="hero-anim inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-4 py-1.5 font-mono text-[11px] tracking-wide text-muted transition-colors hover:border-line-strong hover:text-ink"
          style={{ animationDelay: "0ms" }}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-green dot-pulse" />
          {BUILT_COUNT} components · React 19 + Tailwind CSS 4
        </a>

        <h1
          className="hero-anim mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Production-ready UI for Next.js&nbsp;16<span className="text-dim">.</span>
        </h1>

        <p
          className="hero-anim mt-5 max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Type-safe, accessible components you copy straight into your project.
          Zero config, zero dependencies.
        </p>

        <div
          className="hero-anim mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Button href="/docs" size="lg">
            Get started
          </Button>
          <Button href="#components" variant="ghost" size="lg">
            Browse components
          </Button>
        </div>

        {/* Interactive install terminal */}
        <div
          className="hero-anim hero-terminal relative mt-10 w-full max-w-2xl [perspective:1200px]"
          style={{ animationDelay: "320ms" }}
        >
          <div className="install-scene rounded-md border border-code-border bg-code shadow-[0_60px_120px_-30px_rgba(0,0,0,0.55)] will-change-transform">
            {/* title bar */}
            <div className="flex items-center justify-between border-b border-code-border px-5 py-3.5">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
                <span className="size-2.5 rounded-full bg-line-strong" />
              </div>
              <span className="font-mono text-[11px] text-code-muted">
                ~/mero-ui - zsh
              </span>
              <button
                type="button"
                onClick={copy}
                className="rounded border border-code-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-code-muted transition-colors hover:border-code-ink/70 hover:text-code-ink"
              >
                {copied ? "copied" : "copy"}
              </button>
            </div>

            {/* package manager tabs */}
            <div
              role="tablist"
              aria-label="Package manager"
              className="flex gap-1 border-b border-code-border px-5 pt-3"
            >
              {PACKAGE_MANAGERS.map((p) => (
                <button
                  key={p}
                  role="tab"
                  type="button"
                  aria-selected={pm === p}
                  onClick={() => setPm(p)}
                  className={`rounded-t border-b-2 px-3 py-2 font-mono text-xs transition-colors ${
                    pm === p
                      ? "border-code-ink text-code-ink"
                      : "border-transparent text-code-muted hover:text-code-ink"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* terminal body */}
            <div className="px-5 py-5 md:px-7 md:py-6">
              <div className="min-h-28 md:min-h-24">
                <p className="font-mono text-sm text-code-muted">
                  {TERMINAL_LINES.slice(0, 3).map((line) => (
                    <span key={line} className="block leading-6">
                      {line}
                    </span>
                  ))}
                </p>
                <p className="font-mono text-sm leading-6">
                  <span className="text-code-muted">$ </span>
                  <span className="text-code-ink">
                    {typed}
                    <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-code-ink" />
                  </span>
                </p>
                <p className="font-mono text-sm text-code-muted">
                  {TERMINAL_LINES[3]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}