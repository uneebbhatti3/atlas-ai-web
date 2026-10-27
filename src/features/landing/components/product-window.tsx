import { ChevronRightIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProductWindowProps {
  /** Path shown in the title bar; it spells out where the screen sits in the hierarchy. */
  breadcrumb: string[];
  children: ReactNode;
  className?: string;
}

/**
 * Frame for the concept screens. Decorative: callers render it inside an `inert` wrapper and
 * describe it in text, so nothing inside is focusable or announced.
 */
export function ProductWindow({ breadcrumb, children, className }: ProductWindowProps) {
  return (
    <Card className={cn("gap-0 rounded-xl py-0 shadow-lg ring-border", className)}>
      <div className="flex h-11 items-center gap-4 border-b border-border bg-muted/40 px-4">
        <div className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </div>
        <div className="flex min-w-0 items-center gap-1 text-sm text-muted-foreground">
          {breadcrumb.map((crumb, index) => {
            const last = index === breadcrumb.length - 1;
            return (
              // Small screens show only where you are; the full path from `sm` up.
              <span
                key={crumb}
                className={cn("min-w-0 items-center gap-1", last ? "flex" : "hidden sm:flex")}
              >
                {index > 0 ? (
                  <ChevronRightIcon
                    className="hidden size-3.5 shrink-0 sm:block"
                    strokeWidth={1.75}
                  />
                ) : null}
                <span className={cn("truncate", last && "font-medium text-foreground")}>
                  {crumb}
                </span>
              </span>
            );
          })}
        </div>
        <Badge variant="outline" className="ml-auto shrink-0 bg-background">
          Concept
        </Badge>
      </div>
      {children}
    </Card>
  );
}
