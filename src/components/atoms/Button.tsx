"use client";

import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "accent" | "success" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md";
};

const variantCls: Record<ButtonVariant, string> = {
  primary: "bg-zinc-900 text-white hover:bg-black",
  secondary: "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50",
  accent: "bg-violet-600 text-white hover:bg-violet-700",
  success: "bg-emerald-600 text-white hover:bg-emerald-700",
  ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100",
};

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const sizeCls = size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 text-sm";
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:opacity-50 ${variantCls[variant]} ${sizeCls} ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
