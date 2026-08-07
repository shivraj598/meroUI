import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_COMPONENTS } from "@/components/docs/nav";
import { COMPONENT_DOCS } from "@/components/docs/componentDocs";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CopyBlock } from "@/components/docs/CopyBlock";

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
      <Link
        href="/docs"
        className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint transition-colors hover:text-ink"
      >
        <span className="text-dim">/</span>components
        <span className="text-dim">/</span>
        <span className="text-muted">{item.slug}</span>
      </Link>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
        {item.name}.
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-muted">
        {item.blurb}
      </p>

      {/* live preview */}
      <div className="mt-8 flex h-56 items-center justify-center rounded-md border border-line bg-canvas/40 p-8">
        <ComponentPreview slug={item.slug} />
      </div>

      {/* install */}
      <h2 className="mt-14 text-2xl font-semibold tracking-tight">Install.</h2>
      <div className="mt-4">
        <CopyBlock code={`npx meroui add ${item.slug}`} />
      </div>

      {/* usage */}
      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Usage.</h2>
      <div className="mt-4">
        <CopyBlock code={doc.usage} />
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