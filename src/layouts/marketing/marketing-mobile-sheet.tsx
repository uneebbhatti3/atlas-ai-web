"use client";

import { XIcon } from "lucide-react";
import Link from "next/link";
import type { RefObject } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { marketingNavLinks, siteConfig } from "@/data/site";

interface MarketingMobileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The trigger lives outside this lazy chunk, so focus is handed back to it explicitly. */
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function MarketingMobileSheet({
  open,
  onOpenChange,
  triggerRef,
}: MarketingMobileSheetProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* The built-in close button is 32px; ours meets the 44px hit-target rule. */}
      <SheetContent
        side="right"
        showCloseButton={false}
        finalFocus={triggerRef}
        className="w-full max-w-xs gap-0"
      >
        <SheetHeader className="flex-row items-center justify-between px-6 pt-4 pb-4">
          <SheetTitle className="font-heading text-h3">{siteConfig.name}</SheetTitle>
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                className="-mr-2 size-11 rounded-full"
              />
            }
          >
            <XIcon aria-hidden className="size-5" strokeWidth={1.75} />
          </SheetClose>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col px-3">
          {marketingNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-12 justify-start rounded-md px-3 text-base",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Separator className="mx-6 my-4 w-auto" />
        <div className="px-6">
          <Link
            href={siteConfig.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), "h-12 w-full rounded-full text-base")}
          >
            View on GitHub
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
