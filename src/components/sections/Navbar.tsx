import { Button } from "@/components/ui/Button";

const links = [
  { label: "Components", href: "#components" },
  { label: "Install", href: "#install" },
  { label: "Changelog", href: "#changelog" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center bg-zinc-50 text-[11px] font-bold leading-none text-zinc-950">
            m
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-zinc-50">
            meroUI
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button href="#install" size="sm">
          Get started
        </Button>
      </nav>
    </header>
  );
}
