import { FaqAccordion } from "@/components/common/faq-accordion";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";

import { pricingFaqItems } from "../data/plans";
import { pricingFaqIntro } from "../data/pricing-page";

export function PricingFaq() {
  return (
    <section
      aria-labelledby="pricing-faq-title"
      className="mx-auto flex max-w-marketing flex-col gap-12 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="pricing-faq-title" intro={pricingFaqIntro} align="center" />
      </Reveal>
      <FaqAccordion items={pricingFaqItems} />
    </section>
  );
}
