export function Footer() {
  return (
    <footer className="bg-canvas px-5 py-10 md:px-6">
      <div className="mx-auto max-w-[1220px] border-t border-line pt-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-[11px] font-bold text-canvas">—</span>
            <span className="text-sm font-semibold tracking-tight text-ink">meroUI</span>
            <span className="font-mono text-xs text-faint">· Minimal AI primitives · 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-mono text-xs text-muted">
            <span className="text-faint">© 2026 Shivraj</span>
            <span className="hidden size-1 rounded-full bg-line sm:block" />
            <a href="/docs" className="transition-colors hover:text-ink">
              Docs
            </a>
            <a href="/templates" className="transition-colors hover:text-ink">
              Templates
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              GitHub
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-2xl font-mono text-[11px] leading-5 text-faint">
          Built for Next.js 16 & React 19. Type-safe, accessible, zero-config. Copy the code — own the code.
        </p>
      </div>
    </footer>
  );
}
