"use client";

import { usePathname } from "next/navigation";
import { folioFor } from "@/content/pages";

/** Page number, set in text figures like a book's folio. */
export default function Folio() {
  return (
    <p className="mt-20 text-[0.9rem] text-ink-soft/70">{folioFor(usePathname())}</p>
  );
}
