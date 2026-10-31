import {
  buildLandingJsonLd,
  ComparisonSection,
  CtaSection,
  ExplorerSection,
  FaqSection,
  HeroSection,
  HowItWorksSection,
  PrivacySection,
  TilesSection,
} from "@/features/landing";
import { PricingSection } from "@/features/pricing";

export default function HomePage() {
  const jsonLd = buildLandingJsonLd();

  return (
    <>
      {/* JSON-LD is data, not executable code, so a native <script> is correct here (Next.js
          JSON-LD guide). `<` is escaped to prevent breaking out of the script tag. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HeroSection />
      <TilesSection />
      <ComparisonSection />
      <ExplorerSection />
      <PrivacySection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
