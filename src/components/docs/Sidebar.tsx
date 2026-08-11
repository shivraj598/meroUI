"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ALL_COMPONENTS, COMPONENT_GROUPS, DOC_SECTIONS } from "./nav";
import { ThemeToggle } from "@/components/ThemeToggle";

/* Scrollspy targets: the three /docs sections. Component pages highlight by
   path instead, so no component anchors are tracked here. */
const SPY_IDS = DOC_SECTIONS.map((s) => s.id);

type NavItem = { id: string; label: string; built?: boolean; href: string; icon: string };

type Section = { id: string; label: string; items: NavItem[] };

/* per-item stroke icons, same 13px / 1.8 weight system as the design */
function ItemIcon({ kind }: { kind: string }) {
  const p: Record<string, React.ReactNode> = {
    overview: (
      <g>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.8V21h14V9.8" />
      </g>
    ),
    installation: (
      <g>
        <path d="M4 17l6-6-6-6" />
        <path d="M12 19h8" />
      </g>
    ),
    components: (
      <g>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </g>
    ),
    button: <path d="M4 4l7.3 15.9 2.6-6.8 6.8-2.6L4 4z" />,
    badge: <path d="M12 3.5l2.5 5.3 5.8.7-4.3 4 1.1 5.8-5.1-2.8-5.1 2.8 1.1-5.8-4.3-4 5.8-.7L12 3.5z" />,
    progress: (
      <g>
        <path d="M20 12a8 8 0 1 1-2.3-5.6" />
        <path d="M12 12l4.4-4.4" />
        <path d="M12 12a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" fill="currentColor" stroke="none" />
      </g>
    ),
    skeleton: <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 2.5" />,
    toast: (
      <g>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </g>
    ),
    input: (
      <g>
        <path d="M12 5v14" />
        <path d="M9 7.5h6M9 16.5h6" />
      </g>
    ),
    toggle: (
      <g>
        <rect x="3" y="8" width="18" height="8" rx="4" />
        <circle cx="16.5" cy="12" r="2.2" />
      </g>
    ),
    tabs: (
      <g>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 4v5" />
      </g>
    ),
    card: (
      <g>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </g>
    ),
    table: (
      <g>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M9 10v10" />
      </g>
    ),
    modal: (
      <g>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8h18" />
      </g>
    ),
    tooltip: (
      <g>
        <path d="M21 12a8 8 0 0 1-8 8H4l2.4-2.7A8 8 0 1 1 21 12z" />
        <path d="M12 8v4" />
        <path d="M12 15.5v.5" />
      </g>
    ),
  };
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {p[kind]}
    </svg>
  );
}

const COMPONENT_ICONS: Record<string, string> = {
  button: "button",
  badge: "badge",
  progress: "progress",
  skeleton: "skeleton",
  toast: "toast",
  input: "input",
  toggle: "toggle",
  tabs: "tabs",
  card: "card",
  table: "table",
  modal: "modal",
  tooltip: "tooltip",
};

const DOC_ICONS: Record<string, string> = {
  overview: "overview",
  installation: "installation",
  components: "components",
};

function buildSections(): Section[] {
  return [
    {
      id: "start",
      label: "Start",
      items: DOC_SECTIONS.map((s) => ({
        id: s.id,
        label: s.label,
        href: `/docs#${s.id}`,
        icon: DOC_ICONS[s.id],
      })),
    },
    ...COMPONENT_GROUPS.map((g) => ({
      id: `group-${g.title.toLowerCase()}`,
      label: g.title,
      items: g.items.map((it) => ({
        id: `c-${it.slug}`,
        label: it.name,
        built: it.built,
        href: `/components/${it.slug}`,
        icon: COMPONENT_ICONS[it.slug] ?? "components",
      })),
    })),
  ];
}

function Chevron() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--ink-3)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
    </svg>
  );
}

/**
 * The nav card itself: workspace header, quick search, accent action and the
 * grouped item list with an animated hover/active pill. Rendered twice — in
 * the desktop sticky column and inside the mobile drawer — each instance
 * keeps its own pill geometry so the two never fight over refs.
 */
