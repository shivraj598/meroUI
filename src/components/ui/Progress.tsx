export function Progress({ value, label }: { value: number; label?: string }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
          <span>{label}</span>
          <span className="text-zinc-400">{value}%</span>
        </div>
      ) : null}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800"
        role="progressbar"
        aria-label={label ?? "Progress"}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-grow h-full rounded-full bg-zinc-50"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
