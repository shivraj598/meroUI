import { redirect } from "next/navigation";

/**
 * The library root has no index of its own; the grouped list lives at /docs.
 * Keep the bare /components path useful by pointing it there.
 */
export default function ComponentsIndex() {
  redirect("/docs#components");
}