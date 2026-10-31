import { Fragment } from "react";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";

import { howItWorksChat, howItWorksIntro, howItWorksSteps } from "../data/how-it-works";
import { ChatBubble } from "./mocks/chat-bubble";
import { CitationChip } from "./mocks/citation-chip";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="mx-auto flex max-w-marketing-wide flex-col gap-14 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="how-it-works-title" intro={howItWorksIntro} />
      </Reveal>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Vertical stepper; the line joins each step to the next. */}
        <ol className="flex flex-col">
          {howItWorksSteps.map((step, index) => {
            const last = index === howItWorksSteps.length - 1;
            return (
              <Reveal
                as="li"
                key={step.title}
                index={index}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                {last ? null : (
                  <span aria-hidden className="absolute top-12 bottom-2 left-5 w-px bg-border" />
                )}
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background"
                >
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1.5 pt-1.5">
                  <h3 className="font-heading text-h3">{step.title}</h3>
                  <p className="text-base text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* Concept chat: question, retrieval, cited answer, follow-up. */}
        <Reveal index={1}>
          <figure className="flex flex-col gap-4">
            <div inert className="flex flex-col gap-3 rounded-3xl bg-brand-soft p-5 md:p-8">
              <p className="text-center text-xs text-muted-foreground">Today at 4:15 PM</p>
              {howItWorksChat.map((message, index) => (
                <Fragment key={index}>
                  {message.from === "status" ? (
                    <p className="self-start pl-1 font-mono text-xs text-muted-foreground">
                      {message.text}
                    </p>
                  ) : (
                    <ChatBubble
                      from={message.from}
                      className={message.from === "atlas" ? "bg-card shadow-sm" : undefined}
                    >
                      {message.text}
                      {message.from === "atlas" && message.citations
                        ? message.citations.map((citation) => (
                            <span key={citation} className="ml-1 inline-block align-middle">
                              <CitationChip index={citation} />
                            </span>
                          ))
                        : null}
                    </ChatBubble>
                  )}
                </Fragment>
              ))}
            </div>
            <figcaption className="text-center text-sm text-muted-foreground">
              Example: how a cited answer looks.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
