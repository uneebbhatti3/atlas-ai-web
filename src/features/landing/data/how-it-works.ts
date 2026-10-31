import type {
  ChecklistPoint,
  HowItWorksStep,
  MockChatMessage,
  MockNotification,
  SectionIntro,
} from "../types";

export const privacyIntro: SectionIntro = {
  title: "Your documents,",
  highlight: "kept private.",
  description:
    "Access is checked on the server for every request. Atlas only searches and answers from documents you are allowed to see.",
};

export const privacyPoints: ChecklistPoint[] = [
  {
    title: "You only see your own workspaces",
    detail: "Checked on the server, on every request",
  },
  {
    title: "AI only reads what you can access",
    detail: "Search and answers use your documents, nobody else's",
  },
  {
    title: "Sessions you can see and revoke",
    detail: "Sign out any device from your settings",
  },
  {
    title: "Delete your account, delete your data",
    detail: "No hidden copies kept for later",
  },
];

export const privacyNotification: MockNotification = {
  title: "Access denied",
  time: "8:04 AM",
  body: "A request for another person's workspace was blocked.",
};

export const howItWorksIntro: SectionIntro = {
  title: "You ask. Atlas finds",
  highlight: "the source.",
  description: "Four steps from a blank workspace to answers you can trust.",
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    title: "Create a workspace",
    description: "Start one for a course, a codebase or a topic you are researching.",
  },
  {
    title: "Add documents",
    description: "Write your notes in Markdown, right inside a project.",
  },
  {
    title: "Atlas indexes them",
    description: "Documents are split into passages and indexed, so they can be found by meaning.",
  },
  {
    title: "Ask, search and research",
    description: "Get answers and reports that cite the exact passages they came from.",
  },
];

export const howItWorksChat: MockChatMessage[] = [
  { from: "user", text: "Why did we pick write-through for sessions?" },
  { from: "status", text: "Searching Systems research · 41 passages" },
  {
    from: "atlas",
    text: "Because a stale session would log people out at random. Your notes chose consistency over write speed.",
    citations: [1, 2],
  },
  { from: "user", text: "Show me source 1." },
  {
    from: "atlas",
    text: "“Write-through keeps the cache consistent at the cost of slower writes.” From cache-invalidation.md.",
  },
];
