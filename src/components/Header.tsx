"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "./Nav";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="space-y-2 text-center">
      {pathname !== "/" && (
        <p>
          <Link
            href="/"
            className="text-[0.95rem] text-muted transition-colors duration-150 hover:text-ink"
          >
            Doyoon (Daniel) Kim
          </Link>
        </p>
      )}
      <Nav />
    </header>
  );
}
