// Stub — will be rebuilt as AI-primitive
import Link from "next/link";
import type { ReactNode } from "react";
type Props = {
  children: ReactNode;
  href?: string;
  variant?: string;
  size?: string;
  className?: string;
  onClick?: () => void;
};
export function Button({ children, href, className, onClick }: Props) {
  const cls = `inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm text-white ${className ?? ""}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
export default Button;
