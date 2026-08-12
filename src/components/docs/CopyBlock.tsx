"use client";

import { useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";

/**
 * Multi-line code block with a copy affordance. Rendered in mono on a
 * theme-aware surface (soft panel in light mode, deep ink in dark), with
 * syntax tinted onto the semantic palette. The copy button gives the
 * interaction a concrete result.
 */
export function CopyBlock({
  code,
  lang = "tsx",
}: {
  code: string;
  lang?: "tsx" | "bash";
}) {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    try {
      return Prism.highlight(code, Prism.languages[lang], lang);
    } catch {
      return code;
    }
  }, [code, lang]);

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
    <div className="group relative overflow-hidden rounded-lg border border-code-border bg-code shadow-hairline">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2.5 top-2.5 rounded-md border border-code-border bg-code px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-code-muted transition-colors hover:border-code-ink/40 hover:text-code-ink"
      >
        {copied ? "copied" : "copy"}
      </button>
      <pre className="code-syntax overflow-x-auto p-4 pr-16 font-mono text-[12.5px] leading-relaxed text-code-ink">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}