import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
  type ComponentMeta,
} from "@/components/docs/nav";
import { CopyLine } from "@/components/docs/CopyLine";
import { ComponentPreview } from "@/components/docs/ComponentPreview";

function Row({ item, index }: { item: ComponentMeta; index: number }) {
  const n = String(index).padStart(2, "0");
  return (
    <li
      id={`c-${item.slug}`}
      className="group grid scroll-mt-24 grid-cols-1 items-center gap-4 py-6 transition-colors duration-200 hover:bg-zinc-900/40 sm:gap-5 md:grid-cols-[3.25rem_minmax(0,1fr)_auto] md:gap-8 md:px-4"
    >
      {/* glyph + number */}
      <span
        aria-hidden
        className="hidden select-none items-baseline gap-2 font-mono md:flex"
      >
        <span className="text-sm text-zinc-700 transition-colors group-hover:text-zinc-400">
          {n}
        </span>
        <span className="text-lg text-zinc-500 transition-colors group-hover:text-zinc-300">
          {item.glyph}
        </span>
      </span>

      {/* name block */}
      <div className="min-w-0">
        <a
          href={`#c-${item.slug}`}
          className="inline-flex items-baseline gap-2.5 text-2xl font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-zinc-50 sm:text-3xl"
        >
          {item.name}
        </a>
        <p className="mt-1.5 max-w-xl text-sm leading-6 text-zinc-400">
          {item.blurb}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <span className={item.built ? "text-zinc-300" : "text-zinc-600"}>
            {item.built ? "ready" : "soon"}
          </span>
          <span aria-hidden className="text-zinc-700">
            {" / "}
          </span>
          <span className="text-zinc-500">src/components/ui/{item.name}.tsx</span>
        </p>
      </div>

      {/* live preview cell */}
      <div className="flex h-28 items-center justify-center overflow-hidden rounded-md border border-zinc-800 bg-zinc-950/40 p-4 transition-colors duration-200 group-hover:border-zinc-600 sm:h-32 md:w-64">
        <ComponentPreview slug={item.slug} />
      </div>
    </li>
  );
}

/**
 * Library collection page. This is the page "Get started" links to: a compact
 * header band, the install flow, and an editorial catalog of every component
 * as a type-driven index with a live preview docked on each row. Detail routes
 * come next; each row stays an in-page anchor for the sidebar index.
 */
export default function DocsPage() {
  return (
    <div className="flex max-w-[56rem] flex-col">
      {/* ------------------------------------------------ header */}
      <section
        id="overview"
        aria-labelledby="title"
        className="scroll-mt-24 border-b border-zinc-800 py-14 md:py-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          mero-ui
          <span className="text-zinc-700"> / </span>v0.1.0
          <span className="text-zinc-700"> / </span>library
        </p>
        <h1
          id="title"
          className="mt-8 text-6xl font-semibold tracking-tight md:text-8xl"
        >
          Library.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
          Type-safe, accessible, zero-config React components for Next.js 16 and
          React 19. Black by default. Copy one file, keep full ownership.
        </p>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-zinc-300">{ALL_COMPONENTS.length} components</span>
          <span className="text-zinc-700">{" / "}</span>
          <span>zero runtime deps</span>
          <span className="text-zinc-700">{" / "}</span>
          <span>keyboard first</span>
        </p>
      </section>

      {/* --------------------------------------------- install */}
      <section
        id="installation"
        aria-labelledby="installation-title"
        className="scroll-mt-24 border-b border-zinc-800 py-12 md:py-16"
      >
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2
              id="installation-title"
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            >
              Install everything.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
              One package, zero runtime deps, quiet audit.
            </p>
            <div className="mt-6">
              <CopyLine command="npm install mero-ui" />
            </div>
          </div>
          <div className="md:border-l md:border-zinc-800 md:pl-16">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              One file at a time.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Grab a single component, keep full ownership.
            </p>
            <div className="mt-6">
              <CopyLine command="npx meroui add button" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- catalog */}
      <section
        id="components"
        aria-labelledby="components-title"
        className="scroll-mt-24 py-12 md:py-20"
      >
        <h2
          id="components-title"
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Index.
        </h2>

        {COMPONENT_GROUPS.map((group, gi) => (
          <div key={group.title}>
            {/* group divider */}
            <div className="mt-12 flex items-baseline gap-4 border-b border-zinc-800 pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                {String(gi + 1).padStart(2, "0")}
                <span className="text-zinc-700">{" / "}</span>
                {group.title}
              </span>
              <span aria-hidden className="h-px flex-1 self-center bg-zinc-800" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {group.items.length} items
              </span>
            </div>

            <ul className="divide-y divide-zinc-800">
              {group.items.map((item, i) => (
                <Row key={item.slug} item={item} index={i + 1} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}