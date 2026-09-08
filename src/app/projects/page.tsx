import Heading from "@/components/Heading";
import Prose from "@/components/Prose";
import { projects } from "@/content";

export const metadata = { title: "Projects — Doyoon (Daniel) Kim" };

export default function Projects() {
  return (
    <div className="mx-auto w-full max-w-[42rem]">
      <h1 className="text-[1.7rem]">Projects</h1>

      <div className="mt-8 space-y-9">
        {projects.entries.map((entry) => {
          const [name, subtitle] = entry.title.split(" — ");
          return (
            <article key={entry.title}>
              <Heading>{name}</Heading>
              {subtitle && <p className="-mt-2 mb-2 italic text-muted">{subtitle}</p>}
              {entry.when && <p className="mb-2 text-muted">{entry.when}</p>}
              <Prose lines={entry.bullets} />
            </article>
          );
        })}
      </div>
    </div>
  );
}
