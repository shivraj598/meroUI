"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* Toast - transient feedback, stacked and auto-dismissing.
   Provider + viewport + hook. Fixed bottom-right stack, entrance via a mounted
   transition (reduced-motion safe), auto-dismiss timer per toast. */

export type ToastOptions = {
  title: string;
  description?: string;
  /** auto-dismiss delay in ms (default 4000). */
  duration?: number;
};

type ToastItem = {
  id: number;
  title: string;
  description?: string;
};

type ToastContextValue = {
  toasts: ToastItem[];
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef<Set<number>>(new Set());

  /* clear every pending dismissal timer on unmount so no toast lingers */
  useEffect(
    () => () => {
      timers.current.forEach((h) => window.clearTimeout(h));
      timers.current.clear();
    },
    []
  );

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++;
      setToasts((t) => [
        ...t,
        { id, title: options.title, description: options.description },
      ]);
      const handle = window.setTimeout(
        () => dismiss(id),
        options.duration ?? 4000
      );
      timers.current.add(handle);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastViewport({ className = "" }: { className?: string }) {
  const { toasts, dismiss } = useToast();
  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed right-4 bottom-4 z-[110] flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-2.5 ${className}`}
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: () => void;
}) {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`pointer-events-auto flex items-start justify-between gap-3 rounded-md border border-zinc-800 bg-zinc-900/90 px-4 py-3 backdrop-blur-sm transition-all duration-300 ease-out motion-reduce:transition-none ${
        entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-zinc-50">{toast.title}</p>
        {toast.description ? (
          <p className="mt-0.5 text-xs leading-5 text-zinc-400">
            {toast.description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-50"
      >
        close
      </button>
    </div>
  );
}