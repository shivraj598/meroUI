"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEMS = [
  "Button",
  "Card",
  "Input",
  "Modal",
  "Tabs",
  "Toast",
  "Badge",
  "Toggle",
  "Table",
  "Tooltip",
  "Skeleton",
  "Progress",
];

export function Marquee() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = section.current;
    const t = track.current;
    if (!el || !t) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) return;
      const tween = gsap.to(t, {
        xPercent: -50,
        ease: "none",
        duration: 26,
        repeat: -1,
      });
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((item, i) => (
        <span key={`${hidden ? "b" : "a"}-${item}`} className="flex items-center">
          <span
            className={`whitespace-nowrap px-7 text-3xl font-semibold tracking-tight [transform:rotateY(12deg)] md:px-10 md:text-5xl ${
              i % 2 === 0 ? "text-zinc-50" : "text-outline"
            }`}
          >
            {item}
          </span>
          <span className="font-mono text-sm text-zinc-600">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={section}
      aria-label="Available components"
      className="relative -mt-[6.875rem] overflow-hidden border-y border-zinc-800 bg-zinc-950 py-9 [perspective:600px] md:-mt-[8.625rem] md:py-11"
    >
      <div ref={track} className="marquee-track flex w-max [transform:rotateX(-16deg)]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
