"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  DOC_SECTIONS,
} from "./nav";

/* Scrollspy targets: the three sections plus every component card. */
const SPY_IDS = [
  ...DOC_SECTIONS.map((s) => s.id),
  ...ALL_COMPONENTS.map((c) => `c-${c.slug}`),
];

type NavItem = { id: string; label: string; built?: boolean };

function buildRows(): (NavItem | { kind: "group"; title: string })[] {
  const rows: (NavItem | { kind: "group"; title: string })[] = [
    { kind: "group", title: "Start" },
    ...DOC_SECTIONS.map((s) => ({ id: s.id, label: s.label })),
  ];
  for (const g of COMPONENT_GROUPS) {
    rows.push({ kind: "group", title: g.title });
    for (const item of g.items) {
      rows.push({ id: `c-${item.slug}`, label: item.name, built: item.built });
    }
  }
  return rows;
}

/**
 * Static documentation sidebar.
 *
 * One fixed column on desktop: brand, section links, then the component index
 * grouped by category. Active item follows the scrollspy. On mobile it becomes
 * a slide-in drawer (hamburger, backdrop, Escape, focus trap, scroll lock).
 */
export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("overview");
  const toggleRef = useRef<HTMLButtonElement>(null);

  const rows = buildRows();

  /* -------------------------- scrollspy -------------------------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      () => {
        /* score every tracked section and component against the reading
           band (40% from top) so the active label follows the element
           actually centered in the band */
        const bandCenter = innerHeight * 0.4;
        let best: string | null = null;
        let bestD = Infinity;
        for (const id of SPY_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.bottom < bandCenter || r.top > bandCenter) continue;
          const d = Math.abs(r.top + r.height / 2 - bandCenter);
          if (d < bestD) {
            bestD = d;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );
    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* Escape closes the mobile drawer; lock scroll, move focus in, trap Tab,
     and restore focus to the toggle on close */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const drawer = document.getElementById("docs-drawer");
      if (!drawer) return;
      const items = Array.from(
        drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLElement>("#docs-drawer a[href]")?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      toggleRef.current?.focus();
    };
  }, [open]);

  const rowCls = (item: NavItem) =>
    `flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
      active === item.id
        ? "bg-zinc-50 text-zinc-950"
        : item.built === false
          ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
          : "text-zinc-300 hover:text-zinc-50 hover:bg-zinc-900"
    }`;

  const nav = (
    <nav aria-label="Documentation" className="flex-1 overflow-y-auto px-2 py-3">
      {rows.map((row) =>
        "title" in row ? (
          <p
            key={row.title}
            className="mt-6 px-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 first:mt-1"
          >
            {row.title}
          </p>
        ) : (
          <a
            key={row.id}
            href={`#${row.id}`}
            onClick={() => setOpen(false)}
            aria-current={active === row.id ? "true" : undefined}
            className={rowCls(row)}
          >
            <span>{row.label}</span>
            {typeof (row as NavItem).built === "boolean" ? (
              <span
                aria-hidden
                className={`text-[9px] ${
                  active === row.id ? "text-zinc-600" : "text-zinc-500"
                }`}
              >
                {(row as NavItem).built ? "rdy" : "soon"}
              </span>
            ) : null}
          </a>
        )
      )}
    </nav>
  );

  return (
    <>
      {/* mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 backdrop-blur-sm lg:hidden">
        <Link href="/" aria-label="meroUI home" className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center bg-zinc-50 text-[11px] font-bold leading-none text-zinc-950">
            m
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-zinc-50">
            meroUI
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400">
            / docs
          </span>
        </Link>
        <button
          ref={toggleRef}
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

      {/* one static sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-zinc-800 bg-zinc-950 lg:flex">
        <Link
          href="/"
          aria-label="meroUI home"
          className="flex h-16 shrink-0 items-center gap-2.5 border-b border-zinc-800 px-4 transition-colors hover:bg-zinc-900"
        >
          <span className="flex size-6 items-center justify-center bg-zinc-50 text-[11px] font-bold leading-none text-zinc-950">
            m
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-zinc-50">
            meroUI
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            docs
          </span>
        </Link>

        {nav}

        <footer className="shrink-0 border-t border-zinc-800 px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
            mero-ui / v0.1.0
          </p>
        </footer>
      </aside>

      {/* mobile drawer (same nav, one panel) */}
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
            className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-zinc-800 bg-zinc-950"
          >
            <header className="flex h-14 shrink-0 items-center border-b border-zinc-800 px-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                meroUI / docs
              </span>
            </header>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}