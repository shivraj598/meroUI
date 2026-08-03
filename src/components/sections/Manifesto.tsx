"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STATEMENT =
  "meroUI is a production UI library for React and Next.js. No demo-ware. No half-shipped exports. Just tested components that hold up in the real stack.";

export function Manifesto() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!reduced) {
        const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
        gsap.fromTo(
          words,
          { rotationX: -90, color: "#a1a1aa" },
          {
            rotationX: 0,
            color: "#fafafa",
            ease: "none",
            transformOrigin: "50% 0%",
            stagger: 0.32,
            scrollTrigger: {
              trigger: el,
              start: "top 72%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );

        /* receding outlined word behind the statement */
        gsap.fromTo(
          ".manifesto-floor",
          { yPercent: 34, opacity: 0 },
          {
            yPercent: -14,
            opacity: 0.7,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      } else {
        gsap.set(".manifesto-word", { color: "#fafafa" });
      }
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  const words = STATEMENT.split(" ");

  return (
    <section
      ref={section}
      className="relative flex min-h-[130dvh] flex-col justify-center overflow-hidden bg-zinc-950 px-6 py-40 [perspective:1200px] md:px-10"
    >
      {/* floor text */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)_rotateX(62deg)]"
      >
        <span className="manifesto-floor block w-max text-[34vw] font-semibold leading-none tracking-[-0.05em] text-outline-soft">
          meroUI
        </span>
      </span>

      <p className="relative mx-auto w-full max-w-6xl text-3xl font-medium leading-[1.15] tracking-tight text-zinc-50 [perspective:900px] md:text-5xl lg:text-6xl">
        {words.map((word, i) => (
          <span
            key={i}
            className={`manifesto-word backface-hidden mr-[0.28em] inline-block will-change-transform ${
              i === 0 ? "text-outline" : ""
            }`}
          >
            {word}
          </span>
        ))}
      </p>
      <p className="relative mx-auto mt-16 w-full max-w-6xl font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
        25 words · zero marketing fluff
      </p>
    </section>
  );
}
