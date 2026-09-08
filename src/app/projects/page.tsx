import Heading from "@/components/Heading";
import Prose from "@/components/Prose";
import { projects } from "@/content";

export const metadata = { title: "Projects — Doyoon (Daniel) Kim" };

export default function Projects() {
  return (
    <>
      <h1 className="text-[2.15rem] leading-[1.25]">Projects</h1>

      <div className="mt-11 space-y-11">
        {projects.entries.map((entry) => {
          const [name, subtitle] = entry.title.split(" — ");
          return (
            <article key={entry.title}>
              <Heading>{name}</Heading>
              {subtitle && <p className="-mt-2 mb-3 italic text-muted">{subtitle}</p>}
              {entry.when && <p className="mb-3 text-muted">{entry.when}</p>}
              <Prose lines={entry.bullets} />
            </article>
          );
        })}
      </div>
    </>
  );
}
