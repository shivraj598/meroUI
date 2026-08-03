const variants = {
  solid: "bg-zinc-50 text-zinc-950",
  outline: "border border-zinc-700 text-zinc-300",
  dot: "border border-zinc-800 bg-zinc-900 text-zinc-400",
};

export function Badge({
  children,
  variant = "solid",
  pulse = false,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  pulse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] ${variants[variant]}`}
    >
      {pulse ? (
        <span
          aria-hidden
          className="dot-pulse size-1.5 rounded-full bg-zinc-50"
        />
      ) : null}
      {children}
    </span>
  );
}
