import { Highlight } from "@/components/common/highlight";

import { teamPlanNote } from "../data/plans";
import { pricingIntro } from "../data/pricing-page";
import { BillingTabs } from "./billing-tabs";

/** The top of `/pricing`: the page's h1 and the plan cards. Above the fold, so no `Reveal`. */
export function PricingPageHeader() {
  return (
    <section
      aria-labelledby="pricing-page-title"
      className="mx-auto flex max-w-marketing-wide flex-col gap-12 px-4 pt-16 pb-12 sm:px-6 md:pt-24"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <h1
          id="pricing-page-title"
          className="isolate font-heading text-h1-sm text-balance md:text-display"
        >
          {pricingIntro.title} <Highlight>{pricingIntro.highlight}</Highlight>
        </h1>
        <p className="max-w-xl text-body-lg text-pretty text-muted-foreground">
          {pricingIntro.description}
        </p>
      </div>
      <BillingTabs />
      <p className="text-center text-sm text-muted-foreground">{teamPlanNote}</p>
    </section>
  );
}
