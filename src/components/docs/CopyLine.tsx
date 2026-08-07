"use client";

import { useState } from "react";

/**
 * Functional code line with a copy-to-clipboard affordance. A single command
 * can carry the blinking caret; a real copy button gives the interaction a
 * concrete result instead of pretending to be decorative window chrome.
 */
export function CopyLine({
  command,
  output,
}: {
  command: string;
  output?: string[];
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="rounded-md border border-code-border bg-code px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-sm leading-6">
          <span className="text-code-muted">$ </span>
          <span className="text-code-ink">{command}</span>
          <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-code-ink" />
        </p>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md border border-code-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-code-muted transition-colors hover:border-code-ink/70 hover:text-code-ink"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      {output && output.length > 0 && (
        <div className="mt-2 border-t border-code-border pt-2">
          {output.map((line) => (
            <p key={line} className="font-mono text-sm leading-6 text-code-muted">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}