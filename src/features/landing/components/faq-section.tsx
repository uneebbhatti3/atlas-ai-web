import { PlusIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqIntro, faqItems } from "../data/faq";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

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

      {/* `hiddenUntilFound` keeps every answer in the HTML (readable by search engines and
          findable with find-in-page). The default chevrons are swapped for a "+" that turns
          into "×" when open. */}
      <Accordion className="mx-auto w-full max-w-3xl">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-b border-border">
            <AccordionTrigger className="min-h-16 items-center py-5 text-base font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
              {item.question}
              <PlusIcon
                aria-hidden
                className="ml-auto size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45 motion-reduce:transition-none"
                strokeWidth={1.75}
              />
            </AccordionTrigger>
            <AccordionContent hiddenUntilFound className="pr-10 text-base text-muted-foreground">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
