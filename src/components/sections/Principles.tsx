const ROWS = [
  {
    n: "01",
    title: "One file per component",
    desc: "Copy the source into your repo and it is yours — edit tokens, spacing, motion, whatever. No upstream to fight, no version to pin.",
  },
  {
    n: "02",
    title: "Zero runtime dependencies",
    desc: "Nothing to audit, update, or break. Your bundle stays lean and your install finishes before your coffee does.",
  },
  {
    n: "03",
    title: "Accessible from the first render",
    desc: "Keyboard-first, screen-reader-ready, AA contrast on every surface. Focus traps, roles, and labels are built in, not bolted on.",
  },
  {
    n: "04",
    title: "Typed to the teeth",
    desc: "Strict TypeScript props on every primitive. Autocomplete that actually knows your UI, errors caught before the browser.",
  },
];

/**
 * Principles as an editorial two-column: sticky statement on the left,
 * oversized outline numerals with body copy on the right.
 */
export function Principles() {
  return (
    <section id="why" className="border-t border-line px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Opinionated
            <br />
            where it counts<span className="text-dim">.</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted md:text-base">
            Four guarantees that hold for every primitive, from button to
            prompt bar. Everything else is yours to change.
          </p>
        </div>

        <ol>
          {ROWS.map((r) => (
            <li
              key={r.n}
              className="group border-t border-line py-8 transition-colors last:border-b hover:bg-panel/50 md:py-10"
            >
              <span aria-hidden className="text-outline block font-mono text-6xl font-bold tracking-tighter opacity-70 transition-opacity group-hover:opacity-100 md:text-7xl">
                {r.n}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                {r.title}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted md:text-base md:leading-7">
                {r.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
