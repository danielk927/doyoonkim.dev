/** Body paragraphs of an entry. Set as prose, not bullets: a book does not
    put a dot in front of every sentence. */
export default function Prose({ lines }: { lines?: string[] }) {
  if (!lines?.length) return null;
  return (
    <div className="space-y-2.5 text-[1.05rem] leading-[1.6] text-ink/90">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
