import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/Button";
import { CopyLine } from "@/components/docs/CopyLine";

export const metadata: Metadata = {
  title: "Templates - meroUI",
  description:
    "Starters built from meroUI primitives: landing pages, docs sites, dashboards and more. Zero runtime deps, full source ownership.",
};

type Template = {
  name: string;
  blurb: string;
  meta: string;
  href?: string;
  status: "built" | "soon";
};

const TEMPLATES: Template[] = [
  {
    name: "Landing page",
    blurb:
      "Hero, marquee, features grid, install terminal and footer on a single scroll.",
    meta: "hero / marquee / features",
    href: "/",
    status: "built",
  },
  {
    name: "Docs site",
    blurb:
      "Sticky header, collapsible sidebar, one route per component and a copy kit.",
    meta: "shell / sidebar / code blocks",
    href: "/docs",
    status: "built",
  },
  {
    name: "Component gallery",
    blurb:
      "Every primitive on its own page with a live preview, usage and props table.",
    meta: "library / preview / props",
    href: "/docs",
    status: "built",
  },
  {
    name: "Dashboard",
    blurb:
      "Data-heavy shell built from tables, toasts, tooltips and progress meters.",
    meta: "table / toast / tooltip",
    status: "soon",
  },
  {
    name: "Marketing microsite",
    blurb:
      "Tight banners, cards and tabs for a focused single-goal page.",
    meta: "badge / card / tabs",
    status: "soon",
  },
  {
    name: "Forms",
    blurb:
      "Inputs, toggles and modals wired together for a complete flow.",
    meta: "input / toggle / modal",
    status: "soon",
  },
];

function TemplateCard({ t, index }: { t: Template; index: number }) {
  const inner = (
    <div className="group relative flex h-full min-h-40 flex-col rounded-md border border-line bg-panel/40 p-6 transition-colors hover:border-line-strong hover:bg-panel/70">
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className="font-mono text-sm text-dim transition-colors group-hover:text-muted"
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] ${
            t.status === "built"
              ? "border-line bg-code text-code-ink"
              : "border-line text-dim"
          }`}
        >
          {t.status}
        </span>
      </div>
      <div className="mt-5 flex flex-1 flex-col justify-end">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold tracking-tight text-ink">
            {t.name}
          </h3>
          {t.status === "built" && (
            <span className="font-mono text-sm text-dim transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink">
              →
            </span>
          )}
        </div>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
          {t.blurb}
        </p>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-dim">
          {t.meta}
        </p>
      </div>
    </div>
  );

  return (
    <li>
      {t.href ? (
        <Link href={t.href} className="block h-full">
          {inner}
        </Link>
      ) : (
        <div className="h-full opacity-70">{inner}</div>
      )}
    </li>
  );
}

export default function TemplatesPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canvas">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl flex-1 px-6 pb-24 pt-32 md:px-10 md:pt-40">
        {/* header */}
        <section className="max-w-3xl border-b border-line pb-12 md:pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
            mero-ui
            <span className="text-dim"> / </span>v0.1.0
            <span className="text-dim"> / </span>templates
          </p>
          <h1 className="mt-7 text-5xl font-semibold tracking-tight md:text-7xl">
            Templates.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            Whole pages assembled from meroUI primitives. Clone a starter, own
            every file, glue on your content.
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            <span className="text-ink">{TEMPLATES.length} templates</span>
            <span className="text-dim">{" / "}</span>
            <span className="text-ink">
              {
                TEMPLATES.filter((t) => t.status === "built").length
              }{" "}
              built
            </span>
            <span className="text-dim">{" / "}</span>
            <span>zero runtime deps</span>
          </p>
        </section>

        {/* grid */}
        <section aria-labelledby="templates-title">
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((t, i) => (
              <TemplateCard key={t.name} t={t} index={i + 1} />
            ))}
          </ul>
        </section>

        {/* install */}
        <section className="mt-16 border-t border-line pt-10 md:mt-20">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Pull a template.
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Stage a starter into your app, files owned by you.
          </p>
          <div className="mt-6 grid max-w-3xl gap-4 md:grid-cols-2">
            <CopyLine command="npx meroui add landing" />
            <CopyLine command="npx meroui add docs" />
          </div>
        </section>

        {/* cta */}
        <section className="mt-16 flex items-center justify-between gap-6 rounded-md border border-line bg-panel/40 px-6 py-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">
              want a bespoke starter
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-ink">
              The library is the raw material.
            </p>
          </div>
          <Button href="/docs" variant="ghost" size="sm" className="shrink-0">
            Browse components
          </Button>
        </section>
      </div>
    </main>
  );
}