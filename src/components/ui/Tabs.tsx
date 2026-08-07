"use client";

import { useState } from "react";

export function Tabs({
  items,
}: {
  items: { label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div
        role="tablist"
        className="flex items-center gap-1 border-b border-line"
      >
        {items.map((item, i) => (
          <button
            key={item.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`relative -mb-px px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              active === i
                ? "text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {item.label}
            <span
              aria-hidden
              className={`absolute inset-x-0 bottom-0 h-0.5 bg-ink transition-transform duration-300 ${
                active === i ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>
      <div className="pt-6 font-mono text-xs leading-6 text-muted">
        {items[active]?.content}
      </div>
    </div>
  );
}
