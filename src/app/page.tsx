import PopupLink from "@/components/PopupLink";
import { LINKS } from "@/content";

export default function Home() {
  return (
    /* Pinned to the viewport, not to `main`, so the name sits on the exact
       centre line regardless of how tall the nav above it is. The wrapper
       ignores pointer events so the nav stays clickable through it. */
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center px-6">
      <div className="pointer-events-auto relative text-center">
        <h1 className="whitespace-nowrap text-[clamp(1.75rem,6.2vw,5rem)] leading-[1.1]">
          Doyoon (Daniel) Kim
        </h1>

        <p className="absolute inset-x-0 top-full mt-5 flex justify-center gap-x-5 text-[1.05rem]">
          {LINKS.filter((link) => link.label !== "Email").map((link) => (
            <PopupLink key={link.label} href={link.href} className="underline">
              {link.label}
            </PopupLink>
          ))}
        </p>
      </div>
    </div>
  );
}
