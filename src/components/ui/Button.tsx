import Link from "next/link";

const variants = {
  solid: "bg-zinc-50 text-zinc-950 hover:bg-zinc-200",
  ghost:
    "border border-zinc-800 text-zinc-50 hover:border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950",
  quiet: "text-zinc-400 hover:text-zinc-50",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function Button({
  children,
  variant = "solid",
  size = "md",
  href,
  disabled,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  disabled?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-mono font-medium uppercase tracking-[0.12em] transition-all duration-200 active:translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
