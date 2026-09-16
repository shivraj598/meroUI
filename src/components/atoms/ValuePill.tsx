export function ValuePill({ children, tone }: { children: React.ReactNode; tone?: string }) {
  const style = tone ? { background: tone === "green" ? "var(--green)" : tone, color: "white" } : undefined;
  const cls = tone ? "text-white" : "bg-zinc-900 text-white";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tone ? "" : cls}`}
      style={style}
    >
      {children}
    </span>
  );
}
