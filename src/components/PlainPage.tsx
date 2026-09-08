import { LINKS, SECTIONS } from "@/content";

/**
 * The whole site as static HTML. Phones get this, `<noscript>` points here, and
 * it is the only version search engines and AI crawlers can read -- canvas
 * content is invisible to all of them. Same content module as the game panels,
 * so the two cannot drift.
 */
export default function PlainPage({ showGameLink = true }: { showGameLink?: boolean }) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-14 text-[#22303f]">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Doyoon (Daniel) Kim</h1>
        <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-[#c34b35] underline underline-offset-2">
              {l.label}
            </a>
          ))}
        </nav>
        {showGameLink && (
          <p className="mt-5 text-sm text-[#5c6b7d]">
            There is also{" "}
            <a href="/" className="text-[#c34b35] underline underline-offset-2">
              a version you walk around
            </a>
            . It needs a keyboard.
          </p>
        )}
      </header>

      {SECTIONS.map((section) => (
        <section key={section.key} className="mb-11">
          <h2 className="mb-4 border-b-2 border-[#e2ddd0] pb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c6b7d]">
            {section.title}
          </h2>
          {section.blurb && (
            <p className="mb-6 leading-relaxed text-[15px]">{section.blurb}</p>
          )}
          <div className="space-y-6">
            {section.entries.map((entry) => (
              <article key={entry.title}>
                <h3 className="text-[15px] font-semibold">{entry.title}</h3>
                {entry.meta && <p className="mt-0.5 text-sm text-[#5c6b7d]">{entry.meta}</p>}
                {entry.when && (
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-[#8a97a6]">
                    {entry.when}
                  </p>
                )}
                {entry.bullets && (
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed marker:text-[#c34b35]">
                    {entry.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
