import type { Section } from "./types";

export const notes: Section = {
  key: "notes",
  sign: "NOTES",
  title: "Misc. Notes",
  entries: [
    {
      title: "Math Directed Reading Program",
      when: "January 2026 – Present",
      bullets: [
        "Authored 2 research papers on bilevel optimisation with SGD and functional scaling laws in feature learning, under the mentorship of William Chang (UCLA Applied Math PhD student); pending at AAAI and AISTATS.",
      ],
    },
    {
      title: "Skills",
      bullets: [
        "Languages — C++, Python, JavaScript, TypeScript, HTML/CSS, R, SQL",
        "Libraries & frameworks — PyTorch, NumPy, Pandas, Matplotlib, SciPy, MediaPipe, React, FastAPI, Node.js, Three.js",
        "Tools — Git, Docker, PostgreSQL, GitHub",
      ],
    },
    {
      title: "Interests",
      bullets: [
        "Mahjong, Beli, Kendo, Golf, Cooking and Baking, Running, Watching the NBA, Fashion",
      ],
    },
  ],
};
