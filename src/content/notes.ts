export interface Note {
  title: string;
  when?: string;
  body: string[];
}

/** Short pieces on whatever is currently interesting. Newest first. */
export const notes: Note[] = [
  {
    title: "Directed reading in optimisation",
    when: "January 2026 — ",
    body: [
      "Two papers with William Chang, a PhD student in applied maths at UCLA: one on bilevel optimisation with stochastic gradient descent, one on functional scaling laws in feature learning. Both are under review, at AAAI and AISTATS respectively.",
      "The through-line is the same question in two settings — what does the outer problem actually see when the inner one is solved approximately?",
    ],
  },
  {
    title: "What I work in",
    body: [
      "Languages: C++, Python, JavaScript, TypeScript, HTML and CSS, R, SQL.",
      "Libraries: PyTorch, NumPy, Pandas, Matplotlib, SciPy, MediaPipe, React, FastAPI, Node, Three.js.",
      "Tools: Git, Docker, PostgreSQL.",
    ],
  },
  {
    title: "Away from a screen",
    body: [
      "Mahjong, kendo, golf, running. Cooking and baking. Watching the NBA. Clothes.",
    ],
  },
];
