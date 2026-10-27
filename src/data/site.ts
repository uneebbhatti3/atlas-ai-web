import type { FooterColumn, NavLink, SiteConfig } from "@/types/site";

const repositoryUrl = "https://github.com/uneebbhatti3/atlas-ai-web";

export const siteConfig: SiteConfig = {
  name: "Atlas AI",
  title: "Atlas AI: Your documents, organized and answerable",
  description:
    "Atlas AI organizes your documents into a knowledge base you can search by meaning and question with cited answers. An engineering lab, built in public.",
  tagline: "An AI knowledge and research workspace, built in public.",
  keywords: [
    "Atlas AI",
    "knowledge workspace",
    "research workspace",
    "semantic search",
    "cited answers",
    "RAG",
    "engineering lab",
  ],
  repositoryUrl,
  // ADRs live in sessions/adr/ in the repository.
  decisionRecordsUrl: `${repositoryUrl}/tree/main/sessions/adr`,
  author: {
    name: "Uneeb Bhatti",
    url: "https://uneebbhatti.vercel.app/",
    githubUrl: "https://github.com/uneebbhatti3",
    linkedinUrl: "https://www.linkedin.com/in/uneeb-bhatti/",
  },
};

export const marketingNavLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Roadmap", href: "#roadmap" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub repository", href: siteConfig.repositoryUrl, external: true },
      { label: "Decision records", href: siteConfig.decisionRecordsUrl, external: true },
    ],
  },
  {
    title: "Author",
    links: [
      { label: "Website", href: siteConfig.author.url, external: true },
      { label: "LinkedIn", href: siteConfig.author.linkedinUrl, external: true },
    ],
  },
];
