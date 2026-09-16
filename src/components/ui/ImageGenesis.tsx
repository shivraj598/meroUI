"use client";

import * as React from "react";

export type ImageGenesisProps = {
  src: string;
  alt: string;
  prompt?: string;
  aspect?: string; // e.g. "16/9"
  loading?: boolean;
  className?: string;
};

/**
 * ImageGenesis — Gemini-style image creating effect
 * Shimmer skeleton → blur-up reveal when loaded.
 * Use while image is generating; flip loading=false to reveal.
 */
export function ImageGenesis({ src, alt, prompt, aspect = "16/10", loading = true, className }: ImageGenesisProps) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (loading) setLoaded(false);
  }, [loading]);

  return (
    <div className={`overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-sm ${className ?? ""}`}>
      <div className="relative overflow-hidden bg-zinc-50" style={{ aspectRatio: aspect }}>
        {/* shimmer placeholder */}
        {(!loaded || loading) && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50" />
            <div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
              style={{ animation: "gen-shimmer 1.1s ease-in-out infinite" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
              <span className="size-8 rounded-full border-2 border-zinc-200 border-t-violet-600" style={{ animation: "gen-spin 0.9s linear infinite" }} aria-hidden />
              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm border border-zinc-100">
                {prompt ? `“${prompt.slice(0, 42)}${prompt.length > 42 ? "…" : ""}”` : "Generating image…"}
              </span>
            </div>
          </div>
        )}

        {/* real image — blur-up */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            loading || !loaded ? "scale-[1.02] blur-[12px] opacity-0" : "scale-100 blur-0 opacity-100"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        />

        {/* subtle vignette after load */}
        <div className={`pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-black/5 transition-opacity ${loading || !loaded ? "opacity-0" : "opacity-100"}`} />

        <style>{`
          @keyframes gen-shimmer { 100% { transform: translateX(100%) } }
          @keyframes gen-spin { to { transform: rotate(360deg) } }
          @media (prefers-reduced-motion: reduce) { div[style*="gen-"] { animation: none !important; } }
        `}</style>
      </div>

      {prompt && (
        <div className="flex items-center justify-between px-4 py-3">
          <span className="truncate text-xs text-zinc-500">{prompt}</span>
          <span className={`ml-3 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${loading || !loaded ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
            {loading || !loaded ? "Creating…" : "Done"}
          </span>
        </div>
      )}
    </div>
  );
}

export default ImageGenesis;
