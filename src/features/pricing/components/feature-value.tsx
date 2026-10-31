import { CheckIcon, MinusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import type { FeatureValue as FeatureValueData } from "../types";

interface FeatureValueProps {
  value: FeatureValueData;
}

/** One cell of the comparison table. */
export function FeatureValue({ value }: FeatureValueProps) {
  switch (value.kind) {
    case "included":
      return (
        <span className="flex items-center gap-2">
          <CheckIcon aria-hidden className="size-4 shrink-0 text-brand" strokeWidth={2.5} />
          {value.note ? `Included (${value.note})` : "Included"}
        </span>
      );
    case "excluded":
      return (
        <>
          <MinusIcon aria-hidden className="size-4 text-muted-foreground" strokeWidth={2} />
          <span className="sr-only">Not included</span>
        </>
      );
    case "comingLater":
      return <Badge variant="outline">Coming later</Badge>;
    case "limit":
      return value.label;
  }
}
