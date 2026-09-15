import Link from "next/link";

const TEMPLATES = [
  {
    name: "Landing page",
    blurb: "Hero, marquee, features grid and footer — the page you are on.",
    meta: "hero / marquee / inventory",
    href: "/",
    status: "built" as const,
    image: "https://picsum.photos/seed/meroui-landing/800/500",
  },
  {
    name: "Docs site",
    blurb: "Sticky header, collapsible sidebar, one route per component.",
    meta: "shell / sidebar / code blocks",
    href: "/docs",
    status: "built" as const,
    image: "https://picsum.photos/seed/meroui-docs/800/500",
  },
  {
    name: "Component gallery",
    blurb: "Every primitive on its own page with preview and props.",
    meta: "library / preview / props",
    href: "/docs",
    status: "built" as const,
    image: "https://picsum.photos/seed/meroui-gallery/800/500",
  },
  {
    name: "Dashboard",
    blurb: "Data shell built from tables, toasts, tooltips and meters.",
    meta: "table / toast / tooltip",
    status: "soon" as const,
    image: "https://picsum.photos/seed/meroui-dash/800/500",
  },
  {
    name: "Marketing microsite",
    blurb: "Banners, cards and tabs for a focused single-goal page.",
    meta: "badge / card / tabs",
    status: "soon" as const,
    image: "https://picsum.photos/seed/meroui-mkt/800/500",
  },
  {
    name: "Forms",
    blurb: "Inputs, toggles and modals wired together for a full flow.",
    meta: "input / toggle / modal",
    status: "soon" as const,
    image: "https://picsum.photos/seed/meroui-forms/800/500",
  },
];

export function TemplatesGallery() {
  return (
    <section id="templates" className="border-b border-line px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Templates<span className="text-dim">.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Whole pages assembled from the inventory. Clone a starter, own
              every file, glue on your content.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {TEMPLATES.filter((t) => t.status === "built").length} built · {TEMPLATES.length - 3} soon
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* hero template - spans 7 */}
          <Link
            href={TEMPLATES[0].href!}
            className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-xl border border-line bg-panel md:col-span-7"
          >
            <img
              src={TEMPLATES[0].image}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-90 grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/20 to-transparent" />
            <div className="relative flex h-full flex-col p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-canvas px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">01 · Built</span>
                <span className="flex size-8 items-center justify-center rounded-full bg-canvas text-ink transition-transform group-hover:rotate-12">↗</span>
              </div>
              <div className="mt-auto">
                <h3 className="text-3xl font-semibold tracking-tight text-white">{TEMPLATES[0].name}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/70">{TEMPLATES[0].blurb}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">{TEMPLATES[0].meta}</p>
              </div>
            </div>
          </Link>

          {/* side stack: docs + gallery */}
          <div className="grid gap-4 md:col-span-5">
            {TEMPLATES.slice(1, 3).map((t, i) => (
              <Link
                key={t.name}
                href={t.href!}
                className="group relative flex min-h-[184px] overflow-hidden rounded-xl border border-line bg-canvas"
              >
                <img
                  src={t.image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.14] grayscale transition-opacity group-hover:opacity-[0.22]"
                />
                <div className="relative flex w-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                      0{i + 2} · Built
                    </span>
                    <span className="text-dim transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </div>
                  <h3 className="mt-auto text-xl font-semibold tracking-tight text-ink">{t.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{t.blurb}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* soon row: 3 equal would be banned, so vary: 1 + 2 split */}
          <div className="grid gap-4 md:col-span-12 md:grid-cols-12">
            <div className="rounded-xl border border-dashed border-line bg-panel/40 p-6 md:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Next · dashboard</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">Dashboard</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Dense data rows, sticky headers, mono cells.</p>
              <span className="mt-4 inline-flex rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Soon
              </span>
            </div>
            <div className="grid gap-4 md:col-span-8 md:grid-cols-2">
              {TEMPLATES.slice(4, 6).map((t) => (
                <div key={t.name} className="rounded-xl border border-line bg-canvas p-6 opacity-70">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{t.meta}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{t.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{t.blurb}</p>
                  <span className="mt-4 inline-flex rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* install bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-ink px-6 py-5 text-canvas">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Pull a starter</p>
            <p className="mt-1 font-mono text-sm text-white">Files owned by you, from day one.</p>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            <code className="rounded-full bg-white/10 px-4 py-2">npx meroui add landing</code>
            <code className="rounded-full bg-white/10 px-4 py-2">npx meroui add docs</code>
          </div>
        </div>
      </div>
    </section>
  );
}
