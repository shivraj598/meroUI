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
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <input
        id={fieldId}
        name={fieldId}
        type="text"
        autoComplete={label.toLowerCase().includes("email") ? "email" : "off"}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-line bg-panel px-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-ink focus:outline-none"
      />
      {hint ? (
        <span className="font-mono text-[11px] text-muted">{hint}</span>
      ) : null}
    </label>
  );
}
