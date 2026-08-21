const PRINCIPLES = [
  {
    title: "Type-safe",
    desc: "Strict TypeScript props on every component. Autocomplete that actually knows your UI.",
  },
  {
    title: "Zero dependencies",
    desc: "One file per component, no runtime packages. Your bundle stays lean.",
  },
  {
    title: "Accessible",
    desc: "Keyboard-first and screen-reader-ready. AA contrast on every surface.",
  },
  {
    title: "MIT licensed",
    desc: "Use it in side projects, client work, and commercial products. No attribution needed.",
  },
];

/**
 * Plain principles strip: one bordered container split by hairlines,
 * no cards-in-cards. Static by design.
 */
export function Features() {
  return (
    <section
      id="features"
      className="border-t border-line px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Why meroUI<span className="text-dim">.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="bg-canvas p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
