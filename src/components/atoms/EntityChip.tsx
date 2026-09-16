export function EntityChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-800 shadow-sm">
      <span className="flex size-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
        {name.slice(0, 1).toUpperCase()}
      </span>
      {name}
    </span>
  );
}
