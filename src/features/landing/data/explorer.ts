import {
  FileCogIcon,
  FolderTreeIcon,
  MessageSquareQuoteIcon,
  NotebookPenIcon,
  SearchIcon,
} from "lucide-react";

import type { ExplorerTab, SectionIntro } from "../types";

export const explorerIntro: SectionIntro = {
  title: "Everything inside,",
  highlight: "one workspace.",
  description: "Pick a part of Atlas to see what it does.",
};

export const explorerTabs: ExplorerTab[] = [
  {
    id: "organize",
    label: "Organize",
    icon: FolderTreeIcon,
    title: "Every note in its place",
    description:
      "A workspace for each area of your work, projects inside it and Markdown documents inside those.",
    checklist: [
      "Workspaces for each area of your work",
      "Projects inside every workspace",
      "Markdown documents with a clean editor",
      "Rename, archive or delete in a few clicks",
      "Light and dark themes",
      "Works on phone, tablet and desktop",
    ],
  },
  {
    id: "process",
    label: "Process",
    icon: FileCogIcon,
    title: "Files in, knowledge out",
    description:
      "Upload a file and follow it from pending to ready, so the work behind the scenes stays visible.",
    checklist: [
      "Uploads with a progress bar",
      "Clear status: pending, processing, ready, failed",
      "Retry a failed file in one click",
      "Documents split into searchable passages",
    ],
  },
  {
    id: "search",
    label: "Search",
    icon: SearchIcon,
    title: "Find it by meaning",
    description: "Describe what you remember in your own words and get the passage that matches.",
    checklist: [
      "Full-text search across a workspace",
      "Semantic search by meaning",
      "Every result shows its document and passage",
      "Scoped to what you can access",
    ],
  },
  {
    id: "ask",
    label: "Ask",
    icon: MessageSquareQuoteIcon,
    title: "Answers you can check",
    description: "Ask in plain language and get an answer built only from your own documents.",
    checklist: [
      "Answers grounded in your documents",
      "A numbered citation on every claim",
      "Open the exact passage behind a claim",
      "Streamed answers, follow-ups keep context",
    ],
  },
  {
    id: "research",
    label: "Research",
    icon: NotebookPenIcon,
    title: "From sources to a report",
    description: "Choose the sources and a question, and get a structured draft to edit.",
    checklist: [
      "Pick the sources a report may use",
      "Structured sections with citations",
      "Edit everything before you share it",
    ],
  },
];
