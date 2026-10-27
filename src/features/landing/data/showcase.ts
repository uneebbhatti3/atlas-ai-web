import {
  BrainCircuitIcon,
  FileTextIcon,
  FolderKanbanIcon,
  LayersIcon,
  SparklesIcon,
} from "lucide-react";

import type {
  ComparisonSide,
  HierarchyTile,
  MockNotification,
  MockScatteredItem,
  SectionIntro,
} from "../types";

export const tilesIntro: SectionIntro = {
  title: "One workspace, every source,",
  highlight: "always answerable.",
  description:
    "Everything in Atlas lives in one hierarchy, so every answer can trace back to the note it came from.",
};

export const hierarchyTiles: HierarchyTile[] = [
  {
    name: "Workspace",
    caption: "An area of your work",
    icon: LayersIcon,
    status: "in-progress",
    tone: "ink",
  },
  {
    name: "Project",
    caption: "A focused effort",
    icon: FolderKanbanIcon,
    status: "in-progress",
    tone: "brand",
  },
  {
    name: "Documents",
    caption: "Notes in Markdown",
    icon: FileTextIcon,
    status: "in-progress",
    tone: "ink",
  },
  {
    name: "Knowledge",
    caption: "Searchable passages",
    icon: BrainCircuitIcon,
    status: "coming-soon",
    tone: "brand",
  },
  {
    name: "AI",
    caption: "Answers with sources",
    icon: SparklesIcon,
    status: "coming-soon",
    tone: "ink",
  },
];

export const comparisonIntro: SectionIntro = {
  title: "Research before and",
  highlight: "after Atlas.",
  description: "The same notes. One version you dig through, one version that answers back.",
};

export const withoutAtlas: ComparisonSide = {
  label: "Without Atlas",
  caption: "Notes everywhere. Answers you can't check.",
};

export const withoutAtlasItems: MockScatteredItem[] = [
  { title: "47 open tabs", meta: "Kept open just in case" },
  { title: "notes-final-v3.docx", meta: "Edited 3 weeks ago" },
  { title: "Chatbot answer", meta: "Sounds right. No sources." },
];

export const withAtlas: ComparisonSide = {
  label: "With Atlas",
  caption: "One place for your notes. A source for every answer.",
};

export const withAtlasNotifications: MockNotification[] = [
  {
    title: "Organized",
    time: "9:12 AM",
    body: "12 notes filed into Distributed caching.",
  },
  {
    title: "Found by meaning",
    time: "9:40 AM",
    body: "3 passages match, even with different words.",
  },
  {
    title: "Answered",
    time: "9:41 AM",
    body: "Answer ready with 2 citations you can open.",
  },
];
