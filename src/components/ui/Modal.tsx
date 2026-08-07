"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* Modal - focus-trapped dialog with escape and backdrop.
   Controlled by the parent (`open` + `onClose`). Renders into document.body
   via a portal, traps Tab, closes on Escape or backdrop click, locks body
   scroll, restores focus to the opener on close. SSR-safe (portal mounts only
   after first client render). */

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || !mounted) return;
    prevFocus.current = document.activeElement as HTMLElement | null;

    const panel = panelRef.current;
    const focusables = () => {
      if (!panel) return [] as HTMLElement[];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );
    };
    focusables()[0]?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setEntered(true));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      /* if focus escaped the panel (browser chrome, or a non-focusable node),
         pull it back inside instead of leaking to the page behind */
      if (!items.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      setEntered(false);
      prevFocus.current?.focus();
    };
  }, [open, mounted]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        aria-hidden
        onClick={() => onCloseRef.current()}
        className="absolute inset-0 bg-zinc-950/80"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={`relative w-full max-w-md rounded-md border border-zinc-800 bg-zinc-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out motion-reduce:transition-none ${
          entered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-[0.98] opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="text-xl font-semibold tracking-tight text-zinc-50"
            >
              {title}
            </h2>
            {description ? (
              <p id={descId} className="mt-1 text-sm leading-6 text-zinc-400">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => onCloseRef.current()}
            aria-label="Close dialog"
            className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-50"
          >
            close
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer ? (
          <div className="flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}