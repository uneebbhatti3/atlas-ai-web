import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";

import {
  comparisonIntro,
  withAtlas,
  withAtlasNotifications,
  withoutAtlas,
  withoutAtlasItems,
} from "../data/showcase";
import { NotificationCard } from "./mocks/notification-card";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1"] as const;

export function ComparisonSection() {
  return (
    <section
      aria-labelledby="comparison-title"
      className="mx-auto flex max-w-marketing-wide flex-col gap-12 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="comparison-title" intro={comparisonIntro} align="center" />
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-muted p-6 md:p-10">
          <h3 className="text-sm font-semibold">{withoutAtlas.label}</h3>
          {/* Scattered, slightly tilted cards: the mess before Atlas. */}
          <ul inert className="flex w-full max-w-sm flex-col gap-3">
            {withoutAtlasItems.map((item, index) => (
              <li
                key={item.title}
                className={cn(
                  "flex flex-col gap-1 rounded-2xl border border-border bg-card p-4 shadow-md",
                  tilts[index % tilts.length],
                )}
              >
                <span className="text-base font-medium">{item.title}</span>
                <span className="text-sm text-muted-foreground">{item.meta}</span>
              </li>
            ))}
          </ul>
          <p className="mt-auto text-sm text-muted-foreground">{withoutAtlas.caption}</p>
        </Reveal>

        <Reveal
          index={1}
          className="flex flex-col items-center gap-6 rounded-3xl bg-brand-soft p-6 md:p-10"
        >
          <h3 className="text-sm font-semibold">{withAtlas.label}</h3>
          <div inert className="flex w-full max-w-sm flex-col gap-3">
            {withAtlasNotifications.map((notification) => (
              <NotificationCard key={notification.title} notification={notification} />
            ))}
          </div>
          <p className="mt-auto text-sm text-muted-foreground">{withAtlas.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
