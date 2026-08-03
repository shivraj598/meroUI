"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FEATURES = [
  {
    title: "Ship faster",
    body: "Drop-in components for the Next.js and React stack. Copy one file, keep full ownership.",
  },
  {
    title: "Dark by default",
    body: "A black-and-white system built for dark UIs. Contrast that survives real-world screens.",
  },
  {
    title: "No dependencies",
    body: "Zero runtime deps. Your bundle stays lean, your npm audit stays quiet.",
  },
  {
    title: "Accessible",
    body: "Keyboard-first, screen-reader-ready. AA+ on every surface.",
  },
  {
    title: "Tested",
    body: "Unit-tested and prod-verified. If it ships in meroUI, it ships.",
  },
  {
    title: "MIT licensed",
    body: "Use it in side projects, client work, and commercial products. No attribution needed.",
  },
];

export function Features() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 70,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      if (reduced) return;

      const tilts = new Map<
        HTMLElement,
        { rx: (v: number) => void; ry: (v: number) => void }
      >();
      gsap.utils.toArray<HTMLElement>(".tilt-inner").forEach((inner) => {
        const rx = gsap.quickTo(inner, "rotationX", {
          duration: 0.5,
          ease: "power3.out",
        });
        const ry = gsap.quickTo(inner, "rotationY", {
          duration: 0.5,
          ease: "power3.out",
        });
        tilts.set(inner.closest(".feature-card") as HTMLElement, { rx, ry });
      });

      const move = (e: PointerEvent) => {
        const card = (e.target as HTMLElement).closest(
          ".feature-card"
        ) as HTMLElement | null;
        if (!card) return;
        const t = tilts.get(card);
        if (!t) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        t.ry(px * 10);
        t.rx(-py * 10);
      };
      const leave = (e: PointerEvent) => {
        const card = (e.target as HTMLElement).closest(
          ".feature-card"
        ) as HTMLElement | null;
        if (!card) return;
        const t = tilts.get(card);
        if (!t) return;
        t.rx(0);
        t.ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);

      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={section}
      id="features"
      className="relative bg-zinc-950 px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Principles.
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            06 principles · every one enforced
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="feature-card rounded-md border border-zinc-800 bg-zinc-900/60 [perspective:700px]"
            >
              <div className="tilt-inner h-full [transform-style:preserve-3d]">
                <div className="flex h-full flex-col justify-between gap-8 p-6 [transform:translateZ(36px)] md:p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    meroUI
                  </p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-zinc-50">
                      {f.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {f.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
