"use client";

import { ChevronRightIcon, XIcon } from "lucide-react";
import Link from "next/link";
import type { RefObject } from "react";

import { LogoMark } from "@/components/common/logo-mark";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { marketingNavLinks, siteConfig } from "@/data/site";

interface MarketingMobileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The trigger lives outside this lazy chunk, so focus is handed back to it explicitly. */
  triggerRef: RefObject<HTMLButtonElement | null>;
}

// A top sheet styled as a dropdown panel: it covers the header, so its own header row repeats the
// wordmark and puts the close button exactly where the menu trigger was.
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
        side="top"
        showCloseButton={false}
        finalFocus={triggerRef}
        className="max-h-dvh gap-0 overflow-y-auto rounded-b-xl border-border/60 bg-background pb-6 shadow-lg motion-reduce:transition-none"
      >
        <SheetHeader className="h-16 flex-row items-center justify-between gap-4 px-4 py-0 sm:px-6">
          <SheetTitle className="flex items-center gap-2.5 font-heading text-body-lg font-extrabold tracking-tight">
            <LogoMark />
            {siteConfig.name}
          </SheetTitle>
          <SheetClose
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                className="size-11 rounded-full"
              />
            }
          >
            <XIcon aria-hidden className="size-5" strokeWidth={1.75} />
          </SheetClose>
        </SheetHeader>

        <nav aria-label="Mobile" className="px-4 sm:px-6">
          <ul className="flex flex-col">
            {marketingNavLinks.map((link) => (
              <li key={link.href} className="border-b border-border">
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex min-h-14 items-center justify-between gap-4 rounded-md font-heading text-h3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.label}
                  <ChevronRightIcon
                    aria-hidden
                    className="size-5 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-3 px-4 pt-6 sm:px-6">
          <Link
            href={siteConfig.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={cn(buttonVariants(), "h-12 w-full rounded-full text-base")}
          >
            Star on GitHub
          </Link>
          <p className="text-center text-sm text-pretty text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
