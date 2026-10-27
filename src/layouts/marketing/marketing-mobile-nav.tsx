"use client";

import { MenuIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

// The sheet pulls in Base UI's dialog (~33 KB), which most visitors never open. It is split into
// its own chunk and fetched on first intent (hover, focus or press), so it is usually ready by
// the time the click lands. `ssr: false` is fine: a closed sheet renders nothing.
const MarketingMobileSheet = dynamic(
  () => import("./marketing-mobile-sheet").then((mod) => mod.MarketingMobileSheet),
  { ssr: false },
);

export function MarketingMobileNav() {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const request = () => setRequested(true);

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="size-11 rounded-full md:hidden"
        onPointerEnter={request}
        onPointerDown={request}
        onFocus={request}
        onClick={() => {
          request();
          setOpen(true);
        }}
      >
        <MenuIcon aria-hidden className="size-5" strokeWidth={1.75} />
      </Button>
      {/* Stays mounted after first use so the close transition can play. */}
      {requested ? (
        <MarketingMobileSheet open={open} onOpenChange={setOpen} triggerRef={triggerRef} />
      ) : null}
    </>
  );
}
