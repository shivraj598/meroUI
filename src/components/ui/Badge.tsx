const variants = {
  solid: "bg-ink text-canvas",
  outline: "border border-line-strong text-ink",
  dot: "border border-line bg-panel text-muted",
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
          className="dot-pulse size-1.5 rounded-full bg-ink"
        />
      ) : null}
      {children}
    </span>
  );
}
