"use client";

import { useState } from "react";

/**
 * Playground: one tabbed panel where visitors actually touch the
 * primitives — flip switches, stack toasts, watch progress fill.
 * A single interactive centerpiece instead of scattered demos.
 */
const TABS = ["actions", "feedback", "form"] as const;

export function Playground() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("actions");
  const [on, setOn] = useState(true);
  const [toasts, setToasts] = useState(2);
  const [voted, setVoted] = useState<string | null>(null);

  return (
    <section id="playground" className="border-t border-line bg-panel/30 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">playground</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Touch it before you take it<span className="text-dim">.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted md:text-base">
            Everything below is live meroUI source running on this page —
            the same file you would copy into your project.
          </p>
          <div className="mt-8 inline-flex gap-1 rounded-full border border-line bg-canvas p-1" role="tablist" aria-label="Playground demos">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-200 active:scale-95 ${
                  tab === t ? "bg-ink text-canvas" : "text-muted hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-80 rounded-md border border-code-border bg-code p-6 shadow-raised md:p-10">
          {tab === "actions" && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-code-muted">button / badge / tabs</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {["Deploy", "Preview"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex h-11 cursor-default items-center rounded-full bg-ink px-6 font-mono text-xs font-medium uppercase tracking-[0.12em] text-canvas transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    {label}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-code-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-code-muted">
                  <span aria-hidden className="dot-pulse size-1.5 rounded-full bg-green" />
                  live
                </span>
              </div>
              <div className="mt-8 flex gap-1 border-b border-code-border" role="tablist" aria-label="Demo tabs">
                {["code", "props", "a11y"].map((t, i) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={i === 0}
                    onClick={() => setVoted(t)}
                    className={`relative px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      (voted ?? "code") === t ? "text-code-ink" : "text-code-muted hover:text-code-ink"
                    }`}
                  >
                    {t}
                    {(voted ?? "code") === t && (
                      <span aria-hidden className="absolute inset-x-2 bottom-0 h-0.5 bg-code-ink" />
                    )}
                  </button>
                ))}
              </div>
              <p className="pt-5 font-mono text-sm text-code-muted">
                <span className="text-code-ink">{"<Button>"}</span>Deploy
                <span className="text-code-ink">{"</Button>"}</span>
              </p>
            </div>
          )}

          {tab === "feedback" && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-code-muted">toast / progress</p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setToasts((n) => Math.min(n + 1, 4))}
                  className="rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-canvas transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  fire toast
                </button>
                <button
                  type="button"
                  onClick={() => setToasts(1)}
                  className="rounded-full border border-code-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-code-muted transition-colors hover:border-code-ink/60 hover:text-code-ink"
                >
                  clear
                </button>
              </div>
              <div className="mt-6 space-y-2" aria-live="polite">
                {Array.from({ length: toasts }).map((_, i) => (
                  <div
                    key={i}
                    className="pop-in flex items-center gap-2.5 rounded-md border border-line bg-canvas px-4 py-3 shadow-card"
                    style={{ opacity: 1 - i * 0.18 }}
                  >
                    <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-green dot-pulse" />
                    <span className="font-mono text-xs text-ink">
                      {["Deployed to production", "Preview ready", "Draft saved", "Cache purged"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-code-muted">
                  <span>shipping</span>
                  <span>{Math.min(24 + toasts * 16, 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line-strong/40">
                  <div
                    className="h-full rounded-full bg-code-ink transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(24 + toasts * 16, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {tab === "form" && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-code-muted">input / toggle</p>
              <label className="mt-6 block max-w-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-code-muted">email</span>
                <input
                  type="email"
                  placeholder="you@studio.dev"
                  className="mt-2 h-11 w-full rounded-md border border-code-border bg-canvas/60 px-4 font-mono text-sm text-ink outline-none transition-colors placeholder:text-dim focus:border-code-ink"
                />
              </label>
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label="Email notifications"
                  onClick={() => setOn((v) => !v)}
                  className={`relative h-7 w-13 rounded-full border transition-colors duration-200 ${
                    on ? "border-code-ink bg-code-ink" : "border-code-border bg-panel"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-1/2 size-5 -translate-y-1/2 rounded-full transition-all duration-200 ${
                      on ? "left-[calc(100%-1.5rem)] bg-code" : "left-1 bg-dim"
                    }`}
                  />
                </button>
                <span className="font-mono text-xs text-code-muted">
                  notifications {on ? "on" : "off"}
                </span>
              </div>
              <p className="mt-8 border-t border-code-border pt-4 font-mono text-[11px] leading-6 text-code-muted">
                every control here is keyboard reachable — tab through it.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
