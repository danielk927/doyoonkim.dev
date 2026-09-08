"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES } from "@/content/pages";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-[0.95rem]">
      {PAGES.map((page) => {
        const current = pathname === page.href;
        return (
          <Link
            key={page.href}
            href={page.href}
            aria-current={current ? "page" : undefined}
            className={
              current
                ? "text-rubric underline decoration-rubric/40 underline-offset-[5px]"
                : "text-ink-soft underline decoration-transparent underline-offset-[5px] transition-colors duration-150 hover:text-ink hover:decoration-ink/30"
            }
          >
            {page.label}
          </Link>
        );
      })}
    </nav>
  );
}
