import Link from "next/link";

const SOON = [
  { name: "Thinking", desc: "Bouncing dots → shimmer. ChatGPT / Gemini variants.", accent: "Soon" },
  { name: "Streaming", desc: "Word-by-word reveal. Markdown aware.", accent: "Soon" },
  { name: "Image Genesis", desc: "Shimmer + blur-up while generating.", accent: "Soon" },
  { name: "Tool Progress", desc: "Searching → Reading → Synthesizing.", accent: "Soon" },
  { name: "Sidebar", desc: "Collapsible threads, search, pinned.", accent: "Soon" },
  { name: "History", desc: "Grouped by time, keyboard nav.", accent: "Soon" },
];

export function Inventory() {
  return (
    <section id="index" className="bg-white px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-zinc-200 pb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">Selective index.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">One kept, six next. No bloat — only primitives you can&apos;t get polished elsewhere.</p>
          </div>
          <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600">1 kept · 6 next · PromptBar is live</span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* kept */}
          <Link href="/components/prompt-bar" className="group relative flex min-h-[320px] flex-col rounded-[24px] border border-zinc-900 bg-zinc-900 p-6 text-white md:col-span-5 md:p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-900">Kept · Foundation</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-white text-zinc-900 group-hover:rotate-12 transition-transform">↗</span>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-semibold">Prompt Bar</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">@ sources, / commands, dictation, model picker. The composer that holds the system together.</p>
              <span className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white">prompt-bar.tsx · ~675 lines</span>
            </div>
          </Link>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {SOON.map((c) => (
              <div key={c.name} className="rounded-[24px] border border-dashed border-zinc-200 bg-zinc-50 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-900">{c.name}</h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-500 shadow-sm border border-zinc-100">{c.accent}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{c.desc}</p>
                <div className="mt-4 h-px w-full bg-zinc-200" />
                <p className="mt-3 text-xs text-zinc-400">One file, no deps, copy-paste.</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-[#fcfcf9] px-5 py-4">
          <p className="text-sm text-zinc-600">Want the full AI shell? Sidebar + History + Composer + Settings — as primitives + a reference ChatShell.</p>
          <Link href="/docs" className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-black">Read the plan</Link>
        </div>
      </div>
    </section>
  );
}
