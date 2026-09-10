"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

const LINKS = [
  { label: "Index", href: "#index" },
  { label: "Why", href: "#why" },
  { label: "Playground", href: "#playground" },
  { label: "Work", href: "#work" },
];

/**
 * Landing nav: transparent over the hero, blur + hairline after scroll.
 * Mobile gets a dropdown panel. Single-line on desktop.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="meroUI home"
        >
          <span className="flex size-6 items-center justify-center bg-ink text-[11px] font-bold leading-none text-canvas transition-transform duration-200 group-hover:-rotate-6">
            m
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-ink">
            meroUI
          </span>
          <span className="hidden rounded-full border border-line px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-dim sm:inline-block">
            v0.1.0
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Button href="/templates" variant="ghost" size="sm" className="hidden lg:inline-flex">
            Templates
          </Button>
          <Button href="/docs" size="sm" className="hidden sm:inline-flex">
            Get started
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-8 items-center justify-center rounded-md border border-line text-ink transition-colors hover:border-line-strong md:hidden"
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

      {/* mobile panel */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 border-b border-line bg-canvas/95 backdrop-blur-md" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-md px-2 py-3 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:bg-panel hover:text-ink"
            >
              {link.label}
              <span aria-hidden className="text-dim">→</span>
            </a>
          ))}
          <div className="flex gap-2 border-t border-line pt-4">
            <Button href="/docs" size="sm" className="flex-1">
              Get started
            </Button>
            <Button href="/templates" variant="ghost" size="sm" className="flex-1">
              Templates
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
