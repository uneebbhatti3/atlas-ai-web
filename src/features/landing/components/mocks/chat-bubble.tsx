import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  from: "user" | "atlas";
  children: ReactNode;
  className?: string;
}

/** A message bubble for concept chats: the user's in violet, Atlas's in a neutral fill. */
export function ChatBubble({ from, children, className }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "w-fit max-w-xs rounded-2xl px-4 py-2.5 text-sm leading-6 sm:max-w-sm",
        from === "user"
          ? "self-end rounded-br-md bg-brand text-brand-foreground"
          : "self-start rounded-bl-md bg-muted text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
