import type { RoadmapStage, SectionIntro } from "../types";

export const roadmapIntro: SectionIntro = {
  eyebrow: "Roadmap",
  title: "Built in",
  highlight: "public.",
  description:
    "One stage at a time. Each stage ships to production standards before the next one starts.",
};

// Stages as defined in docs/PRD.md §4; stage 5 groups everything after stage 4, as the PRD does.
export const roadmapStages: RoadmapStage[] = [
  {
    stage: "Stage 1",
    title: "Knowledge organization",
    description:
      "Accounts, workspaces, projects and Markdown documents, with protected routes and settings.",
    status: "in-progress",
  },
  {
    stage: "Stage 2",
    title: "Uploads and processing",
    description: "File uploads with progress, visible processing states and retry for failed jobs.",
    status: "coming-soon",
  },
  {
    stage: "Stage 3",
    title: "Search",
    description: "Full-text and semantic search, with every result attributed to its source.",
    status: "coming-soon",
  },
  {
    stage: "Stage 4",
    title: "AI conversations",
    description: "Streamed answers with citations, grounded in your own documents.",
    status: "coming-soon",
  },
  {
    stage: "Stage 5",
    title: "Research, agents and beyond",
    description:
      "Research reports, agents, collaboration, notifications, usage dashboards and a mobile app.",
    status: "coming-soon",
  },
];
