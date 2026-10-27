"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons render on the server and CSS picks one from the `.dark` class, so the button
  // never changes shape or flashes during hydration.
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Switch between light and dark theme"
      className="size-11 rounded-full text-muted-foreground hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon aria-hidden className="hidden size-5 dark:block" strokeWidth={1.75} />
      <MoonIcon aria-hidden className="size-5 dark:hidden" strokeWidth={1.75} />
    </Button>
  );
}
