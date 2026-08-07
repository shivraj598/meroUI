"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
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

const PANEL_W = 288; // px, matches w-72
const RAIL_W = 64; // px, matches w-16

/* faint CRT beam sweep for the rail and the index panel */
const SCANLINES =
  "repeating-linear-gradient(0deg, rgb(63 63 70 / 0.14) 0px, rgb(63 63 70 / 0.14) 1px, transparent 1px, transparent 3px)";

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
 * INDEX DOCK - a tactical-telemetry documentation rail.
 *
 * At rest it is a 64px strip: a spinning crosshair brand mark, clickable
 * section numerals, the full 12-glyph component index, a scanline tick and a
 * live POS/COMP readout. Hovering it (or pressing the INDEX button) GSAP-
 * expands it into a full 288px index panel with staggered reveals and a
 * sliding beam that tracks the active section. Fully keyboard accessible and
 * reduced-motion safe.
 */
export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("overview");
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linkMap = useRef(new Map<string, HTMLElement>());
  const beamTween = useRef<gsap.core.Tween | null>(null);

  /* ref mirrors keep the beam/readout helpers stable for effects */
  const activeRef = useRef<string | null>(active);
  const reducedRef = useRef(reduced);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const rows = buildRows();
  const posLabel = useCallback(() => {
    const a = activeRef.current;
    if (!a) return "POS --/--";
    const si = DOC_SECTIONS.findIndex((s) => s.id === a);
    if (si >= 0) return `POS 0${si + 1}/${DOC_SECTIONS.length}`;
    const ci = ALL_COMPONENTS.findIndex((c) => `c-${c.slug}` === a);
    if (ci >= 0)
      return `COMP ${String(ci + 1).padStart(2, "0")}/${String(
        ALL_COMPONENTS.length
      ).padStart(2, "0")}`;
    return "POS --/--";
  }, []);

  /* -------------------------- scrollspy -------------------------- */
  useEffect(() => {
    const obs = new IntersectionObserver(
      () => {
        /* score every tracked section and component against the reading
           band (40% from top), not just the one entry that crossed, so the
           active label follows the element actually centered in the band */
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

  /* ------------------------- reduced motion ---------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
      reducedRef.current = e.matches;
    };
    reducedRef.current = mq.matches;
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* position the active beam + readout */
  const syncBeam = useCallback((immediate: boolean) => {
    const beam = beamRef.current;
    if (!beam) return;
    beamTween.current?.kill();
    const a = activeRef.current;
    const target = a ? linkMap.current.get(a) : undefined;
    const y = target ? target.offsetTop : 0;
    if (reducedRef.current || immediate) {
      beamTween.current = gsap.set(beam, { y });
    } else {
      beamTween.current = gsap.to(beam, {
        y,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, []);

  /* ----------------------------- mount --------------------------- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      syncBeam(true);
      if (reduced) return;
      /* rail enters from the left */
      gsap.from(root, {
        x: -RAIL_W,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.25,
      });
      /* brand crosshair slowly turns like a dial */
      gsap.to(markerRef.current, {
        rotation: 360,
        duration: 26,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }, root);
    return () => ctx.revert();
  }, [reduced, syncBeam]);

  /* pointer events depending on window size; attach once */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const onEnter = () => setOpen(true);
    const onLeave = () => setOpen(false);
    const onDown = (e: PointerEvent) => {
      /* only the desktop dock closes on outside press; the mobile drawer
         manages its own backdrop, hamburger and link presses */
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      if (!root.contains(e.target as Node)) setOpen(false);
    };
    /* hover-open/close only when a fine pointer + no reduced motion */
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !reduced) {
      root.addEventListener("pointerenter", onEnter);
      root.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("pointerdown", onDown);
    return () => {
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [reduced]);

  /* panel open/close animation */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (reduced) {
      panel.style.transform = open ? "translateX(0px)" : "translateX(-288px)";
      return;
    }
    const ctx = gsap.context(() => {
      if (open) {
        gsap.to(panel, { x: 0, duration: 0.45, ease: "power3.out" });
        gsap.fromTo(
          ".index-group",
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.045,
            delay: 0.12,
            overwrite: "auto",
          }
        );
      } else {
        gsap.to(panel, { x: -PANEL_W, duration: 0.35, ease: "power3.inOut" });
      }
    }, panel);
    return () => ctx.revert();
  }, [open, reduced]);

  /* active sidebar: slide beam + update telemetry readout */
  useEffect(() => {
    const pos = posRef.current;
    if (pos) pos.textContent = posLabel();
    syncBeam(reduced);
    let pulse: gsap.core.Tween | null = null;
    if (!reduced && pos) {
      pulse = gsap.fromTo(
        pos,
        { opacity: 0.2 },
        { opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
    return () => {
      if (pulse) pulse.kill();
    };
  }, [active, reduced, syncBeam, posLabel]);

  /* Escape closes the dock; lock body scroll only for the mobile drawer,
     where the disclosure must also move focus in, trap Tab, and restore */
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
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const mobile = !mqLg.matches;
    if (mobile) {
      document.body.style.overflow = "hidden";
      document
        .querySelector<HTMLElement>("#docs-drawer a[href]")
        ?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (mobile) toggleRef.current?.focus();
    };
  }, [open]);

  /* the "components" numeral lights for any component card too */
  const railIsOn = (id: string) =>
    active === id || (id === "components" && (active ?? "").startsWith("c-"));

  const rowCls = (item: NavItem) =>
    `index-group flex items-center justify-between gap-3 rounded-md px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
      active === item.id
        ? "bg-zinc-50 text-zinc-950"
        : item.built === false
          ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
          : "text-zinc-300 hover:text-zinc-50 hover:bg-zinc-900"
    }`;

  /* desktop panel navigation (registered for the beam) */
  const panelNav = (
    <nav
      ref={navRef}
      aria-label="Documentation"
      className="relative flex-1 overflow-y-auto px-2 pt-2 pb-8"
    >
      <span
        ref={beamRef}
        aria-hidden
        className="absolute left-0 top-0 h-8 w-[2px] bg-zinc-50"
        style={{ transform: "translateY(0px)" }}
      />
      {rows.map((row) =>
        "title" in row ? (
          <p
            key={row.title}
            className="index-group mt-6 px-4 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400 first:mt-1"
          >
            [ {row.title} ]
          </p>
        ) : (
          <a
            key={row.id}
            href={`#${row.id}`}
            onClick={() => setOpen(false)}
            aria-current={active === row.id ? "true" : undefined}
            ref={(el) => {
              if (el) linkMap.current.set(row.id, el);
              else linkMap.current.delete(row.id);
            }}
            className={rowCls(row as NavItem)}
          >
            <span>{row.label}</span>
            {typeof (row as NavItem).built === "boolean" && (
              <span
                aria-hidden
                className={`text-[9px] ${
                  active === row.id ? "text-zinc-400" : "text-zinc-400"
                }`}
              >
                {(row as NavItem).built ? "rdy" : "soon"}
              </span>
            )}
          </a>
        )
    )}
    </nav>
  );

  /* brand mark: spinning crosshair dial */
  const mark = (
    <span
      ref={markerRef}
      className="relative flex size-8 items-center justify-center border border-zinc-700"
      style={{ transformOrigin: "50% 50%" }}
    >
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-zinc-700" />
      <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-zinc-700" />
      <span className="font-mono text-[10px] text-zinc-50">m</span>
    </span>
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
            className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-zinc-800 bg-zinc-950"
          >
            <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                [ index ]
              </span>
              <span className="font-mono text-[9px] text-zinc-400">
                meroUI / docs
              </span>
            </header>
            <nav aria-label="Documentation" className="flex-1 overflow-y-auto px-3 pt-2 pb-8">
              {rows.map((row) =>
                "title" in row ? (
                  <p
                    key={row.title}
                    className="index-group mt-6 px-4 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400 first:mt-1"
                  >
                    [ {row.title} ]
                  </p>
                ) : (
                  <a
                    key={row.id}
                    href={`#${row.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === row.id ? "true" : undefined}
                    className={rowCls(row as NavItem)}
                  >
                    <span>{row.label}</span>
                  </a>
                )
              )}
            </nav>
          </aside>
        </div>
      )}

      {/* desktop INDEX DOCK */}
      <div
        ref={rootRef}
        className="fixed inset-y-0 left-0 z-30 hidden lg:flex"
      >
        {/* collapsed rail */}
        <div className="flex w-16 flex-col items-stretch border-r border-zinc-800 bg-zinc-950">
          <Link
            href="/"
            aria-label="meroUI home"
            className="flex h-16 items-center justify-center border-b border-zinc-800 transition-colors hover:bg-zinc-900"
          >
            {mark}
          </Link>

          {/* section numerals */}
          <div className="flex flex-col border-b border-zinc-800 py-1">
            {DOC_SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-label={`${s.label}, section ${String(i + 1).padStart(2, "0")}`}
                aria-current={railIsOn(s.id) ? "true" : undefined}
                className={`flex h-9 items-center justify-center font-mono text-[11px] tracking-[0.2em] transition-colors duration-200 ${
                  railIsOn(s.id)
                    ? "bg-zinc-50 text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-50"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </a>
            ))}
          </div>

          {/* 12-glyph component index; each is a real quick-jump link */}
          <div className="grid flex-1 content-start gap-px overflow-y-auto border-b border-zinc-800 py-1">
            {ALL_COMPONENTS.map((c) => (
              <a
                key={c.slug}
                href={`#c-${c.slug}`}
                aria-label={`${c.name} component`}
                title={c.name}
                className={`flex h-7 items-center justify-center font-mono text-[10px] transition-colors duration-200 ${
                  active === `c-${c.slug}`
                    ? "bg-zinc-50 text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-400"
                }`}
              >
                {c.glyph}
              </a>
            ))}
          </div>

          {/* readout + expand control */}
          <div className="border-t border-zinc-800">
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-6 opacity-50"
                style={{ backgroundImage: SCANLINES }}
              />
              <span
                ref={posRef}
                className="block py-2 text-center font-mono text-[9px] tracking-[0.18em] text-zinc-400"
              >
                POS 01/03
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="index-panel"
              aria-label={
                open ? "Collapse documentation index" : "Expand documentation index"
              }
              className="flex h-10 w-full items-center justify-center border-t border-zinc-800 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400 transition-colors duration-200 hover:text-zinc-50"
            >
              {open ? "close <<" : "index >>"}
            </button>
          </div>
        </div>

        {/* expanded panel */}
        <aside
          id="index-panel"
          ref={panelRef}
          inert={!open}
          aria-hidden={!open}
          className="absolute inset-y-0 left-16 flex w-72 flex-col border-r border-zinc-800 bg-zinc-950 will-change-transform"
          style={{ transform: "translateX(-288px)" }}
        >
          <header className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              [ index ]
            </span>
            <span className="font-mono text-[9px] text-zinc-400">
              meroUI / docs
            </span>
          </header>
          {panelNav}
          <footer
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-6 opacity-40"
            style={{ backgroundImage: SCANLINES }}
          />
          <span className="border-t border-zinc-800 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
            dark-tech / monochrome / keyboard-first
          </span>
        </aside>
      </div>
    </>
  );
}