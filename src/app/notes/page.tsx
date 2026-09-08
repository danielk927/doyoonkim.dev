import Heading from "@/components/Heading";
import { notes } from "@/content";

export const metadata = { title: "Notes — Doyoon (Daniel) Kim" };

export default function Notes() {
  return (
    <>
      <h1 className="text-[2.15rem] leading-[1.25]">Notes</h1>

      <div className="mt-11 space-y-11">
        {notes.map((note) => (
          <article key={note.title}>
            <Heading>{note.title}</Heading>
            {note.when && <p className="-mt-2 mb-3 text-muted">{note.when}</p>}
            <div className="space-y-3 text-ink">
              {note.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
