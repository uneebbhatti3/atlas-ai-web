import { ArrowRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { finalCta, heroDemos } from "../data/hero";
import { ChatBubble } from "./mocks/chat-bubble";
import { CitationChip } from "./mocks/citation-chip";
import { ProductWindow } from "./product-window";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function CtaSection() {
  const demo = heroDemos[0];

  return (
    <section
      aria-labelledby="cta-title"
      className="mx-auto max-w-marketing-wide px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal className="grid grid-cols-1 items-center gap-12 rounded-3xl bg-brand-soft p-6 md:p-14 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-8">
          <SectionHeading id="cta-title" intro={finalCta} size="compact" highlightTone="card" />
          <div className="flex w-full flex-col items-start gap-4">
            <Link
              href={finalCta.primary.href}
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
              {finalCta.primary.label}
              <ArrowRightIcon aria-hidden className="size-4" strokeWidth={2} />
            </Link>
            <Link
              href={finalCta.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-md text-base font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {finalCta.secondary.label}
              <ArrowRightIcon aria-hidden className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* A tilted concept window, like the hero's, to close the loop. Decorative. */}
        {demo ? (
          <div inert className="lg:rotate-2">
            <ProductWindow breadcrumb={demo.breadcrumb}>
              <div className="flex flex-col gap-3 p-5">
                <ChatBubble from="user">{demo.question}</ChatBubble>
                <ChatBubble from="atlas">
                  {demo.answer}{" "}
                  {demo.citations.map((citation) => (
                    <span key={citation.index} className="mr-1 inline-block align-middle">
                      <CitationChip index={citation.index} />
                    </span>
                  ))}
                </ChatBubble>
              </div>
            </ProductWindow>
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
