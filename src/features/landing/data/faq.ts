import type { FaqItem, SectionIntro } from "../types";

export const faqIntro: SectionIntro = {
  title: "Questions,",
  highlight: "answered.",
  description: "Straight answers about what Atlas is and how it works.",
};

export const faqItems: FaqItem[] = [
  {
    id: "what",
    question: "What is Atlas AI?",
    answer:
      "Atlas AI is a knowledge and research workspace. You organize documents into workspaces and projects, and Atlas turns them into a knowledge base you can search by meaning and question with cited answers.",
  },
  {
    id: "pricing",
    question: "Will Atlas have paid plans?",
    answer:
      "Yes. Atlas has a Free plan and a paid Pro plan. Paid plans are not live yet; the pricing section has the details.",
  },
  {
    id: "private",
    question: "Is my data private?",
    answer:
      "You only see, search and query documents you are authorized to access, and the server checks that on every request. AI answers are built only from documents you can access.",
  },
  {
    id: "file-types",
    question: "Which file types are supported?",
    answer: "Atlas works with plain text and Markdown documents.",
  },
  {
    id: "citations",
    question: "How do citations work?",
    answer:
      "Atlas first finds the passages in your documents that best match your question, then writes the answer from them. Each claim carries a numbered citation that points to the document and passage it came from.",
  },
  {
    id: "lab",
    question: "What does “engineering lab” mean?",
    answer:
      "Atlas is a personal project for learning production engineering in depth. The NestJS backend is written by hand, AI helps with the interface, and every significant decision is recorded as an Architecture Decision Record.",
  },
  {
    id: "follow",
    question: "How can I follow Atlas?",
    answer:
      "Star the GitHub repository, read the decision records in the repository, or connect on LinkedIn for updates.",
  },
];
