"use client";

import { useState } from "react";
import PromptBar from "@/components/ui/PromptBar";

export function ComposerLab() {
  const [variant, setVariant] = useState<"Rounded" | "Pill">("Rounded");
  return (
    <section id="composer" className="bg-[#fcfcf9] px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px] grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">The composer.</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600">The only component we kept. Everything else will be built to match its radius, density, and focus system.</p>
          <div className="mt-6 inline-flex gap-1 rounded-full border border-zinc-200 bg-white p-1">
            {(["Rounded", "Pill"] as const).map((v) => (
              <button key={v} onClick={() => setVariant(v)} className={`rounded-full px-4 py-2 text-xs font-medium ${variant === v ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900"}`}>
                {v}
              </button>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-sm text-zinc-600">
            <li className="flex gap-2"><span className="text-zinc-900">@</span> attach sources & files</li>
            <li className="flex gap-2"><span className="text-zinc-900">/</span> commands, ↑↓ to pick</li>
            <li className="flex gap-2">mic → dictation</li>
            <li className="flex gap-2">model → Sprinkles 5 triggers sweep</li>
          </ul>
        </div>
        <div className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm md:p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">live · {variant.toLowerCase()}</span>
            <span className="text-xs text-zinc-400">interactive</span>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="w-full max-w-[560px] rounded-2xl bg-zinc-50 p-3">
              <PromptBar variant={variant} />
            </div>
          </div>
          <pre className="mt-6 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-xs leading-6 text-zinc-100">
            <code>{`import PromptBar from "@/components/ui/PromptBar";\n<PromptBar variant="${variant}" />`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
