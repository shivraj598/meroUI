import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_COMPONENTS } from "@/components/docs/nav";
import { COMPONENT_DOCS } from "@/components/docs/componentDocs";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CopyBlock } from "@/components/docs/CopyBlock";
import { ComponentToolbar } from "@/components/docs/ComponentToolbar";
import { getComponentSource } from "@/lib/componentSource";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ALL_COMPONENTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = ALL_COMPONENTS.find((c) => c.slug === slug);
  if (!item) return { title: "Not found - meroUI" };
  return { title: `${item.name} - meroUI`, description: item.blurb };
}

/**
 * Per-component documentation page. Each component ships at its own route
 * (/components/[slug]) with a live preview, install and usage code, and a
 * props table. The shared (docs) layout keeps the header and sidebar around.
 */
export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const item = ALL_COMPONENTS.find((c) => c.slug === slug);
  if (!item) notFound();
  const doc = COMPONENT_DOCS[slug];

  return (
    <div className="flex max-w-[56rem] flex-col">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-3">
        <Link
          href="/docs"
          className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint transition-colors hover:text-ink"
        >
          <span className="text-dim">/</span>components<span className="text-dim">/</span>
          <span className="text-muted">{item.slug}</span>
        </Link>
        <span className="hidden h-3 w-px bg-line sm:block" aria-hidden />
        <h1 className="text-[15px] font-semibold tracking-tight text-ink">{item.name}</h1>
        <span className="hidden max-w-[36ch] truncate text-xs leading-5 text-muted md:inline">· {item.blurb}</span>
      </div>

      {/* live preview + source */}
      <ComponentToolbar source={getComponentSource(slug) ?? ""}>
        <div className="flex min-h-[32rem] items-center justify-center rounded-xl border border-line bg-canvas/40 p-6 md:min-h-[36rem] md:p-10">
          <ComponentPreview slug={item.slug} />
        </div>
      </ComponentToolbar>

      {/* install */}
      <h2 className="mt-14 text-2xl font-semibold tracking-tight">Install.</h2>
      <div className="mt-4">
        <CopyBlock code={`npx meroui add ${item.slug}`} lang="bash" />
      </div>

      {/* usage */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Usage.</h2>
      <div className="mt-4">
        <CopyBlock code={doc.usage} lang="tsx" />
      </div>

      {/* props */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Props.</h2>
      <div className="mt-4 overflow-hidden rounded-md border border-line">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-panel/60">
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                name
              </th>
              <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                type
              </th>
              <th className="hidden px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint sm:table-cell">
                description
              </th>
            </tr>
          </thead>
          <tbody>
            {doc.props.map((p) => (
              <tr
                key={p.name}
                className="border-b border-line/60 last:border-0"
              >
                <td className="px-4 py-3 font-mono text-sm text-ink">
                  {p.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-faint">
                  {p.type}
                </td>
                <td className="hidden px-4 py-3 text-sm text-muted sm:table-cell">
                  {p.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}