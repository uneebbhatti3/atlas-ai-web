import { cn } from "@/lib/utils";

import { hierarchyTiles, tilesIntro } from "../data/showcase";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { StatusBadge } from "./status-badge";

export function TilesSection() {
  return (
    <section
      aria-labelledby="tiles-title"
      className="mx-auto flex max-w-marketing-wide flex-col gap-14 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="tiles-title" intro={tilesIntro} align="center" />
      </Reveal>

      {/* The hierarchy as app-icon tiles: Workspace → Project → Documents → Knowledge → AI. */}
      <ol className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {hierarchyTiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <Reveal
              as="li"
              key={tile.name}
              index={index}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span
                aria-hidden
                className={cn(
                  "flex size-24 items-center justify-center rounded-3xl border-b-4 shadow-xl md:size-28",
                  tile.tone === "brand"
                    ? "border-black/20 bg-linear-to-b from-brand/80 to-brand text-brand-foreground"
                    : "border-black/40 bg-linear-to-b from-foreground/85 to-foreground text-background",
                )}
              >
                <Icon className="size-10 md:size-12" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col items-center gap-1.5">
                <h3 className="text-base font-semibold">
                  <span className="sr-only">Step {index + 1}: </span>
                  {tile.name}
                </h3>
                <p className="text-sm text-muted-foreground">{tile.caption}</p>
                <StatusBadge status={tile.status} />
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
