"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { Progress } from "@/components/ui/Progress";

const SCANLINES =
  "repeating-linear-gradient(0deg, rgb(63 63 70 / 0.22) 0px, rgb(63 63 70 / 0.22) 1px, transparent 1px, transparent 4px)";

const SHADES = [
  "#fafafa",
  "#e4e4e7",
  "#a1a1aa",
  "#52525b",
  "#27272a",
  "#09090b",
];

/* Live component demos built from the real UI components. */
const DEMO_TABS = [
  {
    label: "Button",
    content: (
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Deploy</Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
      </div>
    ),
  },
  {
    label: "Toggle",
    content: (
      <div className="flex flex-col gap-4">
        <Toggle defaultOn label="Autoplay" />
        <Toggle label="Haptics" />
      </div>
    ),
  },
  {
    label: "Progress",
    content: (
      <div className="flex flex-col gap-5">
        <Progress value={72} label="Shipped" />
        <Progress value={41} label="Tested" />
      </div>
    ),
  },
];

export function Features() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 56,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 70%" },
      });

      if (reduced) return;

      const tilts = new Map<
        HTMLElement,
        { rx: (v: number) => void; ry: (v: number) => void }
      >();
      gsap.utils.toArray<HTMLElement>(".tilt-inner").forEach((inner) => {
        const rx = gsap.quickTo(inner, "rotationX", {
          duration: 0.5,
          ease: "power3.out",
        });
        const ry = gsap.quickTo(inner, "rotationY", {
          duration: 0.5,
          ease: "power3.out",
        });
        tilts.set(inner.closest(".feature-card") as HTMLElement, { rx, ry });
      });

      const move = (e: PointerEvent) => {
        const card = (e.target as HTMLElement).closest(
          ".feature-card"
        ) as HTMLElement | null;
        if (!card) return;
        const t = tilts.get(card);
        if (!t) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        t.ry(px * 8);
        t.rx(-py * 8);
      };
      const leave = (e: PointerEvent) => {
        const card = (e.target as HTMLElement).closest(
          ".feature-card"
        ) as HTMLElement | null;
        if (!card) return;
        const t = tilts.get(card);
        if (!t) return;
        t.rx(0);
        t.ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);

      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={section}
      id="features"
      className="relative bg-canvas px-6 pt-28 pb-6 md:px-10 md:pt-40 md:pb-14"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 flex items-end justify-between border-b border-line pb-6 md:mb-20">
          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Principles.
          </h2>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:block">
            every one enforced
          </span>
        </div>

        {/* asymmetric 12-col grid · exactly 6 cells, no empties */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* 1 · large live-demo cell */}
          <div className="feature-card md:col-span-7">
            <div className="tilt-inner h-full [transform-style:preserve-3d]">
              <div className="flex h-full flex-col p-6 [transform:translateZ(32px)] md:p-7">
                <div className="flex flex-1 flex-col">
                  <h3 className="text-2xl font-semibold tracking-tight text-ink">
                    Ship faster
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                    Drop-in components for the Next.js and React stack. Copy one
                    file, keep full ownership.
                  </p>
                </div>
                <div className="mt-8 rounded-md border border-line bg-canvas/60 p-4 md:p-5">
                  <Tabs items={DEMO_TABS} />
                </div>
              </div>
            </div>
          </div>

          {/* 2 · medium terminal cell */}
          <div className="feature-card md:col-span-5">
            <div className="tilt-inner h-full [transform-style:preserve-3d]">
              <div className="flex h-full flex-col p-6 [transform:translateZ(32px)] md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  No dependencies
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Zero runtime deps. Your bundle stays lean, your npm audit stays
                  quiet.
                </p>
                <div className="mt-7 rounded-md border border-line bg-canvas/60 px-4 py-4">
                  <p className="caret font-mono text-xs leading-6">
                    <span className="text-ink">$ </span>
                    <span className="text-ink">npx meroui add button</span>
                  </p>
                  <p className="mt-1 font-mono text-xs leading-6 text-faint">
                    resolve / 0 packages
                  </p>
                  <p className="font-mono text-xs leading-6 text-ink">
                    copied button to src/components/ui
                  </p>
                  <p className="font-mono text-xs leading-6 text-faint">
                    no dependencies. that&apos;s the point.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 · visual cell: monochrome ramp */}
          <div className="feature-card md:col-span-4">
            <div className="tilt-inner h-full [transform-style:preserve-3d]">
              <div className="flex h-full flex-col p-6 [transform:translateZ(32px)] md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  Dark by default
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  A black-and-white system built for dark UIs. Contrast that
                  survives real-world screens.
                </p>
                <div className="mt-auto pt-7">
                  <div className="flex h-10 w-full overflow-hidden rounded-md border border-line">
                    {SHADES.map((shade) => (
                      <span
                        key={shade}
                        aria-hidden
                        className="flex-1"
                        style={{ background: shade }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
                    monochrome / zinc ramp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4 · visual cell: ghost word */}
          <div className="feature-card md:col-span-4">
            <div className="tilt-inner h-full [transform-style:preserve-3d]">
              <div className="flex h-full flex-col p-6 [transform:translateZ(32px)] md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  Accessible
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Keyboard-first, screen-reader-ready. AA+ on every surface.
                </p>
                <span className="text-outline mt-auto pt-7 block text-6xl font-semibold leading-none tracking-tight">
                  A11y
                </span>
              </div>
            </div>
          </div>

          {/* 5 · visual cell: scanlines */}
          <div className="feature-card md:col-span-4">
            <div className="tilt-inner h-full [transform-style:preserve-3d]">
              <div className="flex h-full flex-col p-6 [transform:translateZ(32px)] md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  Tested
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Unit-tested and prod-verified. If it ships in meroUI, it ships.
                </p>
                <div
                  aria-hidden
                  className="mt-auto grid grid-cols-3 gap-px pt-7"
                  style={{ backgroundImage: SCANLINES }}
                >
                  {[0, 1, 2].map((col) => (
                    <div
                      key={col}
                      className="flex flex-col items-center gap-1 rounded-sm border border-line bg-scrim/80 px-3 py-3"
                    >
                      <span className="size-1.5 rounded-full bg-faint" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                        pass
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6 · full-width statement row */}
          <div className="feature-card md:col-span-12">
            <div className="tilt-inner [transform-style:preserve-3d]">
              <div className="flex flex-col justify-between gap-6 p-6 [transform:translateZ(32px)] md:flex-row md:items-center md:p-8">
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                    MIT licensed.
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                    Use it in side projects, client work, and commercial products.
                    No attribution needed.
                  </p>
                </div>
                <Button href="/docs" variant="ghost">
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}