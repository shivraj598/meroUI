"use client";

import { useState } from "react";

export function Toggle({
  label = "Toggle",
  defaultOn = false,
}: {
  label?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => setOn((v) => !v)}
      className={`relative h-7 w-13 shrink-0 rounded-full border transition-colors duration-300 ${
        on
          ? "border-zinc-50 bg-zinc-50"
          : "border-zinc-700 bg-zinc-900"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-1/2 size-5 -translate-y-1/2 rounded-full transition-all duration-300 ${
          on
            ? "left-[calc(100%-1.5rem)] bg-zinc-950"
            : "left-1 bg-zinc-400"
        }`}
      />
    </button>
  );
}
