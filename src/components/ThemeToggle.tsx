"use client";

import { useEffect, useState } from "react";

/**
 * Light / dark toggle. Reads the .dark class set by the theme init script
 * (localStorage first, then system preference), flips it, and persists the
 * choice so navigating the site keeps the mode.
 */
export function ThemeToggle({ label = false }: { label?: boolean }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("mero-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
    setDark(next);
  };

  const cls = `inline-flex items-center gap-2 rounded-full border border-line px-2.5 h-8 text-[11px] font-mono uppercase tracking-[0.14em] text-muted transition-colors hover:border-line-strong hover:text-ink`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cls}
    >
      {dark ? (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden className="size-4">
          <circle cx="10" cy="10" r="4" fill="currentColor" stroke="none" />
          <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-4">
          <path d="M16.5 11.5A6.5 6.5 0 0 1 8.5 3.5 6.5 6.5 0 1 0 16.5 11.5Z" />
        </svg>
      )}
      {label && <span>{dark ? "light" : "dark"}</span>}
    </button>
  );
}