import { Badge } from "@/components/ui/badge";

import type { BuildStatus } from "../types";

// Status without colour (Design.md §2): solid = available, secondary fill = in progress,
// outline = coming soon.
const statuses: Record<
  BuildStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  available: { label: "Available", variant: "default" },
  "in-progress": { label: "In progress", variant: "secondary" },
  "coming-soon": { label: "Coming soon", variant: "outline" },
};

interface StatusBadgeProps {
  status: BuildStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, variant } = statuses[status];
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
