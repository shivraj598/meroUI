"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#install", label: "Install" },
  { href: "https://github.com", label: "GitHub" },
];

export function Footer() {
  const footer = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footer.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".footer-char", { opacity: 1 });
        return;
      }
      gsap.fromTo(
        ".footer-char",
        { rotationX: -85, opacity: 0.25 },
        {
          rotationX: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          transformOrigin: "50% 100%",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <footer
      ref={footer}
      className="relative overflow-hidden bg-zinc-950 px-6 pt-24 pb-10 md:px-10 md:pt-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              meroUI · a UI library
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Built in Nepal. Shipping to the world. Black by default.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex gap-6">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-50 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <h2
          aria-hidden
          className="footer-word select-none text-center text-[16vw] font-semibold leading-[0.95] tracking-tight text-zinc-50 [perspective:600px]"
        >
          {"meroUI".split("").map((c, i) => (
            <span
              key={i}
              className="footer-char inline-block will-change-transform [transform-style:preserve-3d]"
            >
              {c}
            </span>
          ))}
        </h2>

        <div className="mt-8 flex flex-col gap-2 border-t border-zinc-800 pt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} meroUI</p>
          <p>Next.js 16 / React 19 / TypeScript 5</p>
        </div>
      </div>
    </footer>
  );
}
