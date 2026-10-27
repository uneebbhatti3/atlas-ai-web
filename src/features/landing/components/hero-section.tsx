import { ArrowRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { heroContent } from "../data/hero";
import { HeroDemo } from "./hero-demo";
import { Highlight } from "./highlight";

export function HeroSection() {
  const { titleLine, secondLine, highlight, description, primaryCta, secondaryCta, note } =
    heroContent;

  // Not animated: the headline and the demo are the LCP candidates and must paint straight from
  // the server HTML.
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col items-center gap-12 overflow-x-clip px-4 pt-14 pb-8 sm:px-6 md:pt-20"
    >
      <div className="flex max-w-6xl flex-col items-center gap-7 text-center">
        <h1
          id="hero-title"
          className="isolate font-heading text-display-sm text-balance md:text-display lg:text-display-lg"
        >
          {/* Each line is its own block so the fallback font and Plus Jakarta Sans wrap the
              same way, and the font swap causes no layout shift. */}
          <span className="block">{titleLine}</span>
          <span className="block">
            {secondLine} <Highlight>{highlight}</Highlight>
          </span>
        </h1>
        <p className="max-w-2xl text-body-lg text-pretty text-muted-foreground">{description}</p>

        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants(),
              "h-14 w-full gap-3 rounded-full pr-6 pl-2 text-base shadow-lg sm:w-auto",
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground">
              <StarIcon aria-hidden className="size-4" strokeWidth={2} />
            </span>
            {primaryCta.label}
            <ArrowRightIcon aria-hidden className="size-4" strokeWidth={2} />
          </Link>
          <Link
            href={secondaryCta.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-14 w-full rounded-full px-7 text-base sm:w-auto",
            )}
          >
            {secondaryCta.label}
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>

      <HeroDemo />
    </section>
  );
}
