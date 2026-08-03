"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";

function Panel({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ring-panel backface-hidden absolute top-1/2 left-1/2 w-[17rem] md:w-[21rem]">
      <div className="panel-vis rounded-md border border-zinc-800 bg-zinc-900 p-5 md:p-6">
        <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400">
            {index} / {label}
          </span>
          <span className="font-mono text-[10px] text-zinc-600">meroUI</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function SkeletonLine({ w }: { w: string }) {
  return <div className={`h-2 animate-pulse rounded-sm bg-zinc-800 ${w}`} />;
}

export function Showcase() {
  const wrap = useRef<HTMLElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const r = ring.current;
    if (!el || !r) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".ring-panel");
      const step = 360 / panels.length;
      let R = 380;

      const layout = () => {
        R = Math.min(540, Math.max(300, innerWidth * 0.52));
        panels.forEach((p, i) => {
          gsap.set(p, {
            transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${R}px) rotateY(${-i * step}deg)`,
          });
        });
      };

      const setDepth = (rot: number) => {
        panels.forEach((p, i) => {
          const front = Math.cos(((i * step + rot) * Math.PI) / 180);
          const t = (front + 1) / 2;
          gsap.set(p.querySelector(".panel-vis"), {
            opacity: gsap.utils.interpolate(0.4, 1, t),
            scale: gsap.utils.interpolate(0.84, 1, t),
            y: gsap.utils.interpolate(28, 0, t),
          });
        });
        if (counter.current) {
          const idx =
            ((Math.round(-rot / step) % panels.length) + panels.length) %
            panels.length;
          counter.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
        }
      };

      layout();
      const handleResize = () => {
        layout();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      if (reduced) {
        gsap.set(".panel-vis", { opacity: 1, scale: 1, y: 0 });
        return () => window.removeEventListener("resize", handleResize);
      }

      /* entrance */
      gsap.from(".ring-stage", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });

      gsap.to(r, {
        rotationY: -315,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${innerWidth < 768 ? 2200 : 2600}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setDepth(self.progress * -315);
          },
        },
      });

      return () => window.removeEventListener("resize", handleResize);
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={wrap}
      id="components"
      className="relative overflow-hidden bg-zinc-950"
    >
      <div className="ring-stage relative h-[100dvh] [perspective:1100px]">
        {/* stage header */}
        <div className="pointer-events-none absolute top-24 left-6 z-10 md:left-10">
          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            The ring.
          </h2>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            08 surfaces · scroll to spin
          </p>
        </div>

        <div
          ref={ring}
          className="ring3d preserve-3d absolute inset-0 will-change-transform"
        >
          <Panel index="01" label="The library">
            <p className="text-7xl font-semibold tracking-tight text-zinc-50 md:text-8xl">
              08
            </p>
            <p className="mt-4 font-mono text-sm leading-6 text-zinc-400">
              Surfaces in the ring. Real components, running in your browser.
              No screenshots.
            </p>
          </Panel>

          <Panel index="02" label="Buttons">
            <div className="flex flex-col gap-4">
              <Button>Primary</Button>
              <Button variant="ghost">Secondary</Button>
              <div className="flex gap-3">
                <Button size="sm">Small</Button>
                <Button size="sm" variant="quiet">
                  Quiet
                </Button>
              </div>
            </div>
          </Panel>

          <Panel index="03" label="Fields">
            <div className="flex flex-col gap-5">
              <Input
                id="ring-email"
                label="Email"
                placeholder="you@ship.dev"
              />
              <div className="relative">
                <input
                  id="ring-search"
                  name="ring-search"
                  type="text"
                  placeholder="Search components…"
                  className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 pr-12 pl-3 text-sm text-zinc-50 placeholder:text-zinc-600 transition-colors focus:border-zinc-50 focus:outline-none"
                />
                <kbd className="absolute top-1/2 right-3 -translate-y-1/2 rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                  /
                </kbd>
              </div>
            </div>
          </Panel>

          <Panel index="04" label="Switches & meters">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Autoplay
                </span>
                <Toggle defaultOn label="Autoplay" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                  Haptics
                </span>
                <Toggle label="Haptics" />
              </div>
              <Progress value={72} label="Tree-shaken" />
              <Progress value={100} label="Accessibility" />
            </div>
          </Panel>

          <Panel index="05" label="Surfaces">
            <div className="rounded-md border border-zinc-800 bg-zinc-950 p-5">
              <div className="mb-4 flex items-center justify-between">
                <SkeletonLine w="w-24" />
                <Badge variant="outline">PRO</Badge>
              </div>
              <SkeletonLine w="w-3/4" />
              <div className="mt-2">
                <SkeletonLine w="w-full" />
              </div>
              <div className="mt-2">
                <SkeletonLine w="w-1/2" />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>Stable</Badge>
              <Badge variant="outline">RSC-ready</Badge>
              <Badge variant="dot" pulse>
                v1.0.0
              </Badge>
            </div>
          </Panel>

          <Panel index="06" label="Tabs">
            <Tabs
              items={[
                {
                  label: "React",
                  content:
                    "Server components by default. Client islands only where interaction lives.",
                },
                {
                  label: "Next.js 16",
                  content:
                    "Works with App Router, RSC, and streaming out of the box. Zero config.",
                },
                {
                  label: "TypeScript",
                  content:
                    "End-to-end typing. Autocomplete every prop, catch errors at compile time.",
                },
              ]}
            />
          </Panel>

          <Panel index="07" label="Feedback">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950 px-3.5 py-2.5">
                <span className="size-2 shrink-0 rounded-full bg-zinc-50" />
                <span className="font-mono text-xs text-zinc-300">
                  Component added to project
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-zinc-700 bg-zinc-950 px-3.5 py-2.5">
                <span className="size-2 shrink-0 rounded-full border border-zinc-50" />
                <span className="font-mono text-xs text-zinc-300">
                  New release · v1.1.0
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950 px-3.5 py-2.5">
                <span className="text-sm leading-none text-zinc-400">!</span>
                <span className="font-mono text-xs text-zinc-400">
                  Bundle exceeds budget
                </span>
              </div>
            </div>
          </Panel>

          <Panel index="08" label="Outro">
            <p className="text-3xl font-semibold tracking-tight text-zinc-50">
              Every surface.
              <br />
              One command.
            </p>
            <div className="mt-6">
              <Button href="#install">Get started</Button>
            </div>
          </Panel>
        </div>

        {/* counter */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
          <span
            ref={counter}
            className="counter font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400"
          >
            01 / 08
          </span>
        </div>
        <p className="pointer-events-none absolute right-6 bottom-10 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 md:block md:right-10">
          scroll to spin
        </p>
      </div>
    </section>
  );
}
