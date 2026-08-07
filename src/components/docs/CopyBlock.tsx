"use client";

import { useState } from "react";

/**
 * Multi-line code block with a copy affordance. Rendered in mono on a raised
 * surface; the copy button gives the interaction a concrete result.
 */
export function CopyBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-md border border-code-border bg-code">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded-full border border-code-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-code-muted transition-colors hover:border-code-ink/70 hover:text-code-ink"
      >
        {copied ? "copied" : "copy"}
      </button>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-code-ink">
        <code>{code}</code>
      </pre>
    </div>
  );
}