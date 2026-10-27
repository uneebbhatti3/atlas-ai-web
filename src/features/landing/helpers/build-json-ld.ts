import type { Graph } from "schema-dts";

import { siteConfig } from "@/data/site";
import { env } from "@/lib/env";

/**
 * Structured data for the landing page as one @graph. Nodes reference each other by @id so the
 * Person is described once. No review or rating markup: there is nothing honest to put there.
 */
export function buildLandingJsonLd(): Graph {
  const siteUrl = new URL("/", env.NEXT_PUBLIC_APP_URL).toString();
  const personId = `${siteUrl}#person`;
  const { author } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: siteConfig.name,
        url: siteUrl,
        description: siteConfig.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}#app`,
        name: siteConfig.name,
        url: siteUrl,
        description: siteConfig.description,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        author: { "@id": personId },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${siteUrl}#source`,
        name: `${siteConfig.name} web`,
        codeRepository: siteConfig.repositoryUrl,
        programmingLanguage: "TypeScript",
        author: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: author.name,
        url: author.url,
        sameAs: [author.githubUrl, author.linkedinUrl],
      },
    ],
  };
}
