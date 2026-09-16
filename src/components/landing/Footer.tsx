export function Footer() {
  return (
    <footer className="bg-white px-6 py-10 md:px-8">
      <div className="mx-auto max-w-[1280px] border-t border-zinc-200 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded bg-zinc-900 text-xs font-bold text-white">—</span>
            <span className="text-sm font-semibold text-zinc-900">meroUI</span>
            <span className="text-xs text-zinc-500">· Minimal AI primitives · 2026</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span>© 2026 Shivraj</span>
            <span className="hidden sm:inline">·</span>
            <a href="/docs" className="hover:text-zinc-900">Docs</a>
            <a href="https://github.com/shivraj598" target="_blank" rel="noreferrer" className="hover:text-zinc-900">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
