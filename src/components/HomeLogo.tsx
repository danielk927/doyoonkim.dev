"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Way back to the front page. Absolutely positioned so it can never move the
 * nav, and hidden on the front page itself where it would lead nowhere.
 */
export default function HomeLogo() {
  if (usePathname() === "/") return null;

  return (
    <Link
      href="/"
      aria-label="Home"
      className="absolute left-0 top-1/2 -translate-y-1/2 text-muted transition-colors duration-150 hover:text-ink"
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 10.6 12 3.2l9 7.4" />
        <path d="M5.6 9.6V20.4h12.8V9.6" />
      </svg>
    </Link>
  );
}
