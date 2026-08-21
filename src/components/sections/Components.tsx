"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ALL_COMPONENTS, BUILT_COUNT, COMPONENT_GROUPS } from "@/components/docs/nav";

const GROUP_OF = new Map(
  COMPONENT_GROUPS.flatMap((g) => g.items.map((i) => [i.slug, g.title]))
);

/** Static specimen compositions — pure markup, no library imports,
    each one a miniature of its component drawn in the brand palette. */
const SPECIMENS: Record<string, React.ReactNode> = {
  button: (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-8 items-center rounded-full bg-ink px-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-canvas">
        Get started
      </span>
      <span className="inline-flex h-8 items-center rounded-full border border-line-strong px-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink">
        Docs
      </span>
    </div>
  ),
  badge: (
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-canvas">
        stable
      </span>
      <span className="flex items-center gap-1.5 rounded-full border border-line bg-panel px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
        <span aria-hidden className="dot-pulse size-1.5 rounded-full bg-ink" />
        live
      </span>
    </div>
  ),
  progress: (
    <div className="w-full max-w-[210px]">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        <span>shipping</span>
        <span>72%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line-strong">
        <div className="progress-grow h-full rounded-full bg-ink" style={{ width: "72%" }} />
      </div>
    </div>
  ),
  skeleton: (
    <div className="flex w-full max-w-[190px] items-start gap-3">
      <span aria-hidden className="size-9 shrink-0 animate-pulse rounded-full bg-line-strong motion-reduce:animate-none" />
      <span aria-hidden className="flex w-full flex-col gap-2 pt-1">
        <span className="h-2.5 w-3/4 animate-pulse rounded-md bg-line-strong motion-reduce:animate-none" />
        <span className="h-2.5 w-full animate-pulse rounded-md bg-line-strong motion-reduce:animate-none" />
        <span className="h-2.5 w-1/2 animate-pulse rounded-md bg-line-strong motion-reduce:animate-none" />
      </span>
    </div>
  ),
  toast: (
    <div className="flex w-full max-w-[215px] flex-col gap-2">
      <div className="flex items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2 shadow-card">
        <span aria-hidden className="dot-pulse size-1.5 shrink-0 rounded-full bg-green" />
        <span className="font-mono text-[10px] text-ink">Deployed to production</span>
      </div>
      <div className="ml-4 flex items-center gap-2 rounded-md border border-line bg-canvas/70 px-3 py-2 opacity-60">
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-line-strong" />
        <span className="font-mono text-[10px] text-muted">Draft saved</span>
      </div>
    </div>
  ),
  input: (
    <div className="w-full max-w-[200px]">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        Email
      </span>
      <div className="mt-2 flex h-9 items-center rounded-md border border-ink bg-panel px-3 font-mono text-[11px] text-muted">
        you@studio.dev
        <span aria-hidden className="caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-px bg-ink" />
      </div>
    </div>
  ),
  toggle: (
    <div className="flex items-center gap-4">
      <span className="relative h-7 w-13 rounded-full border border-ink bg-ink">
        <span aria-hidden className="absolute left-[calc(100%-1.5rem)] top-1/2 size-5 -translate-y-1/2 rounded-full bg-canvas" />
      </span>
      <span className="relative h-7 w-13 rounded-full border border-line-strong bg-panel">
        <span aria-hidden className="absolute left-1 top-1/2 size-5 -translate-y-1/2 rounded-full bg-dim" />
      </span>
    </div>
  ),
  tabs: (
    <div className="w-full max-w-[210px]">
      <div className="flex items-center gap-1 border-b border-line">
        {["code", "props", "a11y"].map((t, i) => (
          <span
            key={t}
            className={`relative -mb-px px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] ${
              i === 0 ? "text-ink" : "text-dim"
            }`}
          >
            {t}
            {i === 0 && <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-ink" />}
          </span>
        ))}
      </div>
      <p className="pt-4 font-mono text-[10px] leading-5 text-muted">&lt;Button /&gt;</p>
    </div>
  ),
  "prompt-bar": (
    <div className="w-full max-w-[235px] rounded-md border border-line bg-panel px-3 py-2.5">
      <div className="flex items-center gap-2 font-mono text-[10px]">
        <span className="rounded bg-canvas px-1.5 py-0.5 text-ink">@docs</span>
        <span className="text-muted">how do i theme this</span>
        <span aria-hidden className="caret ml-auto inline-block h-3 w-1.5 bg-ink" />
      </div>
      <div className="mt-2 flex items-center gap-1.5 border-t border-line pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
        <span className="rounded border border-line px-1.5 py-0.5">/commands</span>
        <span className="rounded border border-line px-1.5 py-0.5">gpt-5</span>
      </div>
    </div>
  ),
  card: (
    <div className="w-full max-w-[185px] rounded-md border border-line bg-panel/60 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Usage</p>
      <div aria-hidden className="mt-2 space-y-1.5">
        <div className="h-1.5 w-full rounded bg-line" />
        <div className="h-1.5 w-2/3 rounded bg-line" />
      </div>
    </div>
  ),
  table: (
    <div className="w-full max-w-[225px] overflow-hidden rounded-md border border-line bg-canvas font-mono text-[9px]">
      <div className="flex items-center justify-between border-b border-line bg-panel px-2.5 py-1.5 uppercase tracking-[0.14em] text-muted">
        <span>route</span>
        <span>p95</span>
      </div>
      {[
        ["/docs", "42ms"],
        ["/blog", "38ms"],
        ["/api", "61ms"],
      ].map(([route, ms]) => (
        <div key={route} className="flex items-center justify-between border-b border-line px-2.5 py-1.5 text-ink last:border-b-0">
          <span>{route}</span>
          <span className="text-muted">{ms}</span>
        </div>
      ))}
    </div>
  ),
  modal: (
    <div className="relative w-full max-w-[205px]">
      <div aria-hidden className="absolute inset-x-3 inset-y-0 rounded-md bg-scrim/10" />
      <div className="relative rounded-md border border-line bg-canvas p-3 shadow-raised">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Delete file?</p>
        <div aria-hidden className="mt-2 h-1.5 w-3/4 rounded bg-line" />
        <div className="mt-3 flex justify-end gap-1.5">
          <span className="rounded border border-line px-2 py-0.5 font-mono text-[9px] text-muted">cancel</span>
          <span className="rounded bg-ink px-2 py-0.5 font-mono text-[9px] text-canvas">delete</span>
        </div>
      </div>
    </div>
  ),
  tooltip: (
    <div className="flex flex-col items-center">
      <span className="rounded bg-ink px-2 py-1 font-mono text-[9px] text-canvas">copied!</span>
      <span aria-hidden className="size-2 rotate-45 bg-ink" />
      <span className="mt-1.5 rounded-full border border-line-strong px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
        hover me
      </span>
    </div>
  ),
};

/**
 * Library grid as specimen plates. Each card stages a static miniature of
 * its component on a dot-grid plate with crop marks and a ghost index;
 * a stretched link covers the card. Entrance is a GSAP stagger; hover adds
 * lift, pointer-tracked spotlight, and a gentle zoom.
 */
export function Components() {
  const section = useRef<HTMLElement>(null);

  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = section.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".component-card", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  const trackPointer = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={section}
      id="components"
      className="border-t border-line px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Components
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              The library<span className="text-dim">.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Thirteen specimens, one visual language. Open a plate, copy the
              source, own the file.
            </p>
          </div>
          <div className="hidden shrink-0 text-right md:block">
            <p className="font-mono text-3xl font-semibold tracking-tight text-ink">
              {BUILT_COUNT}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              shipped · 0 deps
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_COMPONENTS.map((item, i) => (
            <div
              key={item.slug}
              onMouseMove={trackPointer}
              className="component-card group relative flex flex-col overflow-hidden rounded-md border border-line bg-panel/30 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-line-strong hover:bg-panel hover:shadow-card active:translate-y-0 active:scale-[0.99]"
            >
              {/* pointer-tracked spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--ink) 7%, transparent), transparent 70%)",
                }}
              />

              {/* specimen plate */}
              <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-canvas px-6 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:14px_14px]">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--canvas)_15%,transparent_78%)]"
                />

                {/* crop marks */}
                <span aria-hidden className="absolute left-2.5 top-2.5 size-2.5 border-l border-t border-line-strong" />
                <span aria-hidden className="absolute right-2.5 top-2.5 size-2.5 border-r border-t border-line-strong" />
                <span aria-hidden className="absolute bottom-2.5 left-2.5 size-2.5 border-b border-l border-line-strong" />
                <span aria-hidden className="absolute bottom-2.5 right-2.5 size-2.5 border-b border-r border-line-strong" />

                <span className="absolute left-3.5 top-3.5 font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
                  {GROUP_OF.get(item.slug)}
                </span>
                <span
                  aria-hidden
                  className="text-outline pointer-events-none absolute -bottom-4 right-2 select-none font-mono text-6xl font-bold tracking-tighter opacity-40"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-20 flex w-full items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.05]">
                  {SPECIMENS[item.slug]}
                </div>
              </div>

              {/* meta */}
              <div className="flex flex-1 items-start justify-between gap-4 p-5">
                <div>
                  <Link
                    href={`/components/${item.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                    aria-label={`${item.name} documentation`}
                  >
                    <h3 className="text-base font-semibold tracking-tight text-ink underline-offset-4 group-hover:underline">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.blurb}</p>
                </div>
                <span
                  aria-hidden
                  className="mt-1 font-mono text-xs text-dim opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                >
                  &#8599;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
