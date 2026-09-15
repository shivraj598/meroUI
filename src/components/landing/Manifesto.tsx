export function Manifesto() {
  return (
    <section id="manifesto" className="border-b border-line px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* left: editorial statement, sticky */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint">Manifesto — why copy beats install</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight md:text-5xl">
            Your repo,
            <br />
            your rules
            <span className="text-dim">.</span>
          </h2>
          <div className="mt-6 max-w-md space-y-4 text-sm leading-7 text-muted md:text-base">
            <p>
              Most libraries keep the source behind a version. meroUI puts the
              source in your hands. One file per component, plain Tailwind,
              fully typed.
            </p>
            <p className="text-ink">
              Edit the radius, change the palette, rip out the animation. No
              upstream to argue with. The design stays yours after checkout.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 border-y border-line py-6">
            {[
              { k: "Zero", v: "runtime" },
              { k: "AA+", v: "contrast" },
              { k: "100%", v: "owned" },
            ].map((s) => (
              <div key={s.k} className="text-center">
                <p className="font-mono text-xl font-semibold tracking-tight text-ink">{s.k}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="/docs"
              className="inline-flex h-10 items-center rounded-full bg-ink px-6 font-mono text-xs uppercase tracking-[0.14em] text-canvas transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Read the docs
            </a>
            <span className="font-mono text-xs text-muted">or keep scrolling</span>
          </div>
        </div>

        {/* right: principles as numbered list with varied hierarchy - not 3 equal cards */}
        <ol className="space-y-0 divide-y divide-line border-y border-line">
          {[
            {
              n: "01",
              title: "One file per primitive",
              desc: "Copy the source into your repo. Edit tokens, spacing, motion. No version to pin, no breaking change to chase.",
              meta: "Button.tsx is 80 lines. You can read it.",
            },
            {
              n: "02",
              title: "Zero runtime dependencies",
              desc: "No hidden graph to audit. Your bundle stays lean and your install finishes before the build does.",
              meta: "Only React + Tailwind. The rest is you.",
            },
            {
              n: "03",
              title: "Accessible from first paint",
              desc: "Keyboard-first, screen-reader-ready, focus traps and roles built in — not bolted on.",
              meta: "AA contrast on every surface, by default.",
            },
            {
              n: "04",
              title: "Typed to the teeth",
              desc: "Strict TypeScript props. Autocomplete that actually knows your UI, errors caught before the browser.",
              meta: "Hover a prop, see the contract.",
            },
          ].map((r) => (
            <li key={r.n} className="group py-8 md:py-10">
              <div className="flex items-start gap-6">
                <span aria-hidden className="text-outline select-none font-mono text-5xl font-bold leading-none tracking-tighter opacity-40 transition-opacity group-hover:opacity-70 md:text-6xl">
                  {r.n}
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{r.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-muted">{r.desc}</p>
                  <p className="mt-3 inline-flex rounded-full border border-line bg-panel px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {r.meta}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
