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
    <div className="rounded-md border border-line bg-scrim/70 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-sm leading-6">
          <span className="text-ink">$ </span>
          <span className="text-ink">{command}</span>
          <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-ink" />
        </p>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md border border-line-strong px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink hover:text-ink"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      {output && output.length > 0 && (
        <div className="mt-2 border-t border-line/70 pt-2">
          {output.map((line) => (
            <p key={line} className="font-mono text-sm leading-6 text-faint">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}