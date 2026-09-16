"use client";

import { useEffect, useState } from "react";

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
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${scrolled || open ? "border-zinc-200 bg-[#fcfcf9]/90 backdrop-blur" : "border-transparent bg-transparent"}`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-sm bg-zinc-900 text-xs font-bold text-white">—</span>
          <span className="text-sm font-semibold tracking-tight text-zinc-900">meroUI</span>
          <span className="hidden rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] tracking-wide text-zinc-500 md:inline">AI · 2026</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#index" className="text-sm text-zinc-500 hover:text-zinc-900">Index</a>
          <a href="#composer" className="text-sm text-zinc-500 hover:text-zinc-900">Composer</a>
          <a href="/docs" className="text-sm text-zinc-500 hover:text-zinc-900">Docs</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/docs" className="hidden rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-black md:inline-flex">Get started</a>
          <button onClick={() => setOpen((v) => !v)} className="flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white md:hidden" aria-label="Menu">
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-0.5 w-full bg-zinc-900 transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[5px] h-0.5 w-full bg-zinc-900 transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[10px] h-0.5 w-full bg-zinc-900 transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>
      <div className={`overflow-hidden border-zinc-200 bg-[#fcfcf9] transition-all md:hidden ${open ? "max-h-64 border-b" : "max-h-0"}`}>
        <div className="space-y-1 p-4">
          <a href="#index" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100">Index</a>
          <a href="#composer" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100">Composer</a>
          <a href="/docs" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm text-zinc-700 hover:bg-zinc-100">Docs</a>
        </div>
      </div>
    </header>
  );
}
