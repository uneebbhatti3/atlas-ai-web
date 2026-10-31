import { FaqAccordion } from "@/components/common/faq-accordion";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";

import { faqIntro, faqItems } from "../data/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="mx-auto flex max-w-marketing flex-col gap-12 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="faq-title" intro={faqIntro} align="center" />
      </Reveal>
      <FaqAccordion items={faqItems} />
    </section>
  );
}
