"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll when mobile menu is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl transition-colors ${
        scrolled || open
          ? "border-line bg-canvas/90 supports-[backdrop-filter]:bg-canvas/70"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[64px] max-w-[1220px] items-center justify-between px-5 md:px-6">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-[11px] font-bold tracking-tight text-canvas">
            —
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">meroUI</span>
          <span className="hidden rounded-full border border-line bg-panel px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted md:inline-flex">
            v0.1
          </span>
        </a>

        {/* desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-line bg-panel p-1">
            <a
              href="#index"
              className="rounded-full px-3 py-1 text-sm text-muted transition-colors hover:text-ink"
            >
              Index
            </a>
            <a
              href="#composer"
              className="rounded-full px-3 py-1 text-sm text-muted transition-colors hover:text-ink"
            >
              Composer
            </a>
            <a
              href="/docs"
              className="rounded-full px-3 py-1 text-sm text-muted transition-colors hover:text-ink"
            >
              Docs
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle variant="icon" />
            <a
              href="/docs"
              className="inline-flex h-9 items-center rounded-full bg-ink px-5 text-sm font-medium text-canvas transition-colors hover:bg-ink/90"
            >
              Get started
            </a>
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle variant="icon" />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-line bg-panel text-ink"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[5px] h-0.5 w-full bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-[10px] h-0.5 w-full bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-line bg-canvas transition-all md:hidden ${open ? "max-h-[320px] border-b" : "max-h-0"}`}
      >
        <div className="space-y-1 p-4">
          <a
            href="#index"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-panel"
          >
            Index — components
          </a>
          <a
            href="#composer"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-panel"
          >
            Composer — live demo
          </a>
          <a
            href="/docs"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-panel"
          >
            Documentation
          </a>
          <a
            href="/docs"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-11 items-center justify-center rounded-full bg-ink text-sm font-medium text-canvas"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
