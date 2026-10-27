import { LogoMark } from "@/components/common/logo-mark";
import { cn } from "@/lib/utils";

import type { MockNotification } from "../../types";

interface NotificationCardProps {
  notification: MockNotification;
  className?: string;
}

/** An app-notification style card for concept visuals. Rendered inside `inert`. */
export function NotificationCard({ notification, className }: NotificationCardProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-3 rounded-2xl border border-border bg-card p-3.5 text-left shadow-lg",
        className,
      )}
    >
      <LogoMark className="size-9 rounded-xl" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-sm font-semibold">{notification.title}</p>
          <span className="shrink-0 text-xs text-muted-foreground">{notification.time}</span>
        </div>
        <p className="text-sm leading-5 text-muted-foreground">{notification.body}</p>
      </div>
    </div>
  );
}
