import Disclosure from "@/components/Disclosure";
import Heading from "@/components/Heading";
import Prose from "@/components/Prose";
import { LINKS, education, experience } from "@/content";

export default function Main() {
  return (
    <>
      <h1 className="text-[2.15rem] leading-[1.25]">Doyoon (Daniel) Kim</h1>

      <div className="mt-5 space-y-1 text-ink/90">
        <p>University of Chicago</p>
        <p className="text-ink-soft">
          B.S. Computer Science and B.S. Statistics, expected 2029
        </p>
        <p className="text-ink-soft">
          Previously computational biology at UCLA
        </p>
      </div>

      <section className="mt-12">
        <Heading>Experience</Heading>
        <div>
          {experience.entries.map((entry) => (
            <Disclosure
              key={entry.title}
              title={entry.title}
              meta={entry.meta}
              when={entry.when}
            >
              <Prose lines={entry.bullets} />
            </Disclosure>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Heading>Education</Heading>
        <div className="space-y-4">
          {education.entries.map((entry) => (
            <div key={entry.title}>
              <p>{entry.title}</p>
              <p className="italic text-ink-soft">{entry.meta}</p>
              <p className="text-ink-soft">{entry.when}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Heading>Elsewhere</Heading>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-rubric underline decoration-rubric/30 underline-offset-[5px] transition-colors duration-150 hover:decoration-rubric"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
