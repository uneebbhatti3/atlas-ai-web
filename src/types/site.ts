export interface SiteAuthor {
  name: string;
  url: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  /** One line under the wordmark in the footer. */
  tagline: string;
  keywords: string[];
  repositoryUrl: string;
  decisionRecordsUrl: string;
  author: SiteAuthor;
}

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface FooterLink {
  label: string;
  href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"`. */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
