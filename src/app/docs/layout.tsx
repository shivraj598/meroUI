import type { Metadata } from "next";
import { Sidebar } from "@/components/docs/Sidebar";

export const metadata: Metadata = {
  title: "Library - meroUI",
  description:
    "Browse the meroUI component library: type-safe, accessible, zero-config React components for Next.js 16 and React 19.",
};

/**
 * Docs layout: a documentation-style shell with a fixed sidebar on desktop
 * and a drawer on mobile. The root layout keeps global chrome (grain,
 * scroll progress, preloader) intact.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50">
      <Sidebar />
      <div className="lg:pl-16">
        <main
          id="main"
          className="mx-auto w-full max-w-6xl px-5 pt-24 pb-28 md:px-10 lg:pt-16"
        >
          {children}
        </main>
      </div>
    </div>
  );
}