import Heading from "@/components/Heading";
import { notes } from "@/content";

export const metadata = { title: "Notes — Doyoon (Daniel) Kim" };

export default function Notes() {
  return (
    <div className="mx-auto w-full max-w-[42rem]">
      <h1 className="text-[1.7rem]">Notes</h1>

      <div className="mt-8 space-y-9">
        {notes.map((note) => (
          <article key={note.title}>
            <Heading>{note.title}</Heading>
            {note.when && <p className="-mt-2 mb-2 text-muted">{note.when}</p>}
            <div className="space-y-3 text-ink">
              {note.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
