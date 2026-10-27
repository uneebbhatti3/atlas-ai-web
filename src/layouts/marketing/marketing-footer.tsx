import Link from "next/link";

import { LogoMark } from "@/components/common/logo-mark";
import { Separator } from "@/components/ui/separator";
import { footerColumns, siteConfig } from "@/data/site";

import { CurrentYear } from "./current-year";

const linkClass =
  "-mx-1 inline-flex min-h-11 items-center rounded-md px-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50";

export function MarketingFooter() {
  return (
    <footer className="mt-auto overflow-hidden bg-brand-soft/50">
      <div className="mx-auto flex max-w-marketing-wide flex-col gap-12 px-4 pt-16 pb-10 sm:px-6">
        {/* Giant wordmark with the glowing app icon in front: the page's sign-off. */}
        <div aria-hidden className="relative flex flex-col items-center">
          <p className="text-center font-heading text-wordmark text-foreground select-none">
            {siteConfig.name}
          </p>
          <LogoMark className="-mt-8 size-24 md:-mt-16 md:size-36 md:rounded-4xl" />
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <div className="flex flex-col gap-3 md:col-span-2">
            <Link
              href="/"
              className="-mx-2 flex min-h-11 w-fit items-center gap-2.5 rounded-md px-2 font-heading text-body-lg font-extrabold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <LogoMark />
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">{siteConfig.tagline}</p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="flex flex-col">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}.
          </p>
          <Link
            href={siteConfig.author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="-mx-1 inline-flex min-h-11 w-fit items-center rounded-md px-1 text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Built by {siteConfig.author.name}
          </Link>
        </div>
      </div>
    </footer>
  );
}
