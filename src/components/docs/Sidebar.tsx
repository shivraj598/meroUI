"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COMPONENT_GROUPS, DOC_SECTIONS } from "./nav";

/* Scrollspy targets: the three top-level sections plus every component card,
   so the sidebar mirrors exactly what is in the reading band. */
const SPY_IDS = [
  ...DOC_SECTIONS.map((s) => s.id),
  ...COMPONENT_GROUPS.flatMap((g) => g.items.map((i) => `c-${i.slug}`)),
];

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("overview");

  /* scrollspy: highlight the section currently in the middle band */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* lock body scroll while the mobile drawer is open; close on Escape */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const sectionClass = (id: string) =>
    `block w-full rounded-md px-3 py-1.5 text-left font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
      active === id
        ? "bg-zinc-50 text-zinc-950"
        : "text-zinc-400 hover:text-zinc-50"
    }`;

  const nav = (
    <nav aria-label="Documentation" className="flex flex-col gap-8">
      {/* top-level sections */}
      <div>
        <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          Start here
        </p>
        <ul className="flex flex-col gap-0.5">
          {DOC_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === s.id ? "true" : undefined}
                className={sectionClass(s.id)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* component index, grouped by category */}
      {COMPONENT_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            {group.title}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const id = `c-${item.slug}`;
              const isActive = active === id;
              return (
                <li key={item.slug}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center justify-between rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      isActive
                        ? "bg-zinc-50 text-zinc-950"
                        : item.built
                          ? "text-zinc-300 hover:text-zinc-50"
                          : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {item.name}
                    <span
                      aria-hidden
                      className={`text-[9px] ${
                        isActive
                          ? "text-zinc-600"
                          : item.built
                            ? "text-zinc-500"
                            : "text-zinc-600"
                      }`}
                    >
                      {item.built ? "ready" : "soon"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const brand = (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-6 items-center justify-center bg-zinc-50 text-[11px] font-bold leading-none text-zinc-950">
        m
      </span>
      <span className="font-mono text-sm font-semibold tracking-tight text-zinc-50">
        meroUI
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
        / docs
      </span>
    </Link>
  );

  return (
    <>
      {/* mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur-sm lg:hidden">
        {brand}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="docs-drawer"
          aria-label={open ? "Close documentation menu" : "Open documentation menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex size-8 flex-col items-center justify-center gap-1 rounded-md border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-50 hover:text-zinc-50"
        >
          <span
            className={`h-px w-4 bg-current transition-transform duration-200 ${
              open ? "translate-y-[2.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-4 bg-current transition-transform duration-200 ${
              open ? "-translate-y-[2.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div id="docs-drawer" className="fixed inset-0 z-30 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-zinc-950/70"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Documentation menu"
            className="absolute inset-y-0 left-0 w-72 overflow-y-auto border-r border-zinc-800 bg-zinc-950 px-4 pt-20 pb-10"
          >
            {nav}
          </aside>
        </div>
      )}

      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 overflow-y-auto border-r border-zinc-800 bg-zinc-950 px-4 pt-6 pb-10 lg:block">
        {brand}
        <div className="mt-8">{nav}</div>
      </aside>
    </>
  );
}
