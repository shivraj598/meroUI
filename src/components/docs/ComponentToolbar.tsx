"use client";

import { useState } from "react";
import { CopyBlock } from "@/components/docs/CopyBlock";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Per-component toolbar. Copy grabs the full component source in one click;
 * Code toggles between the live preview and the complete source file, which
 * ships with its own copy button inside the block.
 */
export function ComponentToolbar({
  source,
  children,
}: {
  source: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  const buttonClass = (active = false) =>
    `flex size-8 items-center justify-center rounded-md border bg-panel/60 transition-colors ${
      active
        ? "border-line-strong text-ink"
        : "border-line text-muted hover:border-line-strong hover:text-ink"
    }`;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy source"}
          onClick={copy}
          className={buttonClass(copied)}
        >
          {copied ? (
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
        <button
          type="button"
          aria-label={showCode ? "Show preview" : "Show code"}
          aria-expanded={showCode}
          onClick={() => setShowCode((current) => !current)}
          className={buttonClass(showCode)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
            <path d="m16 18 6-6-6-6" />
            <path d="m8 6-6 6 6 6" />
          </svg>
        </button>
      </div>

      {showCode ? (
        <div className="mt-3 max-h-[36rem] overflow-y-auto">
          <CopyBlock code={source} />
        </div>
      ) : (
        children
      )}
    </div>
  );
}