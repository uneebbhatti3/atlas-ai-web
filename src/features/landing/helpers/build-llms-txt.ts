import { siteConfig } from "@/data/site";
import { env } from "@/lib/env";

import { faqItems } from "../data/faq";

/**
 * The site summary for language models, in the llmstxt.org format: an H1, a quoted summary,
 * then sections of links. Built from the same data as the landing page so the two never drift.
 */
export function buildLlmsTxt(): string {
  const siteUrl = new URL("/", env.NEXT_PUBLIC_APP_URL).toString();
  const { author } = siteConfig;

  const faq = faqItems.map((item) => `### ${item.question}\n\n${item.answer}`).join("\n\n");

  return `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.tagline} Built by ${author.name}.

## Links

- [Website](${siteUrl}): Landing page with features, roadmap and FAQ
- [Source code](${siteConfig.repositoryUrl}): The frontend repository
- [Decision records](${siteConfig.decisionRecordsUrl}): Architecture decisions and their reasoning

## FAQ

${faq}

## Optional

- [Author website](${author.url})
- [Author on LinkedIn](${author.linkedinUrl})
`;
}
