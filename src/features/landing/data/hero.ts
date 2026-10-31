import { FolderTreeIcon, MessageSquareQuoteIcon, NotebookPenIcon, SearchIcon } from "lucide-react";

import { siteConfig } from "@/data/site";

import type {
  CallToAction,
  HeroContent,
  HeroDemo,
  HeroVideo,
  MockNotification,
  SectionIntro,
} from "../types";

export const heroContent: HeroContent = {
  titleLine: "Ask your own research.",
  secondLine: "Get answers",
  highlight: "with sources.",
  description:
    "Atlas turns your workspaces, projects and documents into a knowledge base you can search by meaning and question with cited answers.",
  primaryCta: { label: "Star on GitHub", href: siteConfig.repositoryUrl },
  secondaryCta: { label: "See how it works", href: "#how-it-works" },
  demoLabel: "Try a question:",
  mockCaption: "Example conversations.",
};

export const heroVideo: HeroVideo = {
  src: "/atlas-ai-promo.mp4",
  poster: "/atlas-ai-promo-poster.webp",
  duration: 72,
  label: "Atlas AI product walkthrough",
  caption: "Product walkthrough.",
};

// The hero demo: one conversation per capability, switched by the chips above the window.
export const heroDemos: HeroDemo[] = [
  {
    id: "ask",
    label: "Ask",
    icon: MessageSquareQuoteIcon,
    breadcrumb: ["Systems research", "Ask Atlas"],
    question: "When should I prefer write-through over TTL expiry?",
    answer:
      "Prefer write-through when stale reads are unacceptable: it keeps the cache consistent on every write. TTL expiry is simpler when a short window of staleness is fine.",
    citations: [
      {
        index: 1,
        document: "cache-invalidation.md",
        passage: "Write-through keeps the cache consistent at the cost of slower writes.",
      },
      {
        index: 2,
        document: "write-strategies.md",
        passage: "TTL expiry trades a window of staleness for simplicity.",
      },
    ],
  },
  {
    id: "search",
    label: "Search",
    icon: SearchIcon,
    breadcrumb: ["Systems research", "Search"],
    question: "Find where I wrote about keeping a cache consistent.",
    answer:
      "Three passages match by meaning, across two projects. The closest one is in your caching notes.",
    citations: [
      {
        index: 1,
        document: "cache-invalidation.md",
        passage: "Write-through keeps the cache consistent at the cost of slower writes.",
      },
      {
        index: 2,
        document: "outbox-pattern.md",
        passage: "The outbox table updates the database and publishes an event atomically.",
      },
    ],
  },
  {
    id: "organize",
    label: "Organize",
    icon: FolderTreeIcon,
    breadcrumb: ["Systems research", "Distributed caching"],
    question: "Where did I put my caching notes?",
    answer:
      "In Systems research, inside the Distributed caching project. It holds three Markdown documents.",
    citations: [
      { index: 1, document: "cache-invalidation.md", passage: "Edited today" },
      { index: 2, document: "redis-vs-memcached.md", passage: "Edited yesterday" },
    ],
  },
  {
    id: "research",
    label: "Research",
    icon: NotebookPenIcon,
    breadcrumb: ["Systems research", "Reports"],
    question: "Draft a short report on caching strategies.",
    answer:
      "Your draft is ready: three sections, built only from the sources you picked. Every section cites them.",
    citations: [
      {
        index: 1,
        document: "cache-invalidation.md",
        passage: "Used in Summary and Consistency trade-offs.",
      },
      { index: 2, document: "write-strategies.md", passage: "Used in Recommendation." },
    ],
  },
];

// Floating cards around the hero window (desktop only).
export const heroIndexLog: string[] = [
  "indexing Distributed caching",
  "cache-invalidation.md   ✓",
  "redis-vs-memcached.md   ✓",
  "write-strategies.md     ✓",
  "41 passages ready to search",
];

export const heroNotifications: MockNotification[] = [
  { title: "Access checked", time: "just now", body: "Only your own workspace was searched." },
  { title: "2 sources cited", time: "just now", body: "Every claim links back to a passage." },
];

export const finalCta: SectionIntro & { primary: CallToAction; secondary: CallToAction } = {
  title: "You bring the documents.",
  highlight: "Atlas brings the answers.",
  description:
    "Turn your documents into answers you can check. Star the repository to follow the project, or connect for updates.",
  primary: { label: "Star on GitHub", href: siteConfig.repositoryUrl },
  secondary: { label: "Connect on LinkedIn", href: siteConfig.author.linkedinUrl },
};
