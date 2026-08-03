export function Input({
  label,
  placeholder,
  hint,
  id,
}: {
  label: string;
  placeholder?: string;
  hint?: string;
  id?: string;
}) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={fieldId} className="flex w-full flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </span>
      <input
        id={fieldId}
        name={fieldId}
        type="text"
        autoComplete={label.toLowerCase().includes("email") ? "email" : "off"}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-50 placeholder:text-zinc-400 transition-colors focus:border-zinc-50 focus:outline-none"
      />
      {hint ? (
        <span className="font-mono text-[11px] text-zinc-400">{hint}</span>
      ) : null}
    </label>
  );
}
