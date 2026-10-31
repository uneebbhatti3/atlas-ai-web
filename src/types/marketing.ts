/** A section heading: plain words, then the phrase that sits on the highlight block. */
export interface SectionIntro {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
