import { LINKS } from "@/content";

const INTERESTS = [
  "inference engineering",
  "machine learning",
  "cooking",
  "basketball",
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-16 text-center">
      <h1 className="text-[2.4rem] leading-tight">Doyoon (Daniel) Kim</h1>
      <p className="mt-2 text-[1.05rem] text-muted">UChicago CS</p>

      <p className="mt-7 flex justify-center gap-x-7">
        {LINKS.filter((link) => link.label !== "Email").map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="underline underline-offset-[5px] transition-colors duration-150 hover:text-muted"
          >
            {link.label}
          </a>
        ))}
      </p>

      <ul className="mt-10 space-y-1 text-[1.02rem] text-muted">
        {INTERESTS.map((interest) => (
          <li key={interest}>{interest}</li>
        ))}
      </ul>
    </div>
  );
}
