const PRODUCT = [
  { href: "/docs", label: "Docs" },
  { href: "/templates", label: "Templates" },
];

const LIBRARY = [
  { href: "/docs#components", label: "Components" },
  { href: "#install", label: "Install" },
];

const CONNECT = [
  { href: "https://github.com", label: "GitHub", external: true },
  { href: "https://x.com", label: "X / Twitter", external: true },
];

function Column({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer noopener" : undefined}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Plain footer: brand blurb, link columns, meta row. Static. */
export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col justify-between gap-10 border-b border-line pb-10 md:flex-row">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-6 items-center justify-center bg-ink text-[11px] font-bold leading-none text-canvas">
                m
              </span>
              <span className="font-mono text-sm font-semibold tracking-tight text-ink">
                meroUI
              </span>
            </a>
            <p className="mt-4 text-sm leading-6 text-muted">
              Production-ready UI for Next.js 16 and React 19. Copy a file,
              keep full ownership.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <Column title="Product" links={PRODUCT} />
            <Column title="Library" links={LIBRARY} />
            <Column title="Connect" links={CONNECT} />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-dim md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} meroUI · Shivraj Timilsena</p>
          <p>Next.js 16 / React 19 / TypeScript 5</p>
        </div>
      </div>
    </footer>
  );
}
