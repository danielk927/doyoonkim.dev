"use client";

import { useEffect, useRef } from "react";
import type { Section } from "@/content";

/**
 * The content window. Styled as a Gen 4 dialogue box -- cream ground, a double
 * border in two blues, hard drop shadow -- because that chrome carries much of
 * the impression at no asset cost.
 */
export default function Panel({
  section,
  onClose,
}: {
  section: Section;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "e" || e.key === "E") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-[#0d1622]/55 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-label={section.title}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full w-full max-w-3xl flex-col rounded-lg border-4 border-[#2f4562] bg-[#f8f4e6] shadow-[0_8px_0_0_rgba(13,22,34,0.45)] outline-none"
      >
        <div className="rounded-t-sm border-b-4 border-[#8fb3d9] bg-[#2f4562] px-4 py-3">
          <h2
            className="text-[11px] leading-relaxed tracking-wide text-[#f8f4e6] sm:text-[13px]"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            {section.title}
          </h2>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {section.blurb && (
            <p className="mb-6 text-[15px] leading-relaxed text-[#33404f]">
              {section.blurb}
            </p>
          )}
          <div className="space-y-6">
            {section.entries.map((entry) => (
              <article key={entry.title}>
                <h3 className="text-[15px] font-semibold text-[#1d2b3a]">
                  {entry.title}
                </h3>
                {entry.meta && (
                  <p className="mt-0.5 text-[13px] text-[#5c6b7d]">{entry.meta}</p>
                )}
                {entry.when && (
                  <p className="mt-0.5 text-[12px] uppercase tracking-wide text-[#8a97a6]">
                    {entry.when}
                  </p>
                )}
                {entry.bullets && (
                  <ul className="mt-2 space-y-1.5">
                    {entry.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-4 text-[14px] leading-relaxed text-[#33404f] before:absolute before:left-0 before:top-[0.55em] before:h-[5px] before:w-[5px] before:bg-[#c34b35]"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="flex items-center justify-end gap-2 border-t-2 border-[#d8d0ba] px-4 py-2.5 text-[9px] text-[#5c6b7d] hover:text-[#1d2b3a]"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          CLOSE
          <span className="inline-block animate-bounce text-[#c34b35]">▼</span>
        </button>
      </div>
    </div>
  );
}
