import type { ReactNode } from "react";

import { MarketingFooter } from "./marketing-footer";
import { MarketingHeader } from "./marketing-header";

interface MarketingLayoutProps {
  children: ReactNode;
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <MarketingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </>
  );
}
