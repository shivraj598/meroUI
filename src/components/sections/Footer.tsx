"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

const COMPANY = [{ href: "#top", label: "Careers" }];

const PRODUCT = [
  { href: "#features", label: "Features" },
  { href: "#install", label: "Install" },
];

const CONNECT = [
  { href: "https://github.com", label: "GitHub" },
  { href: "https://x.com", label: "X / Twitter" },
];

function Column({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer noopener" : undefined}
              className="text-sm text-zinc-400 underline-offset-4 transition-colors hover:text-zinc-50 hover:underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const footer = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footer.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(".footer-reveal", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
      if (reduced) return;
      /* gentle parallax so the ghosted word settles into the viewport */
      gsap.fromTo(
        ".footer-ghost",
        { yPercent: 14 },
        {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom",
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
      {/* ghosted outline word, fully visible behind the footer */}
      <span
        aria-hidden
        className="footer-ghost pointer-events-none absolute bottom-[-2vw] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[24vw] font-semibold leading-none tracking-[-0.05em] text-outline-soft will-change-transform lg:text-[28vw]"
      >
        meroUI
      </span>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* header: brand + premium CTA */}
        <div className="footer-reveal flex flex-col gap-8 border-b border-zinc-800 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              meroUI · a UI library
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
              Have a project in mind?
              <br />
              Ship it with meroUI.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              Open-source library, plus select premium builds. Careers, install,
              and everything else, below.
            </p>
          </div>
          <Button href="mailto:hello@mero.dev" size="lg">
            Request premium
          </Button>
        </div>

        {/* link grid */}
        <div className="footer-reveal grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-4">
          <Column className="md:col-span-1" title="Company" links={COMPANY} />
          <Column
            className="md:col-span-1"
            title="Product"
            links={PRODUCT}
          />
          <Column
            className="md:col-span-1"
            title="Connect"
            links={CONNECT.map((l) => ({ ...l, external: true }))}
          />
          {/* dev credit */}
          <div className="md:col-span-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Built by
            </p>
            <p className="mt-4 text-sm text-zinc-400">
              Shivraj Timilsena
              <span className="mt-1 block text-zinc-600">
                Kathmandu, Nepal
              </span>
            </p>
          </div>
        </div>

        {/* meta row */}
        <div className="footer-reveal relative z-10 flex flex-col gap-2 border-t border-zinc-800 pt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} meroUI · Shivraj Timilsena</p>
          <p>Next.js 16 / React 19 / TypeScript 5</p>
        </div>
      </div>
    </footer>
  );
}