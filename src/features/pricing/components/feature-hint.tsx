import { InfoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureHintProps {
  name: string;
  hint: string;
}

/** An info button beside a feature name. It is a real button, so keyboard focus opens it. */
export function FeatureHint({ name, hint }: FeatureHintProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`What ${name} means`}
            className="-my-3 size-11 shrink-0 rounded-full text-muted-foreground"
          />
        }
      >
        <InfoIcon aria-hidden className="size-4" strokeWidth={1.75} />
      </TooltipTrigger>
      <TooltipContent className="max-w-72 text-sm">{hint}</TooltipContent>
    </Tooltip>
  );
}
