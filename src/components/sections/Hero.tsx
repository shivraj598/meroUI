"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, Draggable } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Magnetic } from "@/components/ui/Magnetic";

const WORD = "meroUI";

function RingCard({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ring-card absolute top-1/2 left-1/2 w-32 will-change-transform md:w-36">
      <div className="rounded-md border border-zinc-800 bg-zinc-900 p-3.5">
        <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-300">
            {label}
          </span>
          <span className="font-mono text-[9px] text-zinc-600">{index}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

const CHIPS = [
  { text: "typescript", z: -60, x: "12%", y: "24%", size: "text-[10px]" },
  { text: "rsc", z: -120, x: "83%", y: "32%", size: "text-[11px]" },
  { text: "a11y", z: -80, x: "7%", y: "70%", size: "text-[10px]" },
  { text: "zero-config", z: -160, x: "87%", y: "74%", size: "text-[9px]" },
  { text: "tree-shaken", z: -200, x: "48%", y: "10%", size: "text-[9px]" },
];

export function Hero() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const ringCards = gsap.utils.toArray<HTMLElement>(".ring-card");
      const ringSpin = el.querySelector<HTMLElement>(".ring-spin");
      if (!ringSpin) return;

      const step = 360 / ringCards.length;
      let R = 300;

      /* ---------------------------------------------------------------
       * Carousel spin is driven here in JS (not on a rotating parent).
       * This is the only way to truly billboard the cards: each card's
       * own transform is `rotateY(angle) translateZ(R) rotateY(-angle)`,
       * so its face always points at the viewer while it orbits. If we
       * instead rotated a parent container, the parent transform would
       * flip the billboards over every half turn (mirrored backs).
       * ------------------------------------------------------------- */
      let spin = 0;

      const cardTransform = (i: number, s: number) => {
        const angle = (i * step + s) % 360;
        return `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${R}px) rotateY(${-angle}deg)`;
      };

      const renderRing = () => {
        ringCards.forEach((card, i) => {
          gsap.set(card, { transform: cardTransform(i, spin) });
        });
      };

      const layoutRing = () => {
        R = Math.min(360, Math.max(190, Math.min(innerWidth, 1024) * 0.36));
        renderRing();
      };

      const tickDepth = () => renderRing();

      let spinTween: gsap.core.Tween | null = null;
      let draggable: Draggable | null = null;

      if (!reduced) {
        const proxy = { value: 0 };
        spinTween = gsap.to(proxy, {
          value: 360,
          duration: 46,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            spin = proxy.value;
          },
        });

        draggable = Draggable.create(ringSpin, {
          type: "rotation",
          inertia: true,
          cursor: "grab",
          activeCursor: "grabbing",
          onDragStart: () => spinTween?.pause(),
          onRelease: () => {
            spinTween?.play();
          },
        })[0];

        gsap.ticker.add(tickDepth);
      } else {
        renderRing();
      }
      layoutRing();

      const handleResize = () => {
        layoutRing();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);
      cleanups.push(() => window.removeEventListener("resize", handleResize));

      /* -------- entry timeline (waits for preloader) -------- */
      if (reduced) {
        gsap.set([".hero-char", ".hero-ghost-inner", ".hero-sub", ".hero-cta", ".hero-hint", ".hero-ring", ".hero-chip", ".hero-meta"], { opacity: 1 });
      } else {
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power4.out" },
        });

        tl.from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.6 })
          .from(
            ".hero-char",
            {
              rotationX: -100,
              opacity: 0,
              transformOrigin: "50% 0%",
              duration: 1.05,
              stagger: 0.06,
            },
            "-=0.3"
          )
          .from(".hero-ghost-inner", { opacity: 0, duration: 0.8 }, "-=0.7")
          .from(".hero-sub", { y: 22, opacity: 0, duration: 0.7 }, "-=0.6")
          .from(
            ".hero-cta",
            { y: 22, opacity: 0, duration: 0.6, stagger: 0.1 },
            "-=0.5"
          )
          .from(".hero-hint", { opacity: 0, duration: 0.5 }, "-=0.2")
          .from(".hero-ring", { y: 60, duration: 1 }, "-=0.4")
          .from(
            ".hero-chip",
            { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 },
            "-=0.6"
          )
          .from(
            ".hero-meta",
            { opacity: 0, duration: 0.5, stagger: 0.1 },
            "-=0.8"
          );

        const startHero = () => tl.play();
        const onReady = () => startHero();
        window.addEventListener("mero:ready", onReady);
        cleanups.push(() => window.removeEventListener("mero:ready", onReady));
        const fallback = window.setTimeout(startHero, 2600);
        cleanups.push(() => window.clearTimeout(fallback));
      }

      /* -------- mouse depth (desktop only) -------- */
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (min-width: 768px)", () => {
        const tiltY = gsap.quickTo(".hero-scene", "rotationY", {
          duration: 0.7,
          ease: "power3.out",
        });
        const tiltX = gsap.quickTo(".hero-scene", "rotationX", {
          duration: 0.7,
          ease: "power3.out",
        });
        const ghostX = gsap.quickTo(".hero-ghost-inner", "x", {
          duration: 1,
          ease: "power3.out",
        });
        const ghostY = gsap.quickTo(".hero-ghost-inner", "y", {
          duration: 1,
          ease: "power3.out",
        });

        const move = (e: PointerEvent) => {
          const nx = e.clientX / innerWidth - 0.5;
          const ny = e.clientY / innerHeight - 0.5;
          tiltY(nx * 6);
          tiltX(-ny * 5);
          ghostX(-nx * 46);
          ghostY(-ny * 28);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });

      /* -------- scroll exit (ring keeps spinning) -------- */
      if (!reduced) {
        gsap.to(el, {
          yPercent: -6,
          opacity: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      cleanups.push(() => {
        spinTween?.kill();
        draggable?.kill();
        if (!reduced) gsap.ticker.remove(tickDepth);
      });
    }, el);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={section}
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-20 [perspective:1400px] md:pt-24"
    >
      {/* vertical meta rails */}
      <span className="hero-meta pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 [writing-mode:vertical-rl] lg:block">
        v1.0.0 · React 19 · TypeScript 5
      </span>
      <span className="hero-meta pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 [writing-mode:vertical-rl] lg:block">
        Built for Next.js 16
      </span>

      {/* floating depth chips */}
      {CHIPS.map((chip) => (
        <span
          key={chip.text}
          className={`hero-chip pointer-events-none absolute hidden font-mono uppercase tracking-[0.24em] text-zinc-700 md:block ${chip.size}`}
          style={{
            left: chip.x,
            top: chip.y,
            transform: `translateZ(${chip.z}px)`,
          }}
        >
          {chip.text}
        </span>
      ))}

      <div className="hero-scene preserve-3d mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center px-6 md:px-10">
        {/* eyebrow */}
        <p className="hero-eyebrow mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          React + TypeScript · For Next.js 16
        </p>

        {/* wordmark */}
        <h1
          aria-label="meroUI"
          className="preserve-3d relative text-center text-[clamp(3.25rem,11.5vw,10rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
        >
          <span
            aria-hidden
            className="preserve-3d pointer-events-none absolute inset-0"
            style={{ transform: "translateZ(-90px)" }}
          >
            <span className="hero-ghost-inner flex h-full items-center justify-center text-outline-soft">
              {WORD}
            </span>
          </span>
          <span className="preserve-3d relative inline-flex [perspective:800px]">
            {WORD.split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="hero-char backface-hidden inline-block pb-[0.06em] will-change-transform"
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        {/* subtext */}
        <p className="hero-sub mt-5 max-w-[34rem] text-balance text-center text-base leading-relaxed text-zinc-400 md:text-lg">
          Type-safe components that ship in one command. Zero config. Zero
          rework.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Magnetic className="hero-cta" strength={0.3}>
            <Button href="#install" size="lg">
              Get started
            </Button>
          </Magnetic>
          <Magnetic className="hero-cta" strength={0.3}>
            <Button href="#features" variant="ghost" size="lg">
              Browse features
            </Button>
          </Magnetic>
        </div>

        <p className="hero-hint mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          Drag the ring to spin · 08 components in orbit
        </p>

        {/* 3D component ring */}
        <div className="hero-ring relative mt-2 h-52 w-full md:h-56">
          <div className="ring-tilt preserve-3d absolute inset-0 [transform:rotateX(-14deg)]">
            <div className="ring-spin preserve-3d absolute inset-0">
              <div className="ring-auto preserve-3d absolute inset-0">
                <RingCard index="01" label="Button">
                  <div className="flex flex-col gap-2">
                    <Button size="sm">Deploy</Button>
                    <Button size="sm" variant="ghost">
                      Cancel
                    </Button>
                  </div>
                </RingCard>
                <RingCard index="02" label="Toggle">
                  <div className="flex flex-col gap-3">
                    <Toggle defaultOn label="Autoplay" />
                    <Toggle label="Haptics" />
                  </div>
                </RingCard>
                <RingCard index="03" label="Input">
                  <Input
                    id="ring-email"
                    label="Email"
                    placeholder="you@ship.dev"
                  />
                </RingCard>
                <RingCard index="04" label="Progress">
                  <div className="flex flex-col gap-3">
                    <Progress value={72} label="Shipped" />
                    <Badge variant="dot" pulse>
                      v1.0.0
                    </Badge>
                  </div>
                </RingCard>
                <RingCard index="05" label="Tabs">
                  <div className="flex gap-1">
                    {["App", "Page", "Data"].map((t, i) => (
                      <span
                        key={t}
                        className={`rounded-sm px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] ${
                          i === 0
                            ? "bg-zinc-50 text-zinc-950"
                            : "text-zinc-500"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </RingCard>
                <RingCard index="06" label="Skeleton">
                  <div className="flex flex-col gap-2">
                    <div className="h-2 w-3/4 animate-pulse rounded-sm bg-zinc-800" />
                    <div className="h-2 w-full animate-pulse rounded-sm bg-zinc-800" />
                    <div className="h-2 w-1/2 animate-pulse rounded-sm bg-zinc-800" />
                  </div>
                </RingCard>
                <RingCard index="07" label="Toast">
                  <div className="flex items-center gap-2 rounded-md border border-zinc-800 px-2.5 py-2">
                    <span className="dot-pulse size-1.5 rounded-full bg-zinc-50" />
                    <span className="font-mono text-[9px] text-zinc-300">
                      Component added
                    </span>
                  </div>
                </RingCard>
                <RingCard index="08" label="CLI">
                  <p className="caret font-mono text-[10px] leading-5 text-zinc-300">
                    $ npx meroui add
                  </p>
                </RingCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
