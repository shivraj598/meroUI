"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

const CUBE_FACES = [
  "rotateY(0deg) translateZ(80px)",
  "rotateY(180deg) translateZ(80px)",
  "rotateY(90deg) translateZ(80px)",
  "rotateY(-90deg) translateZ(80px)",
  "rotateX(90deg) translateZ(80px)",
  "rotateX(-90deg) translateZ(80px)",
];

export function FinalCTA() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-fill",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 25%",
            scrub: 0.6,
          },
        }
      );
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 40%" },
      });

      if (!reduced) {
        gsap.to(".cube", {
          rotationX: 360,
          rotationY: 360,
          duration: 22,
          repeat: -1,
          ease: "none",
        });
        gsap.to(".cube-wrap", {
          y: -26,
          yoyo: true,
          repeat: -1,
          duration: 3.2,
          ease: "sine.inOut",
        });
      }
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={section}
      className="relative overflow-hidden bg-zinc-100"
    >
      <div className="cta-fill absolute inset-0 bg-zinc-950 will-change-[clip-path]" />

      <div className="relative z-10 px-6 py-32 md:px-10 md:py-48">
        <div className="cta-content mx-auto w-full max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            08 · one command away
          </p>
          <h2 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-zinc-50 md:text-8xl">
            Stop building UIs.
            <br />
            Start building products.
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Button href="#install">Get started</Button>
            <a
              href="#features"
              className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-50 hover:underline"
            >
              view the features
            </a>
          </div>
        </div>

        {/* rotating cube */}
        <div className="cube-wrap pointer-events-none absolute top-1/2 right-[7%] z-10 hidden -translate-y-1/2 [perspective:800px] lg:block">
          <div className="cube preserve-3d relative size-40 will-change-transform">
            {CUBE_FACES.map((face) => (
              <div
                key={face}
                aria-hidden
                className="absolute inset-0 border border-zinc-50/60 bg-zinc-50/5"
                style={{ transform: face }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
