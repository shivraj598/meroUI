import Link from "next/link";
import { ALL_COMPONENTS } from "@/components/docs/nav";

/**
 * Library grid. Every built component gets a card that links to its docs
 * page at /components/[slug]. Server-rendered from the shared nav data so
 * this section can never drift from the sidebar.
 */
export function Components() {
  return (
    <section
      id="components"
      className="border-t border-line px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Components
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              The library<span className="text-dim">.</span>
            </h2>
          </div>
          <Link
            href="/docs#components"
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Browse all &#8599;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_COMPONENTS.map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.slug}`}
              className="group flex flex-col rounded-md border border-line bg-panel/40 p-5 transition-colors duration-200 hover:border-line-strong hover:bg-panel"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className="flex size-8 items-center justify-center rounded border border-line bg-canvas font-mono text-sm text-ink"
                >
                  {item.glyph}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-xs text-dim opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  &#8599;
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-ink">
                {item.name}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
