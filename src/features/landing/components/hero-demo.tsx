import { SparklesIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { heroContent, heroDemos, heroIndexLog, heroNotifications } from "../data/hero";
import type { HeroDemo as HeroDemoData } from "../types";
import { ChatBubble } from "./mocks/chat-bubble";
import { CitationChip } from "./mocks/citation-chip";
import { NotificationCard } from "./mocks/notification-card";
import { ProductWindow } from "./product-window";
import { StatusBadge } from "./status-badge";

interface ConversationProps {
  demo: HeroDemoData;
}

function Conversation({ demo }: ConversationProps) {
  return (
    <div className="flex min-h-96 flex-col gap-4 p-5 text-left md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <SparklesIcon className="size-4" strokeWidth={1.75} />
          Ask Atlas
        </p>
        <StatusBadge status={demo.status} />
      </div>
      <p className="text-center text-xs text-muted-foreground">Today at 9:41 AM</p>
      <ChatBubble from="user">{demo.question}</ChatBubble>
      <ChatBubble from="atlas">
        {demo.answer}{" "}
        {demo.citations.map((citation) => (
          <span key={citation.index} className="mr-1 inline-block align-middle">
            <CitationChip index={citation.index} />
          </span>
        ))}
      </ChatBubble>
      <div className="mt-auto grid gap-2 sm:grid-cols-2">
        {demo.citations.map((citation) => (
          <div
            key={citation.index}
            className="flex gap-2.5 rounded-xl border border-border bg-background p-3"
          >
            <CitationChip index={citation.index} />
            <div className="flex min-w-0 flex-col gap-0.5">
              <p className="truncate font-mono text-xs">{citation.document}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{citation.passage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tilted cards around the window, like objects on a desk. Wide screens only, where they can
 * overlap just the window's edge; decorative. */
function FloatingCards() {
  const [first, second] = heroNotifications;
  return (
    <div inert className="pointer-events-none absolute inset-0 z-10 hidden xl:block">
      <div className="absolute top-40 -left-26 w-64 -rotate-3 rounded-2xl bg-foreground p-4 text-background shadow-xl">
        <p className="mb-3 flex gap-1.5">
          <span className="size-2 rounded-full bg-background/30" />
          <span className="size-2 rounded-full bg-background/30" />
          <span className="size-2 rounded-full bg-background/30" />
        </p>
        <ul className="flex flex-col gap-2 font-mono text-xs">
          {heroIndexLog.map((line) => (
            <li key={line} className="whitespace-pre">
              {line}
            </li>
          ))}
        </ul>
      </div>
      {first ? (
        <NotificationCard
          notification={first}
          className="absolute top-28 -right-34 w-72 rotate-2"
        />
      ) : null}
      {second ? (
        <NotificationCard
          notification={second}
          className="absolute top-72 -right-30 w-72 -rotate-1"
        />
      ) : null}
    </div>
  );
}

export function HeroDemo() {
  return (
    <figure className="flex w-full max-w-5xl flex-col items-center gap-6">
      {/* shadcn Tabs (client) with server-rendered panels; `keepMounted` keeps every
          conversation in the HTML. */}
      <Tabs defaultValue={heroDemos[0]?.id} className="w-full items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="text-sm text-muted-foreground">{heroContent.demoLabel}</span>
          <TabsList
            aria-label="Example questions"
            className="h-auto flex-wrap justify-center gap-2 bg-transparent p-0 group-data-horizontal/tabs:h-auto"
          >
            {heroDemos.map((demo) => {
              const Icon = demo.icon;
              return (
                <TabsTrigger
                  key={demo.id}
                  value={demo.id}
                  className="h-11 flex-none gap-2 rounded-full border-border bg-background px-4 text-sm text-foreground shadow-xs data-active:border-foreground data-active:shadow-sm dark:data-active:border-foreground dark:data-active:bg-background"
                >
                  <Icon aria-hidden strokeWidth={1.75} />
                  {demo.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div className="relative w-full">
          <FloatingCards />
          {heroDemos.map((demo) => (
            <TabsContent key={demo.id} value={demo.id} keepMounted>
              <div inert>
                <ProductWindow breadcrumb={demo.breadcrumb} className="mx-auto max-w-3xl">
                  <Conversation demo={demo} />
                </ProductWindow>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <figcaption className="text-center text-sm text-muted-foreground">
        {heroContent.mockCaption}
      </figcaption>
    </figure>
  );
}
