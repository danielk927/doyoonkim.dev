import type { Section } from "./types";

export const projects: Section = {
  key: "projects",
  sign: "PROJECTS",
  title: "Projects",
  entries: [
    {
      title: "Generative Omics — Synthetic Data Engine for Biomedical Segmentation",
      when: "August 2026 – Present",
      bullets: [
        "Built an ML-training-data engine that procedurally generates synthetic bacterial microscopy images with pixel-perfect segmentation ground truth, cutting manual annotation by 70% and validated at 0.9987 mean IoU.",
        "Engineered a physics-based rendering pipeline integrating SyMBac with automated Bayesian hyperparameter optimisation (Optuna) across 30 trials to calibrate synthetic images against real fluorescence data.",
        "Designed an LLM research API client (Anthropic SDK) with structured validation and type-enforced provenance.",
      ],
    },
    {
      title: "Sync — AI Neurorehabilitation Platform",
      when: "May 2026 – August 2026",
      bullets: [
        "Built 10+ gesture-controlled rehab games using Three.js and MediaPipe for real-time pose tracking, backed by PostgreSQL with row-level security for per-patient data isolation, deployed via Vercel and Cloudflare.",
        "Deployed to 3 NGO pilots in Hong Kong with 1,400+ waitlist signups; received investment offers from 2 angels.",
      ],
    },
    {
      title: "Bridge — Real-Time Image & Audio to Braille Transcriber",
      when: "April 2026",
      bullets: [
        "Best Hardware Award — 1st place out of 300+ teams at LAHacks 2026.",
        "Engineered a pipeline using Faster-Whisper, the Claude API and a custom 3D-printed Braille encoder on ESP32.",
      ],
    },
  ],
};