function SidebarNav({
  current,
  onNavigate,
}: {
  current: string | null;
  onNavigate: () => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);
  const [query, setQuery] = useState("");
  const sections = buildSections();
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const q = query.trim().toLowerCase();
  const filtered = q
    ? sections
        .map((s) => ({
          ...s,
          items: s.items.filter((i) => i.label.toLowerCase().includes(q)),
        }))
        .filter((s) => s.items.length > 0)
    : sections;

  /* move the pill under the hovered entry, or the active one when idle */
  useLayoutEffect(() => {
    const container = navRef.current;
    const target = itemRefs.current[hovered ?? current ?? ""];
    if (!container || !target || q) {
      setBox(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setBox({
      top: targetRect.top - containerRect.top,
      height: targetRect.height,
    });
  }, [hovered, current, q]);

  /* "/" focuses the quick search (same shortcut the kbd hints at) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="rounded-xl bg-surface p-2 shadow-raised">
      {/* workspace row */}
      <Link
        href="/"
        onClick={onNavigate}
        className="mb-2 flex w-full items-center gap-2.5 rounded-md p-1.5 text-left
          transition-[background-color,transform] duration-100 hover:bg-hover active:scale-[0.96]"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-ink text-[13px] font-semibold text-canvas">
          m
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium leading-tight text-ink">
            meroUI
          </span>
          <span className="block truncate text-[11px] leading-tight text-ink-3">
            Component library
          </span>
        </span>
        <Chevron />
      </Link>

      {/* quick search */}
      <label className="mb-1 flex h-8 items-center gap-2 rounded-md bg-inset px-2.5 shadow-hairline">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ink-3)"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          ref={searchRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Quick search"
          aria-label="Quick search"
          className="min-w-0 flex-1 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-ink-3"
        />
        <kbd className="flex size-4.5 items-center justify-center rounded-[5px] bg-surface text-[10px] text-ink-3 shadow-hairline">
          /
        </kbd>
      </label>

      {/* accent action */}
      <Link
        href="/templates"
        onClick={onNavigate}
        className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px]
          font-medium text-accent transition-[background-color,transform] duration-100 hover:bg-accent-tint active:scale-[0.96]"
      >
        <span className="min-w-0 flex-1 truncate text-left">Browse templates</span>
        <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
      </Link>

      {/* items */}
      <div
        ref={navRef}
        onMouseLeave={() => setHovered(null)}
        className="relative flex flex-col gap-2"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition:
              "top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease",
          }}
        />
        {filtered.map((section) => (
          <div key={section.id}>
            <div className="px-2 pb-1 pt-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-3">
              {section.label}
            </div>
            <div className="flex flex-col gap-px">
              {section.items.map((item) => {
                const isActive = item.id === current;
                return (
                  <a
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[item.id] = el;
                    }}
                    href={item.href}
                    onClick={onNavigate}
                    onMouseEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onBlur={() => setHovered(null)}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative z-10 flex w-full items-center gap-2 rounded-[7px] px-2 py-1.5 text-left
                      transition-[color,transform] duration-150 active:scale-[0.96]"
                  >
                    <span className={isActive ? "text-ink" : "text-ink-3"}>
                      <ItemIcon kind={item.icon} />
                    </span>
                    <span
                      className={`min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 ${
                        isActive ? "font-medium text-ink" : "text-ink-2"
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.id === "components" && (
                      <span
                        className={`pop-in flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10.5px] font-semibold tabular-nums ${
                          isActive
                            ? "bg-surface text-ink-2 shadow-hairline"
                            : "bg-accent-tint text-accent-ink"
                        }`}
                      >
                        {ALL_COMPONENTS.length}
                      </span>
                    )}
                    {item.built === false && (
                      <span className="rounded-full bg-accent-tint px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-ink">
                        soon
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Documentation sidebar in the pasted workspace style: a raised card with a
 * workspace header, quick search, accent action and grouped nav where the
 * hovered/active entry gets an animated pill. The active component follows
 * the current /components/[slug] route; on the /docs index it follows the
 * scrollspy. Below lg it becomes a slide-in drawer.
 */
export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("overview");
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* which single entry is active: the open component page, or on the /docs
     index the section nearest the reading band */
  const match = pathname.match(/^\/components\/([^/]+)$/);
  const onDocs = pathname === "/docs";
  const current = match ? `c-${match[1]}` : onDocs ? activeSection : null;

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

  /* Escape closes the mobile drawer; lock scroll, move focus in, trap Tab */
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
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
      toggle?.focus();
    };
  }, [open]);

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
          <SidebarNav current={current} onNavigate={() => {}} />
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
            <nav aria-label="Site" className="flex shrink-0 items-center gap-1 border-b border-line px-3 py-2">
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
            <div className="p-3">
              <SidebarNav current={current} onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
