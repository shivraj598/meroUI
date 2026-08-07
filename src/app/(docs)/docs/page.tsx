import Link from "next/link";
import {
  ALL_COMPONENTS,
  COMPONENT_GROUPS,
} from "@/components/docs/nav";
import { CopyLine } from "@/components/docs/CopyLine";

function ComponentLink({
  name,
  slug,
  blurb,
  index,
}: {
  name: string;
  slug: string;
  blurb: string;
  index: number;
}) {
  return (
    <li>
      <Link
        href={`/components/${slug}`}
        className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 transition-colors sm:gap-6 md:px-2"
      >
        <span
          aria-hidden
          className="hidden select-none font-mono text-sm text-zinc-700 transition-colors group-hover:text-zinc-400 md:block"
        >
          {String(index).padStart(2, "0")}
        </span>

        <span className="min-w-0">
          <span className="block text-2xl font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-zinc-50 sm:text-3xl">
            {name}
          </span>
          <span className="mt-1.5 block max-w-xl text-sm leading-6 text-zinc-400">
            {blurb}
          </span>
        </span>

        <span className="flex items-center font-mono text-sm text-zinc-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-300">
          └/components/{slug}
        </span>
      </Link>
    </li>
  );
}

/**
 * Library index. This is what "Get started" links to: an overview, the
 * install flow, and the grouped index of every component. Each component
 * lives on its own page at /components/[slug]; this page links to them.
 */
export default function DocsPage() {
  return (
    <div className="flex max-w-[56rem] flex-col">
      {/* ------------------------------------------------ header */}
      <section
        id="overview"
        aria-labelledby="title"
        className="scroll-mt-24 border-b border-zinc-800 py-12 md:py-16"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
          mero-ui
          <span className="text-zinc-700"> / </span>v0.1.0
          <span className="text-zinc-700"> / </span>library
        </p>
        <h1
          id="title"
          className="mt-7 text-5xl font-semibold tracking-tight md:text-7xl"
        >
          Library.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
          One page per component. Copy a single file, keep full ownership.
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
        className="scroll-mt-24 border-b border-zinc-800 py-10 md:py-14"
      >
        <h2
          id="installation-title"
          className="text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Install everything.
        </h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
          One package, zero runtime deps, quiet audit.
        </p>
        <div className="mt-6 max-w-md">
          <CopyLine command="npm install mero-ui" />
        </div>
        <div className="mt-6 max-w-md">
          <CopyLine command="npx meroui add button" />
        </div>
      </section>

      {/* ------------------------------------------- index */}
      <section
        id="components"
        aria-labelledby="components-title"
        className="scroll-mt-24 py-10 md:py-14"
      >
        <h2
          id="components-title"
          className="text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Components.
        </h2>

        {COMPONENT_GROUPS.map((group, gi) => (
          <div key={group.title}>
            <div className="mt-8 flex items-baseline gap-4 border-b border-zinc-800 pb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                {String(gi + 1).padStart(2, "0")}
                <span className="text-zinc-700">{" / "}</span>
                {group.title}
              </span>
              <span aria-hidden className="h-px flex-1 self-center bg-zinc-800" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                {group.items.length}
              </span>
            </div>

            <ul className="divide-y divide-zinc-800">
              {group.items.map((item, i) => (
                <ComponentLink
                  key={item.slug}
                  name={item.name}
                  slug={item.slug}
                  blurb={item.blurb}
                  index={i + 1}
                />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}