"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { DesignEntry } from "@/lib/designs";

function DesignCard({
  entry,
  featured = false,
}: {
  entry: DesignEntry;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    const tilt = card.querySelector<HTMLElement>(".tilt-inner");
    const glare = card.querySelector<HTMLElement>(".card-glare");
    if (!tilt) return;

    const rx = gsap.quickTo(tilt, "rotationX", {
      duration: 0.6,
      ease: "power3.out",
    });
    const ry = gsap.quickTo(tilt, "rotationY", {
      duration: 0.6,
      ease: "power3.out",
    });
    const gx = glare
      ? gsap.quickTo(glare, "x", { duration: 0.9, ease: "power3.out" })
      : null;
    const gy = glare
      ? gsap.quickTo(glare, "y", { duration: 0.9, ease: "power3.out" })
      : null;

    const move = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry(px * 10);
      rx(-py * 9);
      if (gx && gy) {
        gx(px * 120);
        gy(py * 90);
      }
    };
    const leave = () => {
      rx(0);
      ry(0);
      if (gx && gy) {
        gx(0);
        gy(0);
      }
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={entry.liveDemoUrl || "#"}
      target={entry.liveDemoUrl ? "_blank" : undefined}
      rel={entry.liveDemoUrl ? "noreferrer noopener" : undefined}
      className={`design-card group relative block rounded-md border border-zinc-800 bg-zinc-900/60 will-change-transform ${
        featured ? "aspect-[16/8]" : "aspect-[16/10]"
      }`}
    >
      <div className="tilt-inner absolute inset-0 [transform-style:preserve-3d]">
        {/* image plane */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-md [transform:translateZ(0px)]"
        >
          {entry.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={entry.image}
              alt={entry.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-900">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                no image
              </span>
            </div>
          )}
          {/* dark overlay lifts on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/35 to-zinc-950/10 transition-opacity duration-500 group-hover:opacity-90" />
        </div>

        {/* content plane */}
        <div className="absolute inset-x-0 bottom-0 p-5 [transform:translateZ(44px)] md:p-6">
          <p className="text-xl font-semibold tracking-tight text-zinc-50 md:text-2xl">
            {entry.title}
          </p>
          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-6 text-zinc-400">
            {entry.summary}
          </p>
          {entry.tags.length > 0 && (
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
              {entry.tags.join(" / ")}
            </p>
          )}
        </div>

        {/* floating chips (highest depth) */}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-950/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-300 [transform:translateZ(64px)] backdrop-blur-sm transition-colors group-hover:border-zinc-50 group-hover:text-zinc-50">
          view live
          <span aria-hidden className="text-zinc-400 group-hover:text-zinc-50">
            &#8599;
          </span>
        </span>
        {entry.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.thumbnail}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute top-3 left-3 hidden w-20 rounded border border-zinc-700/60 object-cover shadow-lg [transform:translateZ(58px)] sm:block"
          />
        )}

        {/* cursor glare */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 [transform:translateZ(70px)]">
          <div className="card-glare h-full w-full rounded-full bg-zinc-50/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>
    </a>
  );
}

export function DesignShowcase({ entries }: { entries: DesignEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      /* 3D flip-up entrance */
      gsap.from(".design-card", {
        y: 70,
        rotationX: -14,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        transformOrigin: "50% 100%",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 76%" },
      });
      if (reduced) {
        gsap.set(".design-card", { rotationX: 0 });
      }
    }, el);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed border-zinc-800 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
          add .md files to content/web-design
        </p>
      </div>
    );
  }

  const [first, ...rest] = entries;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-5 [perspective:1500px] md:grid-cols-12"
    >
      {/* featured: newest entry, full width */}
      <div className="md:col-span-12">
        <DesignCard entry={first} featured />
      </div>
      {/* remaining entries, two-up */}
      {rest.map((entry) => (
        <div key={entry.slug} className="md:col-span-6">
          <DesignCard entry={entry} />
        </div>
      ))}
    </div>
  );
}