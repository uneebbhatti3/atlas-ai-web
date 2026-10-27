import type { LucideIcon } from "lucide-react";

/** Shown without colour: solid, secondary fill, outline (Design.md §2). */
export type BuildStatus = "available" | "in-progress" | "coming-soon";

export interface CallToAction {
  label: string;
  href: string;
}

/** A section heading: plain words, then the phrase that sits on the highlight block. */
export interface SectionIntro {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
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
  note: string;
  demoLabel: string;
  mockCaption: string;
}

export type DemoId = "organize" | "search" | "ask" | "research";

export interface HeroDemo {
  id: DemoId;
  label: string;
  icon: LucideIcon;
  status: BuildStatus;
  breadcrumb: string[];
  question: string;
  answer: string;
  citations: MockCitation[];
}

export interface HierarchyTile {
  name: string;
  caption: string;
  icon: LucideIcon;
  status: BuildStatus;
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
  status: BuildStatus;
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

export interface RoadmapStage {
  stage: string;
  title: string;
  description: string;
  status: BuildStatus;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
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
