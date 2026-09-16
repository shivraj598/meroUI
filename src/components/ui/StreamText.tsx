"use client";

import * as React from "react";

export type StreamTextProps = {
  text: string;
  streaming?: boolean;
  speed?: number; // ms per token
  className?: string;
  showCaret?: boolean;
};

/**
 * StreamText — word-by-word streaming reveal
 * Markdown-aware by tokenizing on spaces, preserves whitespace.
 * Use after AIThinking completes. Respects prefers-reduced-motion.
 */
export function StreamText({ text, streaming = true, speed = 22, className, showCaret = true }: StreamTextProps) {
  const [index, setIndex] = React.useState(0);
  const tokens = React.useMemo(() => text.split(/(\s+)/), [text]);
  const prefersReduced = React.useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  React.useEffect(() => {
    if (!streaming || prefersReduced) {
      setIndex(tokens.length);
      return;
    }
    setIndex(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setIndex(i);
      if (i >= tokens.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [tokens.length, streaming, speed, prefersReduced, text]);

  const visible = tokens.slice(0, index).join("");
  const remaining = tokens.slice(index).join("");

  return (
    <p className={`whitespace-pre-wrap text-sm leading-7 text-zinc-800 md:text-[15px] ${className ?? ""}`}>
      <span>{visible}</span>
      {streaming && index < tokens.length && showCaret && (
        <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-1 bg-violet-600 align-text-bottom" style={{ animation: "stream-caret 0.9s step-end infinite" }} />
      )}
      {/* keep remaining in DOM for layout stability but hidden */}
      <span className="invisible absolute" aria-hidden>
        {remaining}
      </span>
      <style>{`
        @keyframes stream-caret { 0%,50% { opacity: 1 } 51%,100% { opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { span[style*="stream-caret"] { animation: none !important; } }
      `}</style>
    </p>
  );
}

export default StreamText;
