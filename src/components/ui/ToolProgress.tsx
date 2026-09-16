"use client";

export type ToolStep = {
  id: string;
  label: string;
  detail?: string;
  status: "pending" | "active" | "done" | "error";
};

export type ToolProgressProps = {
  steps: ToolStep[];
  className?: string;
};

/**
 * ToolProgress — step bar for AI agent tool calls
 * ChatGPT-style "Searching 3 sources → Reading → Synthesizing"
 * Horizontal on desktop, stacked on mobile. One file, no deps.
 */
export function ToolProgress({ steps, className }: ToolProgressProps) {
  const activeIndex = steps.findIndex((s) => s.status === "active");
  const progress = steps.length ? ((steps.filter((s) => s.status === "done").length + (activeIndex >= 0 ? 0.5 : 0)) / steps.length) * 100 : 0;

  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-wide text-zinc-500">TOOL PROGRESS</span>
        <span className="text-xs text-zinc-400">{steps.filter((s) => s.status === "done").length}/{steps.length} done</span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full bg-violet-600 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <ol className="mt-4 grid gap-2 sm:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm ${
              step.status === "active"
                ? "border-violet-200 bg-violet-50 text-violet-900"
                : step.status === "done"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                  : step.status === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-zinc-200 bg-zinc-50 text-zinc-500"
            }`}
          >
            <span
              aria-hidden
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs ${
                step.status === "done"
                  ? "bg-emerald-600 text-white"
                  : step.status === "active"
                    ? "bg-violet-600 text-white"
                    : step.status === "error"
                      ? "bg-red-600 text-white"
                      : "bg-white text-zinc-400 border border-zinc-200"
              }`}
              style={step.status === "active" ? { animation: "tp-spin 1s linear infinite" } : undefined}
            >
              {step.status === "done" ? "✓" : step.status === "active" ? "◐" : step.status === "error" ? "!" : "•"}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium leading-none">{step.label}</span>
              {step.detail && <span className="block truncate text-xs opacity-70">{step.detail}</span>}
            </span>
          </li>
        ))}
      </ol>

      <style>{`
        @keyframes tp-spin { to { transform: rotate(360deg) } }
        @media (prefers-reduced-motion: reduce) { span[style*="tp-spin"] { animation: none !important; } }
      `}</style>
    </div>
  );
}

export default ToolProgress;
