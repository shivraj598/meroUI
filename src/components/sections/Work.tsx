import type { DesignEntry } from "@/lib/designs";

/**
 * Selected work as a full-bleed editorial stack: alternating wide image
 * rows with overlaid titles. Each card opens the live build.
 */
export function Work({ entries }: { entries: DesignEntry[] }) {
  if (entries.length === 0) {
    return (
      <section id="work" className="border-t border-line px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            In the wild<span className="text-dim">.</span>
          </h2>
          <div className="mt-10 flex items-center justify-center rounded-md border border-dashed border-line py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
              add .md files to content/web-design
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="border-t border-line px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            In the wild<span className="text-dim">.</span>
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {entries.length} live builds
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {entries.map((entry, i) => (
            <a
              key={entry.slug}
              href={entry.liveDemoUrl || "#"}
              target={entry.liveDemoUrl ? "_blank" : undefined}
              rel={entry.liveDemoUrl ? "noreferrer noopener" : undefined}
              className={`group relative block overflow-hidden rounded-md border border-line ${
                i % 2 === 0 ? "md:mr-24" : "md:ml-24"
              }`}
            >
              <div className="relative aspect-[16/7] overflow-hidden md:aspect-[21/7]">
                {entry.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={entry.image}
                    alt={entry.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-panel">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">no image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-scrim/95 via-scrim/30 to-transparent" />
                <span aria-hidden className="absolute right-5 top-4 font-mono text-xs tracking-[0.2em] text-white/70">
                  {String(i + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight text-white md:text-4xl">
                      {entry.title}
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                      {entry.summary}
                    </p>
                  </div>
                  <span className="flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-200 group-hover:gap-3 group-hover:bg-white group-hover:text-black">
                    view live <span aria-hidden>↗</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
