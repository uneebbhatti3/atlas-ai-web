import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { roadmapIntro, roadmapStages } from "../data/roadmap";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { StatusBadge } from "./status-badge";

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="mx-auto max-w-marketing-wide px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal className="grid grid-cols-1 gap-10 overflow-hidden rounded-3xl bg-brand-soft p-6 md:p-12 lg:grid-cols-5 lg:items-center lg:gap-12">
        <SectionHeading
          id="roadmap-title"
          intro={roadmapIntro}
          size="compact"
          highlightTone="card"
          className="lg:col-span-2"
        />

        {/* Stage cards in a row, like days in a planner. Scrolls sideways on every width; it is
            focusable so keyboard users can scroll it too. */}
        <ol
          tabIndex={0}
          aria-label="Roadmap stages"
          className="-mx-6 flex snap-x snap-mandatory scrollbar-thin gap-3 overflow-x-auto px-6 pb-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:-mx-12 md:px-12 lg:col-span-3 lg:mx-0 lg:px-0"
        >
          {roadmapStages.map((stage) => {
            const current = stage.status === "in-progress";
            return (
              <li key={stage.stage} className="w-60 shrink-0 snap-start">
                <Card
                  aria-current={current ? "step" : undefined}
                  className={cn(
                    "h-full gap-3 rounded-2xl ring-border",
                    current && "ring-2 ring-brand",
                  )}
                >
                  <CardHeader className="gap-1">
                    <p className="text-sm text-muted-foreground">{stage.stage}</p>
                    <h3 className="font-heading text-h3">{stage.title}</h3>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                    <StatusBadge status={stage.status} className="mt-auto self-start" />
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
