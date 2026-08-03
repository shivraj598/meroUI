"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
