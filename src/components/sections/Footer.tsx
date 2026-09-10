import { Button } from "@/components/ui/Button";

const COLS = [
  {
    title: "Library",
    links: [
      { href: "/docs#components", label: "All components" },
      { href: "/docs#installation", label: "Installation" },
      { href: "/templates", label: "Templates" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://github.com/shivraj598", label: "GitHub" },
      { href: "https://meroui.shivraj.me", label: "Live site" },
    ],
  },
];

/**
 * Closing + footer: one oversized invitation, one CTA, then the
 * wordmark, link columns, and meta row. Static.
 */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          free · mit licensed · yours
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance text-center text-5xl font-semibold leading-[1.0] tracking-[-0.03em] md:text-7xl">
          Start with one file<span className="text-dim">.</span>
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/docs" size="lg">
            Get started
          </Button>
          <Button href="#index" variant="ghost" size="lg">
            Browse the index
          </Button>
        </div>
      </div>

      <div className="border-t border-line px-6 md:px-10">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 py-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center bg-ink text-[11px] font-bold leading-none text-canvas">
                m
              </span>
              <span className="font-mono text-sm font-semibold tracking-tight text-ink">
                meroUI
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Production-ready UI for Next.js 16 and React 19. Copy a file,
              keep full ownership.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
                  {col.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                        <span aria-hidden className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 border-t border-line py-6 font-mono text-[10px] uppercase tracking-[0.24em] text-dim md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} meroUI · Shivraj Timilsena</p>
          <p>Next.js 16 / React 19 / TypeScript 5</p>
        </div>
      </div>
    </footer>
  );
}
