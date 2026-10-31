import { CheckItem } from "@/components/common/check-item";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { explorerIntro, explorerTabs } from "../data/explorer";

export function ExplorerSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="mx-auto flex max-w-marketing-wide flex-col gap-12 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="features-title" intro={explorerIntro} align="center" />
      </Reveal>

      {/* shadcn Tabs styled as a pill grid through className (owner decision 2026-10-27).
          `keepMounted` keeps every panel in the HTML for search engines. */}
      <Tabs defaultValue={explorerTabs[0]?.id} className="min-w-0 gap-6">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0 group-data-horizontal/tabs:h-auto sm:grid-cols-3 lg:grid-cols-5">
          {explorerTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="h-12 gap-2 rounded-full bg-muted text-base text-foreground hover:bg-muted/70 dark:text-foreground data-active:bg-foreground data-active:text-background dark:data-active:border-transparent dark:data-active:bg-foreground dark:data-active:text-background"
              >
                <Icon aria-hidden strokeWidth={1.75} />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {explorerTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} keepMounted>
            <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-brand-soft p-6 md:min-h-104 md:p-12 lg:grid-cols-5 lg:gap-12">
              <div className="flex flex-col gap-4 lg:col-span-2">
                <h3 className="font-heading text-h1-sm text-balance">{tab.title}</h3>
                <p className="text-body-lg text-pretty text-muted-foreground">{tab.description}</p>
              </div>
              <Card className="rounded-2xl py-2 shadow-xl ring-border lg:col-span-3">
                <CardContent className="px-5">
                  <ul className="grid grid-cols-1 divide-border sm:grid-cols-2 sm:gap-x-8">
                    {tab.checklist.map((item) => (
                      <CheckItem key={item}>{item}</CheckItem>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
