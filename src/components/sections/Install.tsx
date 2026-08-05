"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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

export function Install() {
  const section = useRef<HTMLElement>(null);
  const [pm, setPm] = useState<(typeof PACKAGE_MANAGERS)[number]>("npm");
  const [typed, setTyped] = useState("");
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
    let i = reduced ? CODE[pm].length : 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(CODE[pm].slice(0, i));
      if (i >= CODE[pm].length) window.clearInterval(id);
    }, 34);
    return () => window.clearInterval(id);
  }, [pm, reduced]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".install-scene", {
        rotationX: 32,
        y: 90,
        opacity: 0,
        transformOrigin: "50% 100%",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      if (reduced) return;

      const scene = el.querySelector<HTMLElement>(".install-scene");
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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE[pm]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      ref={section}
      id="install"
      className="relative overflow-hidden bg-zinc-950 px-6 pt-20 pb-28 [perspective:1200px] md:px-10 md:pt-28 md:pb-40"
    >
      <div className="mx-auto w-full max-w-4xl [transform-style:preserve-3d]">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Install.
          </h2>
        </div>

        <div className="install-scene rounded-md border border-zinc-800 bg-zinc-900/80 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] will-change-transform">
          {/* title bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-zinc-700" />
              <span className="size-2.5 rounded-full bg-zinc-700" />
              <span className="size-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              ~/mero-ui - zsh
            </span>
            <button
              type="button"
              onClick={copy}
              className="rounded border border-zinc-700 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-zinc-50 hover:text-zinc-50"
            >
              {copied ? "copied" : "copy"}
            </button>
          </div>

          {/* package manager tabs */}
          <div
            role="tablist"
            aria-label="Package manager"
            className="flex gap-1 border-b border-zinc-800 px-5 pt-3"
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
                    ? "border-zinc-50 text-zinc-50"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* terminal body */}
          <div className="px-5 py-5 md:px-7 md:py-6">
            <div className="min-h-28 md:min-h-24">
              <p className="font-mono text-sm text-zinc-500">
                {TERMINAL_LINES.slice(0, 3).map((line) => (
                  <span key={line} className="block leading-6">
                    {line}
                  </span>
                ))}
              </p>
              <p className="font-mono text-sm leading-6">
                <span className="text-zinc-50">$ </span>
                <span className="text-zinc-300">
                  {typed}
                  <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-zinc-50" />
                </span>
              </p>
              <p className="font-mono text-sm text-zinc-500">
                {TERMINAL_LINES[3]}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          server components / client components / zero config
        </p>
      </div>
    </section>
  );
}
