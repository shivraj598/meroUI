"use client";

import { useState } from "react";
import PromptBar from "@/components/ui/PromptBar";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("npx meroui add prompt-bar");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <section id="top" className="bg-[#fcfcf9] px-6 pb-10 pt-28 md:px-8 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-[1280px]">
        {/* top meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-wide text-zinc-500">
          <span className="h-px w-8 bg-zinc-300" />
          <span>EST. 2026 — KATHMANDU</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">ONE FILE PER PRIMITIVE</span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <h1 className="text-[40px] font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-900 md:text-[64px]">
              Chat
              <br />
              <span className="font-light tracking-[-0.05em] text-zinc-400">interfaces,</span>
              <br />
              distilled.
            </h1>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-7 text-zinc-600">
              A selective UI library for chatbots, agents, and AI websites. Only the essentials — thinking, streaming, image genesis — each as a file you own.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#index" className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-7 text-sm font-medium text-white hover:bg-black">
                Explore index
              </a>
              <button onClick={copy} className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-700 hover:border-zinc-300">
                <span className="text-zinc-400">$</span> npx meroui add
                <span className="ml-1 rounded-full bg-zinc-900 px-2.5 py-1 text-xs text-white">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500">
              <span>13 → 1 kept</span>
              <span className="h-3 w-px bg-zinc-200" />
              <span>PromptBar is the foundation</span>
              <span className="hidden h-3 w-px bg-zinc-200 sm:block" />
              <span className="hidden sm:inline">Zero runtime</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[24px] border border-zinc-200 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-xs font-medium tracking-wide text-zinc-500">LIVE COMPOSER</span>
                <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> prompt-bar.tsx
                </span>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-2">
                <PromptBar variant="Rounded" />
              </div>
              <div className="grid grid-cols-3 gap-2 px-1 pt-3">
                <div className="rounded-xl bg-zinc-900 px-3 py-3 text-white">
                  <p className="text-xs font-medium">Thinking</p>
                  <p className="mt-1 text-[11px] leading-4 text-white/60">Dots → shimmer</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white px-3 py-3">
                  <p className="text-xs font-medium text-zinc-900">Streaming</p>
                  <p className="mt-1 text-[11px] leading-4 text-zinc-500">Word reveal</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white px-3 py-3">
                  <p className="text-xs font-medium text-zinc-900">Genesis</p>
                  <p className="mt-1 text-[11px] leading-4 text-zinc-500">Blur → reveal</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-zinc-400">Minimal. No aurora. Just type, space, and ink.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
