import { LINKS } from "@/content";

const INTERESTS = [
  "inference engineering",
  "machine learning",
  "cooking",
  "basketball",
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-20 text-center">
      <h1 className="text-[clamp(2.6rem,7.5vw,4.6rem)] leading-[1.1]">
        Doyoon (Daniel) Kim
      </h1>

      <p className="mt-1 flex justify-center gap-x-4 text-[1.05rem]">
        {LINKS.filter((link) => link.label !== "Email").map((link) => (
          <a key={link.label} href={link.href} className="underline">
            {link.label}
          </a>
        ))}
      </p>

      <p className="mt-6 text-[1.05rem] text-muted">UChicago CS</p>

      <ul className="mt-6 space-y-0.5 text-[1.05rem] text-muted">
        {INTERESTS.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
    </div>
  );
}
