import type { FaqItem } from "@/types/marketing";

import type { BillingOption, FeatureGroup, Plan, PlanFeature } from "../types";

// The single source of truth for plans, prices and limits. The frontend only displays these;
// the backend enforces them. Keep this file in step with docs/PRD.md.

export const currency = "USD";

export const billingOptions: BillingOption[] = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "For trying Atlas on your own notes.",
    prices: {
      monthly: { monthlyAmount: 0, note: "No time limit" },
      yearly: { monthlyAmount: 0, note: "No time limit" },
    },
    recommended: false,
    cta: { label: "Get started free", disabled: false },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For people who use Atlas in their daily work.",
    prices: {
      monthly: { monthlyAmount: 10, note: "Billed monthly" },
      yearly: { monthlyAmount: 8, note: "Billed yearly at $96" },
    },
    recommended: true,
    cta: { label: "Start free, upgrade later", disabled: false },
  },
];

export const featureGroups: FeatureGroup[] = [
  { id: "organize", name: "Organize" },
  { id: "knowledge", name: "Knowledge and AI" },
  { id: "limits", name: "Limits" },
  { id: "advanced", name: "Advanced" },
];

const hints = {
  pagesProcessed:
    "Pages Atlas reads and indexes each month; resets monthly. Short notes count as a fraction of a page.",
  ownApiKey:
    "Connect your own AI provider key. Questions and reports then use your key and are not limited by plan quotas. Storage, file size and page limits still apply. Indexing always uses Atlas's own model so search stays consistent.",
  priorityQueue:
    "Pro documents start processing ahead of the standard queue when the system is busy.",
  fairUse: "Generous limits that protect the service from abuse, not normal use.",
};

export const planFeatures: PlanFeature[] = [
  {
    id: "workspaces",
    name: "Workspaces",
    group: "organize",
    keyFeature: true,
    values: { free: { kind: "limit", label: "1" }, pro: { kind: "limit", label: "3" } },
  },
  {
    id: "projects",
    name: "Projects",
    group: "organize",
    values: {
      free: { kind: "limit", label: "Unlimited" },
      pro: { kind: "limit", label: "Unlimited" },
    },
  },
  {
    id: "documents",
    name: "Documents",
    group: "organize",
    values: {
      free: { kind: "limit", label: "Unlimited" },
      pro: { kind: "limit", label: "Unlimited" },
    },
  },
  {
    id: "export",
    name: "Export your data",
    group: "organize",
    values: { free: { kind: "included" }, pro: { kind: "included" } },
  },
  {
    id: "search",
    name: "Semantic and keyword search",
    group: "knowledge",
    values: {
      free: { kind: "included", note: "rate-limited" },
      pro: { kind: "included" },
    },
  },
  {
    id: "citations",
    name: "Citations on every answer",
    group: "knowledge",
    keyFeature: true,
    values: { free: { kind: "included" }, pro: { kind: "included" } },
  },
  {
    id: "ai-model",
    name: "AI model",
    group: "knowledge",
    keyFeature: true,
    values: {
      free: { kind: "limit", label: "Standard" },
      pro: { kind: "limit", label: "Advanced" },
    },
  },
  {
    id: "history",
    name: "Conversation history",
    group: "knowledge",
    values: {
      free: { kind: "limit", label: "30 days" },
      pro: { kind: "limit", label: "Unlimited" },
    },
  },
  {
    id: "storage",
    name: "Storage",
    group: "limits",
    keyFeature: true,
    values: { free: { kind: "limit", label: "1 GB" }, pro: { kind: "limit", label: "50 GB" } },
  },
  {
    id: "file-size",
    name: "Max file size",
    group: "limits",
    values: { free: { kind: "limit", label: "40 MB" }, pro: { kind: "limit", label: "1 GB" } },
  },
  {
    id: "pages",
    name: "Pages processed per month",
    group: "limits",
    keyFeature: true,
    hint: hints.pagesProcessed,
    values: { free: { kind: "limit", label: "1,000" }, pro: { kind: "limit", label: "25,000" } },
  },
  {
    id: "questions",
    name: "AI questions (Ask Atlas)",
    group: "limits",
    keyFeature: true,
    hint: hints.fairUse,
    values: {
      free: { kind: "limit", label: "50 / month" },
      pro: { kind: "limit", label: "1,000 / month (fair use)" },
    },
  },
  {
    id: "reports",
    name: "Research reports",
    group: "limits",
    keyFeature: true,
    values: {
      free: { kind: "limit", label: "2 / month" },
      pro: { kind: "limit", label: "30 / month" },
    },
  },
  {
    id: "own-key",
    name: "Use your own API key",
    group: "advanced",
    hint: hints.ownApiKey,
    values: {
      free: { kind: "limit", label: "Chat and reports" },
      pro: { kind: "limit", label: "Chat, reports and model choice" },
    },
  },
  {
    id: "processing",
    name: "Document processing",
    group: "advanced",
    hint: hints.priorityQueue,
    values: {
      free: { kind: "limit", label: "Standard queue" },
      pro: { kind: "limit", label: "Priority queue" },
    },
  },
  {
    id: "agents",
    name: "AI agents",
    group: "advanced",
    values: { free: { kind: "excluded" }, pro: { kind: "comingLater" } },
  },
  {
    id: "integrations",
    name: "Integrations",
    group: "advanced",
    values: { free: { kind: "excluded" }, pro: { kind: "comingLater" } },
  },
];

export const teamPlanNote = "Team plan with shared workspaces is coming later.";

export const pricingFaqItems: FaqItem[] = [
  {
    id: "really-free",
    question: "Is the Free plan really free?",
    answer: "Yes. The Free plan costs nothing and has no time limit.",
  },
  {
    id: "page-processed",
    question: "What counts as a “page processed”?",
    answer: hints.pagesProcessed,
  },
  {
    id: "own-key",
    question: "Can I use my own API key, and what does it change?",
    answer: `Yes. ${hints.ownApiKey}`,
  },
  {
    id: "limit-reached",
    question: "What happens if I reach a limit?",
    answer:
      "Atlas tells you which limit you reached. Your documents stay available, monthly limits reset each month, and you can upgrade or use your own API key for questions and reports.",
  },
  {
    id: "downgrade",
    question: "What happens to my data if I downgrade?",
    answer: "Extra workspaces become read-only. Nothing is deleted.",
  },
  {
    id: "priority-queue",
    question: "What is the priority queue?",
    answer: hints.priorityQueue,
  },
  {
    id: "availability",
    question: "When will paid plans be available?",
    answer: "Paid plans are not live yet, and there is no date to share.",
  },
  {
    id: "export",
    question: "Can I export my data?",
    answer: "Yes, on every plan.",
  },
];
