import type { Section } from "./types";

export const experience: Section = {
  key: "experience",
  sign: "WORK",
  title: "Experience",
  entries: [
    {
      title: "Undergraduate Research Assistant",
      meta: "University of California, Los Angeles — Los Angeles, CA",
      when: "January 2026 – Present",
      bullets: [
        "Engineered thermal performance curve models using rTPC (R) and Python (Pandas + SciPy), visualising results with Matplotlib to find the thermal optimum zone in Drosophila; paper pending at Science Advances.",
        "Created a data preprocessing pipeline in Pandas and NumPy to clean and normalise heterogeneous sleep data.",
      ],
    },
    {
      title: "Engineering Intern",
      meta: "Anto Biosciences (YC F25) — San Francisco, CA",
      when: "October 2025 – April 2026",
      bullets: [
        "Developed a Python ETL pipeline on the MIT SuperCloud cluster for LLM-as-a-judge evaluation: regex parsing, structured JSON extraction, rating normalisation and validation heuristics across 1,200+ papers.",
        "Engineered system prompts with structured evaluation rubrics, raising prediction accuracy from 46% to 73%.",
        "Authored 7 data visualisations and scientific figures for preprints on tokenization methods in machine learning and deep reinforcement learning for data sparsification; papers pending at NeurIPS and Nature.",
      ],
    },
    {
      title: "Research Assistant",
      meta: "University of Hong Kong — Hong Kong",
      when: "July 2024 – August 2024",
      bullets: [
        "Developed Python scripts and SQL databases for data storage, querying and multi-trial performance analysis.",
        "Optimised clay nanosheet-reinforced hydrogels, boosting mechanical strength by 121% and biodegradation by 2.8x.",
      ],
    },
  ],
};
