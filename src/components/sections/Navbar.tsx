import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { label: "Features", href: "#features" },
  { label: "Install", href: "#install" },
  { label: "Changelog", href: "#changelog" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-6 items-center justify-center bg-ink text-[11px] font-bold leading-none text-canvas">
            m
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-ink">
            meroUI
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Button href="/docs" variant="ghost" size="sm">
              Docs
            </Button>
            <Button href="/templates" variant="ghost" size="sm">
              Templates
            </Button>
          </div>
          <Button href="/docs" size="sm">
            Get started
          </Button>
        </div>
      </nav>
    </header>
  );
}
