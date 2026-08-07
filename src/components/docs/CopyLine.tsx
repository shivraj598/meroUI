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
    <div className="rounded-md border border-zinc-800 bg-zinc-950/70 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-sm leading-6">
          <span className="text-zinc-50">$ </span>
          <span className="text-zinc-300">{command}</span>
          <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-zinc-50" />
        </p>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md border border-zinc-700 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-zinc-50 hover:text-zinc-50"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>
      {output && output.length > 0 && (
        <div className="mt-2 border-t border-zinc-800/70 pt-2">
          {output.map((line) => (
            <p key={line} className="font-mono text-sm leading-6 text-zinc-500">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}