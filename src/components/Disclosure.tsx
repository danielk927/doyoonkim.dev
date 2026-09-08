"use client";

import { useId, useState } from "react";

/**
 * One expandable entry. The description is hidden until asked for, so the page
 * reads as a list first and a document second.
 */
export default function Disclosure({
  title,
  meta,
  when,
  children,
}: {
  title: string;
  meta?: string;
  when?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-rule/70 py-4 first:pt-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-baseline gap-3 text-left"
      >
        <span
          aria-hidden
          className={`mt-[0.1em] shrink-0 text-[0.7rem] text-rubric transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
        <span className="flex-1">
          <span className="underline decoration-transparent underline-offset-[5px] transition-colors duration-150 group-hover:decoration-ink/30">
            {title}
          </span>
          {meta && <span className="block italic text-ink-soft">{meta}</span>}
        </span>
        {when && (
          <span className="shrink-0 text-[0.92rem] text-ink-soft">{when}</span>
        )}
      </button>

      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-250 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pl-6 pt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
