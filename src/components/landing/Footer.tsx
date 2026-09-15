export function Footer() {
  return (
    <footer className="px-6 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        {/* top: big wordmark */}
        <div className="border-b border-line pb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
            meroUI · Kathmandu · 2026
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-4">
            <span className="text-5xl font-semibold tracking-tighter md:text-7xl">meroUI</span>
            <span className="font-mono text-sm text-muted">Production-ready UI for Next.js 16.</span>
          </div>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              A monochrome component library you copy into your repo. No
              runtime, no lock-in. If it is on the page, it is from the
              library.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
              <a href="/docs" className="rounded-full bg-ink px-4 py-2 text-canvas hover:opacity-90">
                Docs
              </a>
              <a
                href="https://github.com/shivraj598"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-2 text-ink hover:border-line-strong"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Components</p>
            <ul className="mt-4 space-y-2 font-mono text-sm text-muted">
              <li>
                <a href="/components/button" className="hover:text-ink hover:underline underline-offset-4">
                  Button · Badge · Progress
                </a>
              </li>
              <li>
                <a href="/components/prompt-bar" className="hover:text-ink hover:underline underline-offset-4">
                  Prompt Bar — flagship
                </a>
              </li>
              <li>
                <a href="/docs" className="hover:text-ink hover:underline underline-offset-4">
                  All 13 primitives →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Meta</p>
            <ul className="mt-4 space-y-2 font-mono text-sm text-muted">
              <li>v0.1.0 · MIT</li>
              <li>React 19 · Tailwind 4</li>
              <li>
                <a href="mailto:hello@meroui.shivraj.me" className="hover:text-ink">
                  hello@meroui.shivraj.me
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          <span>© 2026 Shivraj Timilsena · Kathmandu, Nepal</span>
          <span className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-green" /> All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
