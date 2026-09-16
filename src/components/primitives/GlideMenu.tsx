"use client";

import * as React from "react";

type GlideMenuProps = {
  children: React.ReactNode;
  className?: string;
  highlightClassName?: string;
  rowSelector?: string;
};

/**
 * GlideMenu — gliding highlight that follows hovered row.
 * Mirrors original primitive: single absolute highlight that tweens to active row.
 */
export default function GlideMenu({ children, className, highlightClassName, rowSelector = "[data-row]" }: GlideMenuProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [box, setBox] = React.useState<{ top: number; height: number; visible: boolean }>({ top: 0, height: 0, visible: false });

  React.useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const update = (target: Element | null) => {
      if (!target) {
        setBox((b) => ({ ...b, visible: false }));
        return;
      }
      const row = target.closest(rowSelector) as HTMLElement | null;
      if (!row || !root.contains(row)) {
        setBox((b) => ({ ...b, visible: false }));
        return;
      }
      setBox({ top: row.offsetTop, height: row.offsetHeight, visible: true });
    };

    const onOver = (e: MouseEvent) => update(e.target as Element);
    const onLeave = () => setBox((b) => ({ ...b, visible: false }));

    root.addEventListener("mouseover", onOver);
    root.addEventListener("mouseleave", onLeave);
    return () => {
      root.removeEventListener("mouseover", onOver);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [rowSelector]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 right-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${highlightClassName ?? "bg-hover-2"}`}
        style={{
          top: box.top,
          height: box.height,
          opacity: box.visible ? 1 : 0,
        }}
      />
      {children}
    </div>
  );
}
