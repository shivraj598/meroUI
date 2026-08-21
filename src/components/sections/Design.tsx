import { getDesigns } from "@/lib/designs";
import { DesignShowcase } from "./DesignShowcase";

/**
 * Design showcase section. A Server Component: it reads every `.md` file in
 * `content/web-design/` at build time and hands the parsed entries to the
 * static `DesignShowcase` grid. Adding a new `.md` file to the content folder
 * adds it to this grid and to the page automatically on the next build.
 */
export function Design() {
  const entries = getDesigns();

  return (
    <section
      id="design"
      className="border-t border-line px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Design
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Selected work<span className="text-dim">.</span>
            </h2>
          </div>
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {entries.length} live builds
          </span>
        </div>

        <DesignShowcase entries={entries} />

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          each card links to a live build
        </p>
      </div>
    </section>
  );
}
