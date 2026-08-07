"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const WORD = "meroUI";

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [gone, setGone] = useState(() => pathname !== "/");

  useEffect(() => {
    /* the preloader is a landing-page moment; other routes skip it entirely */
    if (pathname !== "/") return;
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      window.dispatchEvent(new Event("mero:ready"));
      const id = window.setTimeout(() => setGone(true), 0);
      return () => window.clearTimeout(id);
    }

    const ctx = gsap.context(() => {
      gsap.set(".pre-char", {
        rotationX: -90,
        transformOrigin: "50% 100%",
        opacity: 0,
      });
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });
      tl.to(".pre-char", {
        rotationX: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.06,
      })
        .to(".pre-meta", { opacity: 1, duration: 0.4 }, "-=0.5")
        .to(el, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onComplete: () => setGone(true),
        })
        .add(() => window.dispatchEvent(new Event("mero:ready")), "-=0.3");
    }, el);

    return () => ctx.revert();
  }, [pathname]);

  if (gone) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-canvas"
    >
      <p className="preserve-3d flex gap-1 text-[clamp(2.5rem,8vw,5rem)] font-semibold tracking-[-0.04em] [perspective:600px]">
        {WORD.split("").map((ch, i) => (
          <span key={i} className="pre-char backface-hidden inline-block">
            {ch}
          </span>
        ))}
      </p>
      <span className="pre-meta mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-faint opacity-0">
        Loading the depth
      </span>
    </div>
  );
}
