import Link from "next/link";
import { ALL_COMPONENTS } from "@/components/docs/nav";

/**
 * The library as a text index: full-width rows, one per primitive, that
 * invert to ink-on-canvas on hover with a sliding arrow. No cards, no
 * thumbnails — the names carry the section.
 */
export function LibraryIndex() {
  return (
    <section id="index" className="border-t border-line px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl text-4xl font-semibold tracking-tight md:text-6xl">
            The index<span className="text-dim">.</span>
          </h2>
          <p className="max-w-sm text-sm leading-6 text-muted">
            Thirteen files. Hover a row to feel it, click it to own it —
            every entry opens its source, usage, and props.
          </p>
        </div>

        <ol className="mt-10 border-t border-line">
          {ALL_COMPONENTS.map((item, i) => (
            <li key={item.slug} className="border-b border-line">
              <Link
                href={`/components/${item.slug}`}
                className="group relative flex items-baseline gap-4 overflow-hidden px-2 py-5 transition-colors duration-200 hover:bg-ink md:gap-8 md:px-4 md:py-6"
              >
                <span className="w-8 shrink-0 font-mono text-xs text-dim transition-colors group-hover:text-canvas/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-2xl font-semibold tracking-tight text-ink transition-all duration-200 group-hover:translate-x-2 group-hover:text-canvas md:text-4xl">
                    {item.name}
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted transition-colors group-hover:text-canvas/70">
                    {item.blurb}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-lg text-dim transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-canvas md:text-2xl"
                >
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
