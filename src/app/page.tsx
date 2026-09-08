"use client";

import { useEffect, useState } from "react";
import GameCanvas from "@/components/GameCanvas";
import PlainPage from "@/components/PlainPage";

/**
 * Coarse pointers get the static page rather than a game they cannot play.
 * Detected by input capability, not user-agent string.
 */
function useNeedsKeyboardFallback() {
  const [fallback, setFallback] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () =>
      setFallback(
        window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 700,
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return fallback;
}

export default function Home() {
  const fallback = useNeedsKeyboardFallback();

  if (fallback === null) return <div className="h-dvh bg-[#1d2b3a]" />;

  if (fallback) {
    return (
      <>
        <PlainPage showGameLink={false} />
        <p className="mx-auto max-w-2xl px-6 pb-14 text-sm text-[#5c6b7d]">
          There is a version of this you walk around as a character, but it needs a
          keyboard — open it on a desktop.
        </p>
      </>
    );
  }

  return <GameCanvas />;
}
