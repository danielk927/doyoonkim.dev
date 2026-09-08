/** Section head, set in small caps the way a book breaks a chapter. */
export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mb-4 border-b border-rule pb-1.5 text-[1rem] tracking-[0.1em] text-ink-soft"
      style={{ fontVariantCaps: "small-caps" }}
    >
      {children}
    </h2>
  );
}
