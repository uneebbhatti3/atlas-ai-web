"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

import type { NavLink } from "@/types/site";

interface MarketingNavLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  link: NavLink;
}

/** An in-page anchor on the landing page; the link's own route everywhere else. */
export function MarketingNavLink({ link, ...props }: MarketingNavLinkProps) {
  const pathname = usePathname();
  const href = pathname !== "/" && link.offLandingHref ? link.offLandingHref : link.href;

  return <Link href={href} {...props} />;
}
