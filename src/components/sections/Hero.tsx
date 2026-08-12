"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";
import { Skeleton } from "@/components/ui/Skeleton";
import { Magnetic } from "@/components/ui/Magnetic";

const WORD = "meroUI";

/* decorative mono tags, a couple with a slow drift */
const CHIPS: { text: string; className: string; float?: number }[] = [
  { text: "typescript", className: "left-[6%] top-[22%]", float: 6.5 },
  { text: "rsc", className: "right-[5%] top-[30%] lg:right-[34%]" },
  { text: "a11y", className: "left-[8%] bottom-[24%]", float: 8 },
  { text: "zero-config", className: "right-[7%] bottom-[16%] lg:right-[38%]" },
  { text: "tree-shaken", className: "left-[42%] top-[12%] hidden lg:block" },
];

/* six real components in a static facade — the only continuous motion is a
 * two-linked stagger entry and a slow drift on two of the floating tags. */
function Panel({
  index,
  label,
  delay,
  children,
}: {
  index: string;
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="hero-anim flex"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex h-full w-full flex-col gap-3 rounded-lg border border-line bg-panel/70 p-4 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised">
        <div className="mb-0.5 flex items-center justify-between border-b border-line pb-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink">
            {label}
          </span>
          <span className="font-mono text-[9px] text-dim">{index}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  const [ready, setReady] = useState(false);

  /* run the entry once the preloader has slid away (or after a hard cap) */
  useEffect(() => {
    const start = () => setReady(true);
    window.addEventListener("mero:ready", start);
    const fallback = window.setTimeout(start, 2600);
    return () => {
      window.removeEventListener("mero:ready", start);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="top"
      className={`relative flex min-h-[100dvh] flex-col overflow-hidden pt-20 md:pt-24 ${ready ? "is-ready" : ""}`}
    >
      {/* vertical meta rails */}
      <span className="hero-anim pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim [writing-mode:vertical-rl] lg:block">
        v1.0.0 · React 19 · TypeScript 5
      </span>
      <span className="hero-anim pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim [writing-mode:vertical-rl] lg:block">
        Built for Next.js 16
      </span>

      {/* floating mono tags */}
      {CHIPS.map((chip) => (
        <span
          key={chip.text}
          className={`hero-anim pointer-events-none absolute hidden font-mono uppercase tracking-[0.24em] text-dim md:block ${
            chip.className
          } ${chip.float ? "hero-float" : ""}`}
          style={chip.float ? { animationDuration: `${chip.float}s` } : undefined}
        >
          {chip.text}
        </span>
      ))}

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-16 px-6 pb-24 pt-8 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-12">
        {/* wordmark column */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="hero-anim font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            React + TypeScript · For Next.js 16
          </p>

          <h1
            aria-label="meroUI"
            className="hero-anim mt-5 text-[clamp(3.5rem,10vw,7.75rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-ink">{WORD}</span>
            <span className="text-dim">.</span>
          </h1>

          <p
            className="hero-anim mt-6 max-w-[30rem] text-balance text-base leading-relaxed text-muted md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Type-safe components that ship in one command. Zero config. Zero
            rework.
          </p>

          <div
            className="hero-anim mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <Magnetic strength={0.3}>
              <Button href="/docs" size="lg">
                Get started
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Button href="#features" variant="ghost" size="lg">
                Browse features
              </Button>
            </Magnetic>
          </div>

          <p
            className="hero-anim mt-9 font-mono text-[10px] uppercase tracking-[0.3em] text-dim"
            style={{ animationDelay: "320ms" }}
          >
            13 components · one command
          </p>
        </div>

        {/* component facade */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          <Panel index="01" label="Button" delay={200}>
            <div className="flex flex-col items-start gap-2">
              <Button size="sm">Deploy</Button>
              <div className="flex w-full items-center justify-between gap-2">
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
                <Badge>stable</Badge>
              </div>
            </div>
          </Panel>

          <Panel index="02" label="Toggle" delay={290}>
            <div className="flex flex-col gap-3">
              <Toggle defaultOn label="Autoplay" />
              <Toggle label="Haptics" />
            </div>
          </Panel>

          <div className="col-span-2">
            <Panel index="03" label="Input" delay={380}>
              <Input id="hero-email" label="Email" placeholder="you@ship.dev" />
            </Panel>
          </div>

          <Panel index="04" label="Progress" delay={470}>
            <div className="flex flex-col gap-4">
              <Progress value={72} label="Shipped" />
              <Badge variant="dot" pulse>
                v1.0.0
              </Badge>
            </div>
          </Panel>

          <Panel index="05" label="Tabs" delay={560}>
            <Tabs
              items={[
                { label: "App", content: <span className="font-mono text-[10px] text-muted">rsc</span> },
                { label: "Page", content: <span className="font-mono text-[10px] text-muted">streamed</span> },
                { label: "Data", content: <span className="font-mono text-[10px] text-muted">action</span> },
              ]}
            />
          </Panel>

          <div className="col-span-2">
            <div className="hero-anim flex" style={{ animationDelay: "650ms" }}>
              <div className="flex w-full flex-col gap-3 rounded-lg border border-line bg-panel/70 p-4 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-raised">
                <div className="mb-0.5 flex items-center justify-between border-b border-line pb-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink">
                    CLI
                  </span>
                  <span className="font-mono text-[9px] text-dim">06</span>
                </div>
                <p className="caret font-mono text-[12px] leading-6 text-ink">
                  $ npx meroui add
                </p>
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-1.5 w-1/4" />
                  <Skeleton className="h-1.5 w-1/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}