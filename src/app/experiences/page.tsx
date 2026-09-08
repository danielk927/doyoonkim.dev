import Disclosure from "@/components/Disclosure";
import Prose from "@/components/Prose";
import { experience } from "@/content";

export const metadata = { title: "Experiences — Doyoon (Daniel) Kim" };

export default function Experiences() {
  return (
    <>
      <h1 className="text-[1.7rem]">Experiences</h1>
      <div className="mt-8">
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
    </>
  );
}
