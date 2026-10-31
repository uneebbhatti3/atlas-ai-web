import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";

import { teamPlanNote } from "../data/plans";
import { pricingIntro } from "../data/pricing-page";
import { BillingTabs } from "./billing-tabs";

/** The landing page's pricing section. The full comparison lives on `/pricing`. */
export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="mx-auto flex max-w-marketing-wide scroll-mt-16 flex-col gap-12 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="pricing-title" intro={pricingIntro} align="center" />
      </Reveal>
      <Reveal>
        <BillingTabs />
      </Reveal>
      <div className="flex flex-col items-center gap-2 text-center">
        <Link
          href="/pricing"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-base font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Compare all features
          <ArrowRightIcon aria-hidden className="size-4" strokeWidth={2} />
        </Link>
        <p className="text-sm text-muted-foreground">{teamPlanNote}</p>
      </div>
    </section>
  );
}
