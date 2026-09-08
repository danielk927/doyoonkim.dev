import type { Section } from "./types";

export const about: Section = {
  key: "about",
  title: "Doyoon (Daniel) Kim",
  blurb:
    "CS and Statistics at the University of Chicago. I build things at the seam between machine learning and biology — synthetic training data for microscopy segmentation, computer-vision rehab tools, evaluation pipelines for LLM judges. Previously computational biology at UCLA.",
  entries: [
    {
      title: "Contact",
      bullets: [
        "Email — dkim927@uchicago.edu",
        "LinkedIn — linkedin.com/in/doyoondanielkim",
        "GitHub — github.com/danielk927",
      ],
    },
  ],
};

export const LINKS = [
  { label: "GitHub", href: "https://github.com/danielk927" },
  { label: "LinkedIn", href: "https://linkedin.com/in/doyoondanielkim" },
  { label: "Email", href: "mailto:dkim927@uchicago.edu" },
];
