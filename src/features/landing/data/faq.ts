import type { FaqItem, SectionIntro } from "../types";

export const faqIntro: SectionIntro = {
  title: "Questions,",
  highlight: "answered.",
  description: "Straight answers about what Atlas is, what works today and what comes next.",
};

export const faqItems: FaqItem[] = [
  {
    id: "what",
    question: "What is Atlas AI?",
    answer:
      "Atlas AI is a knowledge and research workspace. You organize documents into workspaces and projects, and Atlas turns them into a knowledge base you can search by meaning and question with cited answers.",
  },
  {
    id: "free",
    question: "Is it free?",
    answer:
      "Atlas has no paid plan. A public demo is planned; it will have usage limits so it stays affordable to run, and those limits are still being decided.",
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
    answer:
      "Today Atlas works with plain text and Markdown documents. File uploads with processing arrive in stage 2, and the supported formats will be listed when it ships.",
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
    id: "sign-ups",
    question: "When do sign-ups open?",
    answer:
      "Accounts are part of stage 1, which is in progress. There is no date yet; star the repository or connect on LinkedIn to hear when sign-ups open.",
  },
  {
    id: "follow",
    question: "How can I follow progress?",
    answer:
      "Star the GitHub repository to see every change, read the decision records in the repository, or connect on LinkedIn for updates.",
  },
];
