"use client";

import { cloneElement, isValidElement, useEffect, useId, useRef, useState } from "react";

/* Tooltip - hover and focus-triggered inline annotation.
   No vendor positioning: absolute against a relative wrapper. The trigger is
   cloned to carry pointer + keyboard handlers and the aria-describedby wiring,
   so focus reaches the real control. */

const SIDES = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
} as const;

type TriggerProps = {
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  "aria-describedby"?: string;
};

export function Tooltip({
  label,
  children,
  side = "top",
  delayMs = 150,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  side?: keyof typeof SIDES;
  delayMs?: number;
  className?: string;
}) {
  const id = useId();
  const [show, setShow] = useState(false);
  const timer = useRef<number | null>(null);

  const enter = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShow(true), delayMs);
  };
  const leave = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setShow(false);
  };

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  const trigger = isValidElement<TriggerProps>(children)
    ? cloneElement(children, {
        onMouseEnter: enter,
        onMouseLeave: leave,
        onFocus: enter,
        onBlur: leave,
        "aria-describedby": id,
      })
    : children;

  return (
    <span className={`relative inline-flex ${className}`}>
      {trigger}
      {show ? (
        <span
          id={id}
          role="tooltip"
          className={`pointer-events-none absolute z-[80] max-w-[16rem] rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-center font-mono text-[10px] leading-4 text-zinc-300 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)] ${SIDES[side]}`}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}