import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/docs/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Library - meroUI",
  description:
    "Browse the meroUI component library: type-safe, accessible, zero-config React components for Next.js 16 and React 19.",
};

/**
 * Docs layout matching the classic documentation chrome: a sticky top header,
 * then a two-part shell of a sticky grouped sidebar and a reading content
 * column. The sidebar and its mobile drawer live in <Sidebar/>.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      {/* desktop header (hidden below lg; the mobile top bar lives in Sidebar) */}
      <header className="sticky top-0 z-40 hidden h-14 items-center border-b border-line bg-canvas/95 backdrop-blur-sm lg:flex">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8">
          <Link href="/" aria-label="meroUI home" className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center bg-ink text-[11px] font-bold text-canvas">
              m
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight text-ink">
              meroUI
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
              docs
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              v0.1.0
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          <Sidebar />
          <main
            id="main"
            className="min-w-0 pb-24 pt-20 lg:pt-12"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}