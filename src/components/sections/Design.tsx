import { getDesigns } from "@/lib/designs";
import { DesignShowcase } from "./DesignShowcase";

/**
 * Design showcase section. A Server Component: it reads every `.md` file in
 * `content/web-design/` at build time and hands the parsed entries to the
 * client `DesignShowcase`, which owns the GSAP entrance animation.
 * Adding a new `.md` file to the content folder adds it to this grid and to the
 * page automatically on the next build.
 */
export function Design() {
  const entries = getDesigns();

  return (
    <section className="relative overflow-hidden bg-canvas px-6 pt-28 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-14 flex items-end justify-between border-b border-line pb-6 md:mb-16">
          <h2 className="text-5xl font-semibold tracking-tight text-ink md:text-7xl">
            Design.
          </h2>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:block">
            {entries.length} selected works
          </span>
        </div>

        <DesignShowcase entries={entries} />

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
          each card links to a live build
        </p>
      </div>
    </section>
  );
}