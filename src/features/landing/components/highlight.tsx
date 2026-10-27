import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HighlightProps {
  children: ReactNode;
  /** `card` for headings that sit on a lavender panel, where lavender would disappear. */
  tone?: "soft" | "card";
}

/**
 * The marker block behind the key phrase of a headline (Design.md §2). It sits behind the text
 * (`-z-10`; the heading must be `isolate`) so descenders of the line above stay visible, and
 * `box-decoration-clone` keeps the rounded block on every line when the phrase wraps.
 */
export function Highlight({ children, tone = "soft" }: HighlightProps) {
  return (
    <span
      className={cn(
        "relative -z-10 rounded-xl box-decoration-clone px-2 text-foreground",
        tone === "card" ? "bg-card" : "bg-brand-soft",
      )}
    >
      {children}
    </span>
  );
}
