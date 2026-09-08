/** The four pages, in reading order. Folios come from this order. */
export const PAGES = [
  { href: "/", label: "Main" },
  { href: "/projects", label: "Projects" },
  { href: "/food", label: "Food" },
  { href: "/notes", label: "Notes" },
] as const;

export function folioFor(pathname: string): number {
  const i = PAGES.findIndex((p) => p.href === pathname);
  return (i === -1 ? 0 : i) + 1;
}
