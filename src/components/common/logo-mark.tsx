import { CompassIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

/** The Atlas app-icon tile. Decorative: it always sits next to the "Atlas AI" wordmark. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground",
        className,
      )}
    >
      <CompassIcon className="size-1/2" strokeWidth={2.25} />
    </span>
  );
}
