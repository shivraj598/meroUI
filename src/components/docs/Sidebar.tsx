"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { COMPONENT_GROUPS, DOC_SECTIONS } from "./nav";
import { ThemeToggle } from "@/components/ThemeToggle";

/* Scrollspy targets: the three /docs sections. Component pages highlight by
   path instead, so no component anchors are tracked here. */
const SPY_IDS = DOC_SECTIONS.map((s) => s.id);

type NavItem = { id: string; label: string; built?: boolean; href: string };

type Group = {
  id: string;
  title: string;
  icon: string;
  children: NavItem[];
};

const GROUP_ICONS: Record<string, string> = {
  Start: "\u25c6",
  Feedback: "\u25cf",
  Controls: "\u2327",
  Display: "\u25a2",
};

function buildGroups(): Group[] {
  return [
    {
      id: "start",
      title: "Start",
      icon: GROUP_ICONS.Start,
      children: DOC_SECTIONS.map((s) => ({
        id: s.id,
        label: s.label,
        href: `/docs#${s.id}`,
      })),
    },
    ...COMPONENT_GROUPS.map((g) => ({
      id: `group-${g.title.toLowerCase()}`,
      title: g.title,
      icon: GROUP_ICONS[g.title] ?? "\u25a3",
      children: g.items.map((it) => ({
        id: `c-${it.slug}`,
        label: it.name,
        built: it.built,
        href: `/components/${it.slug}`,
      })),
    })),
  ];
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`size-3.5 shrink-0 text-faint transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m6 8 4 4 4-4" />
    </svg>
  );
}

/**
 * Documentation sidebar in the classic docs-shell style: a sticky grouped
 * index where each category is collapsible, sub-links sit on a left border
 * rail, and the active entry is a filled pill. The active component follows
 * the current /components/[slug] route; on the /docs index it follows the
 * scrollspy. Below lg it becomes a slide-in drawer.
 */
export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("overview");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const groups = buildGroups();
    const state: Record<string, boolean> = {};
    for (const g of groups) state[g.id] = true;
    return state;
  });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const groups = buildGroups();

  /* which single entry is active: the open component page, or on the /docs
     index the section nearest the reading band */
  const match = pathname.match(/^\/components\/([^/]+)$/);
  const onDocs = pathname === "/docs";
  const current = match ? `c-${match[1]}` : onDocs ? activeSection : null;

  const toggleGroup = (id: string) =>
    setOpenGroups((o) => ({ ...o, [id]: !o[id] }));

  /* -------------------------- scrollspy -------------------------- */
  useEffect(() => {
    if (!onDocs) return;
    const obs = new IntersectionObserver(
      () => {
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
        if (best) setActiveSection(best);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );
    SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onDocs]);

  /* keep the group holding the active entry open */
  const openGroupsRef = useRef(openGroups);
  useEffect(() => {
    openGroupsRef.current = openGroups;
  }, [openGroups]);
  useEffect(() => {
    if (!current) return;
    const holder = groups.find((g) => g.children.some((c) => c.id === current));
    if (holder && !openGroupsRef.current[holder.id]) {
      setOpenGroups((o) => ({ ...o, [holder.id]: true }));
    }
  }, [current, groups]);

  /* Escape closes the mobile drawer; lock scroll, move focus in, trap Tab */
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

  const linkCls = (item: NavItem) =>
    `relative z-10 flex w-full items-center justify-between gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
      current === item.id
        ? "bg-ink font-medium text-canvas"
        : "text-muted hover:bg-panel/60 hover:text-ink"
    }`;

  const renderNav = (
    <div className="flex flex-col gap-6 pb-8">
      {groups.map((g) => (
        <div key={g.id} className="flex flex-col">
          <button
            type="button"
            onClick={() => toggleGroup(g.id)}
            aria-expanded={!!openGroups[g.id]}
            className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm font-medium text-ink transition-colors hover:text-ink"
          >
            <span aria-hidden className="w-4 text-center text-faint">
              {g.icon}
            </span>
            <span className="min-w-0 flex-1 truncate">{g.title}</span>
            <Chevron open={!!openGroups[g.id]} />
          </button>

          {openGroups[g.id] && (
            <div className="mt-1 ml-4 flex flex-col space-y-0.5 border-l border-line pl-2">
              {g.children.map((item) => (
                <div key={item.id} className="relative">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={current === item.id ? "true" : undefined}
                    className={linkCls(item)}
                  >
                    <span className="truncate">{item.label}</span>
                    {typeof item.built === "boolean" && (
                      <span
                        aria-hidden
                        className="ml-2 shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-dim"
                      >
                        {item.built ? "rdy" : "soon"}
                      </span>
                    )}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-canvas/90 px-4 backdrop-blur-sm lg:hidden">
        <Link href="/" aria-label="meroUI home" className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center bg-ink text-[11px] font-bold leading-none text-canvas">
            m
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-ink">
            meroUI
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            / docs
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle label={false} />
          <button
            ref={toggleRef}
            type="button"
          aria-expanded={open}
          aria-controls="docs-drawer"
          aria-label={open ? "Close documentation menu" : "Open documentation menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex size-8 flex-col items-center justify-center gap-1 rounded-md border border-line text-ink transition-colors hover:border-ink hover:text-ink"
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
      </div>

      {/* desktop sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[4.75rem] max-h-[calc(100vh-5.75rem)] overflow-y-auto pb-2 pr-1">
          {renderNav}
        </div>
      </aside>

      {/* mobile drawer */}
      {open && (
        <div id="docs-drawer" className="fixed inset-0 z-30 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-scrim/70"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Documentation menu"
            className="absolute inset-y-0 left-0 flex w-72 flex-col overflow-y-auto border-r border-line bg-canvas"
          >
            <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center border-b border-line bg-canvas px-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                meroUI / docs
              </span>
            </header>
            <nav aria-label="Site" className="flex items-center gap-1 border-b border-line px-3 py-2">
              <Link
                href="/docs"
                onClick={() => setOpen(false)}
                className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] bg-ink text-canvas"
              >
                Docs
              </Link>
              <Link
                href="/templates"
                onClick={() => setOpen(false)}
                className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
              >
                Templates
              </Link>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="ml-auto rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
              >
                Home
              </Link>
            </nav>
            <div className="px-3 pt-4">{renderNav}</div>
          </aside>
        </div>
      )}
    </>
  );
}