import { about } from "./about";
import { education } from "./education";
import { experience } from "./experience";
import { notes } from "./notes";
import { projects } from "./projects";
import type { Section } from "./types";

/** Order used by /plain and by the panel deep-links. */
export const SECTIONS: Section[] = [about, experience, education, projects, notes];

export const SECTION_BY_KEY: Record<string, Section> = Object.fromEntries(
  SECTIONS.map((s) => [s.key, s]),
);

export { about, education, experience, notes, projects };
export { LINKS } from "./about";
export type { Section, Entry } from "./types";
