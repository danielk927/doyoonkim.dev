"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES } from "@/content/pages";

/** Words only: no bar, no background, no border. */
export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap justify-center gap-x-7 gap-y-1 text-[0.95rem]">
      {PAGES.map((page) => {
        const current = pathname === page.href;
        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={current ? "page" : undefined}
            className={
              current
                ? "text-ink underline underline-offset-[5px]"
                : "text-muted transition-colors duration-150 hover:text-ink"
            }
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
