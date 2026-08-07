import type { ReactNode } from "react";
import { ALL_COMPONENTS, BUILT_COUNT, COMPONENT_GROUPS } from "@/components/docs/nav";
import { CopyLine } from "@/components/docs/CopyLine";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";

/* Live demos for the components that already ship. Real components only:
   no div-built fake previews. Roadmap cards keep an explicit placeholder. */
const PREVIEWS: Record<string, ReactNode> = {
  button: (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button size="sm">Deploy</Button>
      <Button size="sm" variant="ghost">
        Cancel
      </Button>
    </div>
  ),
  badge: (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="dot" pulse>
        v1.0.0
      </Badge>
      <Badge>stable</Badge>
    </div>
  ),
  progress: (
    <div className="w-full max-w-[11rem]">
      <Progress value={72} label="Shipped" />
    </div>
  ),
  toggle: (
    <div className="flex flex-col items-center gap-3">
      <Toggle defaultOn label="Autoplay" />
      <Toggle label="Haptics" />
    </div>
  ),
  input: (
    <div className="w-full max-w-[11rem]">
      <Input label="Email" placeholder="you@ship.dev" />
    </div>
  ),
  tabs: (
    <Tabs
      items={[
        {
          label: "App",
          content: <span className="font-mono text-[10px] text-zinc-400">rsc by default</span>,
        },
        {
          label: "Page",
          content: <span className="font-mono text-[10px] text-zinc-400">streamed</span>,
        },
        {
          label: "Data",
          content: <span className="font-mono text-[10px] text-zinc-400">server action</span>,
        },
      ]}
    />
  ),
};

/**
 * Library collection page. This is the page "Get started" links to: a docs
 * style overview, the install flow, and the full component index grouped by
 * category. Component detail routes are built next; for now each card is an
 * in-page anchor target for the sidebar.
 */
export default function DocsPage() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      {/* ------------------------------------------------ overview */}
      <section
        id="overview"
        aria-labelledby="overview-title"
        className="scroll-mt-20"
      >
        <h1
          id="overview-title"
          className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl"
        >
          Library.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-base leading-7 text-zinc-400 md:text-lg">
          Type-safe, accessible, zero-config React components for Next.js 16
          and React 19. Black by default. Copy one file, keep full ownership.
        </p>

        {/* stat strip */}
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-zinc-800 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          <span>{ALL_COMPONENTS.length} components indexed</span>
          <span aria-hidden className="text-zinc-700">
            /
          </span>
          <span>{BUILT_COUNT} ready to copy</span>
          <span aria-hidden className="text-zinc-700">
            /
          </span>
          <span>zero runtime deps</span>
        </div>
      </section>

      {/* ---------------------------------------------- installation */}
      <section
        id="installation"
        aria-labelledby="installation-title"
        className="scroll-mt-20"
      >
        <h2
          id="installation-title"
          className="text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Installation.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-12">
          {/* the whole library */}
          <div className="flex flex-col rounded-md border border-zinc-800 bg-zinc-900/60 p-6 md:col-span-7">
            <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
              Install everything
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              One package. No runtime dependencies, so the audit stays quiet.
            </p>
            <div className="mt-6">
              <CopyLine
                command="npm install mero-ui"
                output={["mero-ui@latest", "✓ added 1 package in 1.2s"]}
              />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              npm / yarn / pnpm / bun
            </p>
          </div>

          {/* one component at a time */}
          <div className="flex flex-col justify-between rounded-md border border-zinc-800 bg-zinc-900/60 p-6 md:col-span-5">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
                One component at a time
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Grab a single file and keep full ownership. No theme setup, no
                config file, no lock-in.
              </p>
            </div>
            <div className="mt-6">
              <CopyLine command="npx meroui add button" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ components */}
      <section
        id="components"
        aria-labelledby="components-title"
        className="scroll-mt-20"
      >
        <h2
          id="components-title"
          className="text-4xl font-semibold tracking-tight md:text-5xl"
        >
          Components.
        </h2>

        {COMPONENT_GROUPS.map((group) => (
          <div key={group.title} className="mt-14">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              {group.title}
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <article
                  key={item.slug}
                  id={`c-${item.slug}`}
                  className="flex scroll-mt-20 flex-col rounded-md border border-zinc-800 bg-zinc-900/60 p-5 transition-colors duration-200 hover:border-zinc-600"
                >
                  {/* preview slot: live component when it ships, otherwise an
                      explicit roadmap placeholder */}
                  <div
                    className={`flex h-32 items-center justify-center rounded-md border p-4 ${
                      item.built
                        ? "border-zinc-800 bg-zinc-950/40"
                        : "border-dashed border-zinc-800 bg-zinc-950/50"
                    }`}
                  >
                    {item.built ? (
                      PREVIEWS[item.slug] ?? (
                        <span className="font-mono text-3xl text-zinc-700">
                          {item.glyph}
                        </span>
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <span
                          aria-hidden
                          className="select-none font-mono text-3xl text-zinc-700"
                        >
                          {item.glyph}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                          ships with the build
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold tracking-tight text-zinc-50">
                      {item.name}
                    </h4>
                    <Badge variant={item.built ? "solid" : "outline"}>
                      {item.built ? "ready" : "roadmap"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {item.blurb}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
