import type { DesignEntry } from "@/lib/designs";

function DesignCard({
  entry,
  featured = false,
}: {
  entry: DesignEntry;
  featured?: boolean;
}) {
  return (
    <a
      href={entry.liveDemoUrl || "#"}
      target={entry.liveDemoUrl ? "_blank" : undefined}
      rel={entry.liveDemoUrl ? "noreferrer noopener" : undefined}
      className={`group relative block overflow-hidden rounded-md border border-line bg-panel/60 ${
        featured ? "aspect-[16/8]" : "aspect-[16/10]"
      }`}
    >
      {entry.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.image}
          alt={entry.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-panel">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
            no image
          </span>
        </div>
      )}

      {/* scrim lifts on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-scrim/95 via-scrim/35 to-scrim/10 transition-opacity duration-500 group-hover:opacity-90" />

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <p className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {entry.title}
        </p>
        <p className="mt-2 line-clamp-2 max-w-md text-sm leading-6 text-muted">
          {entry.summary}
        </p>
        {entry.tags.length > 0 && (
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
            {entry.tags.join(" / ")}
          </p>
        )}
      </div>

      <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-code-border bg-code px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-code-ink backdrop-blur-sm transition-colors group-hover:border-code-ink/70">
        view live
        <span aria-hidden className="text-code-muted">
          &#8599;
        </span>
      </span>
    </a>
  );
}

/**
 * Design showcase grid: newest entry full-width, the rest two-up.
 * Server-rendered and static — hover states are pure CSS.
 */
export function DesignShowcase({ entries }: { entries: DesignEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed border-line py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
          add .md files to content/web-design
        </p>
      </div>
    );
  }

  const [first, ...rest] = entries;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <DesignCard entry={first} featured />
      </div>
      {rest.map((entry) => (
        <DesignCard key={entry.slug} entry={entry} />
      ))}
    </div>
  );
}
