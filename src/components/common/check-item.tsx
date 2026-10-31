import { CheckIcon } from "lucide-react";
import type { ReactNode } from "react";

interface CheckItemProps {
  children: ReactNode;
  detail?: string;
}

/** A checklist row: a filled tick, the point, and an optional one-line detail. */
export function CheckItem({ children, detail }: CheckItemProps) {
  return (
    <li className="flex gap-3 py-3.5">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
        <CheckIcon aria-hidden className="size-3.5" strokeWidth={3} />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-medium">{children}</span>
        {detail ? <span className="text-sm text-muted-foreground">{detail}</span> : null}
      </div>
    </li>
  );
}
