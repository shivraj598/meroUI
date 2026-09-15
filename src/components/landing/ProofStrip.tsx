export function ProofStrip() {
  return (
    <section aria-label="Proof" className="border-b border-line bg-ink text-canvas">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-canvas" /> 13 files
          </span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>Zero runtime deps</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span>AA+ accessible</span>
          <span className="hidden h-3 w-px bg-white/15 lg:block" />
          <span className="hidden lg:inline">TypeScript strict</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="uppercase tracking-[0.18em] text-white/60">Install</span>
          <code className="rounded-full bg-white/10 px-3 py-1.5 text-canvas">npx meroui add</code>
        </div>
      </div>
    </section>
  );
}
