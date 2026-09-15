"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const LINKS = [
  { label: "Index", href: "#index" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Composer", href: "#composer" },
  { label: "Templates", href: "#templates" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-line bg-canvas/90 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-6 md:px-10">
        {/* left: mark */}
        <a href="#top" className="group flex items-center gap-3" aria-label="meroUI home">
          <span className="flex size-[26px] items-center justify-center bg-ink text-[11px] font-bold leading-none text-canvas transition-transform duration-200 group-hover:rotate-3">
            m
          </span>
          <span className="font-mono text-[13px] font-semibold tracking-tight text-ink">
            meroUI
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-panel/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-dim sm:inline-flex">
            <span className="size-1 rounded-full bg-green dot-pulse" aria-hidden />
            v0.1.0
          </span>
        </a>

        {/* center: mono nav - single line */}
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/docs"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
          >
            Docs
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[10px] tracking-[0.14em] text-faint md:inline">
            KATHMANDU — 09:41 NPT
          </span>
          <ThemeToggle />
          <a
            href="/docs"
            className="hidden h-8 items-center rounded-full bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97] sm:inline-flex"
          >
            Get started
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong md:hidden lg:hidden"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-200 ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[5.5px] h-px w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-[11px] h-px w-full bg-current transition-transform duration-200 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile */}
      <div
        className={`overflow-hidden border-line bg-canvas/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-[380px] border-b" : "max-h-0 border-transparent"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-3 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:bg-panel hover:text-ink"
            >
              {l.label} <span aria-hidden>→</span>
            </a>
          ))}
          <a
            href="/docs"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-md px-3 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted hover:bg-panel hover:text-ink"
          >
            Docs <span aria-hidden>→</span>
          </a>
          <div className="mt-2 flex gap-2 border-t border-line pt-4">
            <a
              href="/docs"
              className="flex flex-1 items-center justify-center rounded-full bg-ink py-3 font-mono text-xs uppercase tracking-[0.14em] text-canvas"
            >
              Get started
            </a>
            <a
              href="/templates"
              className="flex flex-1 items-center justify-center rounded-full border border-line py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink"
            >
              Templates
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
