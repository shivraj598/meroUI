/* Table - dense data rows with sticky headers and mono cells.
   Semantic primitives. The overflow wrapper keeps wide tables mobile-safe;
   sticky column headers hold their place inside a height-constrained scroll
   area. Server-safe. */

export function Table({
  children,
  mono = false,
  className = "",
}: {
  children: React.ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table
        className={`w-full border-collapse text-left text-sm ${
          mono ? "font-mono" : ""
        }`}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={`border-b border-line last:border-0 ${className}`}>
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`sticky top-0 z-10 whitespace-nowrap bg-panel px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  mono = false,
  className = "",
}: {
  children: React.ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <td
      className={`px-4 py-3 align-middle text-ink ${
        mono ? "font-mono text-xs" : ""
      } ${className}`}
    >
      {children}
    </td>
  );
}