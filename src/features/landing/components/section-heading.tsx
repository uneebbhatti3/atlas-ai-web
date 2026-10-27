import { cn } from "@/lib/utils";

import type { SectionIntro } from "../types";
import { Highlight } from "./highlight";

interface SectionHeadingProps {
  id: string;
  intro: SectionIntro;
  align?: "left" | "center";
  /** `compact` for headings that share a row with other content. */
  size?: "default" | "compact";
  /** Highlight colour; `card` when the heading sits on a lavender panel. */
  highlightTone?: "soft" | "card";
  className?: string;
}

/** Section h2 with its highlighted phrase, plus a short intro. `id` is the section's label. */
export function SectionHeading({
  id,
  intro,
  align = "left",
  size = "default",
  highlightTone = "soft",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {intro.eyebrow ? (
        <p className="text-sm font-medium text-muted-foreground">{intro.eyebrow}</p>
      ) : null}
      {/* Type tokens stay on this plain element, never through cn() onto shadcn parts. */}
      <h2
        id={id}
        className={
          size === "compact"
            ? "isolate font-heading text-h1-sm text-balance md:text-h1"
            : "isolate font-heading text-h1-sm text-balance md:text-display"
        }
      >
        {intro.title}
        {intro.highlight ? (
          <>
            {" "}
            <Highlight tone={highlightTone}>{intro.highlight}</Highlight>
          </>
        ) : null}
      </h2>
      <p className="max-w-xl text-body-lg text-pretty text-muted-foreground">{intro.description}</p>
    </div>
  );
}
