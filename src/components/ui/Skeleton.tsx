/* Skeleton - quiet placeholders while data streams in.
   CSS-only pulse; collapses to a static block under reduced motion. */

export function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-md bg-zinc-800 motion-reduce:animate-none ${className}`}
    />
  );
}
