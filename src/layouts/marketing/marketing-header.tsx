import Link from "next/link";

import { LogoMark } from "@/components/common/logo-mark";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { marketingNavLinks, siteConfig } from "@/data/site";

import { MarketingMobileNav } from "./marketing-mobile-nav";

export function MarketingHeader() {
  return (
    // Solid by default; translucent glass only where backdrop-filter works and the user has not
    // asked for reduced transparency (Design.md §6).
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background supports-backdrop-filter:bg-glass supports-backdrop-filter:backdrop-blur-glass supports-backdrop-filter:backdrop-saturate-180 reduced-transparency:bg-background reduced-transparency:backdrop-blur-none">
      <div className="mx-auto flex h-16 max-w-marketing-wide items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="-mx-2 flex min-h-11 items-center gap-2.5 rounded-md px-2 font-heading text-body-lg font-extrabold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <LogoMark />
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {marketingNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-11 rounded-full px-4 text-sm text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href={siteConfig.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "hidden h-11 rounded-xl px-5 text-sm md:inline-flex")}
          >
            Star on GitHub
          </Link>
          <MarketingMobileNav />
        </div>
      </div>
    </header>
  );
}
