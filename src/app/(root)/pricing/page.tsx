import type { Metadata } from "next";

import { ComparisonTable, PricingFaq, PricingPageHeader } from "@/features/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Compare Atlas AI plans. Start free with your own notes, or choose Pro for more storage, AI questions and research reports, with citations on every answer.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PricingPageHeader />
      <ComparisonTable />
      <PricingFaq />
    </>
  );
}
