import type { LucideIcon } from "lucide-react";

export type { FaqItem, SectionIntro } from "@/types/marketing";

export interface CallToAction {
  label: string;
  href: string;
}

export interface HeroContent {
  /** One line per sentence so font loading cannot change the line count (no layout shift). */
  titleLine: string;
  /** Second line: plain words, then the phrase on the highlight block. */
  secondLine: string;
  highlight: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  demoLabel: string;
  mockCaption: string;
}

export interface HeroVideo {
  src: string;
  poster: string;
  /** Seconds. With `preload="none"` the browser only learns this after play is pressed. */
  duration: number;
  /** Accessible name for the player. */
  label: string;
  caption: string;
}

export type DemoId = "organize" | "search" | "ask" | "research";

export interface HeroDemo {
  id: DemoId;
  label: string;
  icon: LucideIcon;
  breadcrumb: string[];
  question: string;
  answer: string;
  citations: MockCitation[];
}

export interface HierarchyTile {
  name: string;
  caption: string;
  icon: LucideIcon;
  tone: "ink" | "brand";
}

export interface ComparisonSide {
  label: string;
  caption: string;
}

export type ExplorerId = "organize" | "process" | "search" | "ask" | "research";

export interface ExplorerTab {
  id: ExplorerId;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  checklist: string[];
}

export interface ChecklistPoint {
  title: string;
  detail: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

/* Illustrative mock data for concept visuals. Not live data and not an API contract. */

export interface MockCitation {
  index: number;
  document: string;
  passage: string;
}

export interface MockNotification {
  title: string;
  time: string;
  body: string;
}

export interface MockScatteredItem {
  title: string;
  meta: string;
}

export type MockChatMessage =
  | { from: "user"; text: string }
  | { from: "atlas"; text: string; citations?: number[] }
  | { from: "status"; text: string };
