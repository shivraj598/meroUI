/* Card - hairline-bordered surface for grouped content.
   Server-safe primitives in the shadcn style: one file, full ownership. */

const CARD_BASE =
  "rounded-md border border-zinc-800 bg-zinc-900/60";

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`${CARD_BASE} ${className}`}>{children}</div>;
}

export function CardHeader({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 ${className}`}>{children}</div>
  );
}

export function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3 className={`text-lg font-semibold tracking-tight text-zinc-50 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={`text-sm leading-6 text-zinc-400 ${className}`}>{children}</p>
  );
}

export function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function CardFooter({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center gap-3 p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}
