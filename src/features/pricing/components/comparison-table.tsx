import { Fragment } from "react";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";

import { featureGroups, planFeatures, plans } from "../data/plans";
import { comparisonIntro } from "../data/pricing-page";
import { FeatureHint } from "./feature-hint";
import { FeatureValue } from "./feature-value";

const stickyColumn = "sticky left-0 z-10 bg-background";

const explainedFeatures = planFeatures.filter((feature) => feature.hint);

export function ComparisonTable() {
  return (
    <section
      aria-labelledby="comparison-title"
      className="mx-auto flex max-w-marketing flex-col gap-12 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal>
        <SectionHeading id="comparison-title" intro={comparisonIntro} align="center" />
      </Reveal>

      {/* This wrapper scrolls, not shadcn's own container, so it can take keyboard focus and
          the first column stays pinned on small screens. */}
      <div
        tabIndex={0}
        role="region"
        aria-labelledby="comparison-title"
        className="overflow-x-auto rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50 **:data-[slot=table-container]:overflow-visible"
      >
        <TooltipProvider>
          <Table className="min-w-120 table-fixed text-sm md:min-w-152">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead scope="col" className={`w-36 md:w-2/5 ${stickyColumn}`}>
                  <span className="sr-only">Feature</span>
                </TableHead>
                {plans.map((plan) => (
                  <TableHead scope="col" key={plan.id} className="h-12 text-base font-semibold">
                    {plan.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureGroups.map((group) => (
                <Fragment key={group.id}>
                  <TableRow className="hover:bg-transparent">
                    <TableHead
                      scope="colgroup"
                      colSpan={plans.length + 1}
                      className="h-14 pt-6 text-base font-semibold"
                    >
                      <span className="sticky left-2">{group.name}</span>
                    </TableHead>
                  </TableRow>
                  {planFeatures
                    .filter((feature) => feature.group === group.id)
                    .map((feature) => (
                      <TableRow key={feature.id} className="hover:bg-transparent">
                        <TableHead
                          scope="row"
                          className={`py-3 font-normal whitespace-normal text-foreground ${stickyColumn}`}
                        >
                          <span className="flex items-center gap-1">
                            {feature.name}
                            {feature.hint ? (
                              <FeatureHint name={feature.name} hint={feature.hint} />
                            ) : null}
                          </span>
                        </TableHead>
                        {plans.map((plan) => (
                          <TableCell key={plan.id} className="py-3 whitespace-normal">
                            <FeatureValue value={feature.values[plan.id]} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>

      {/* Tooltips need a hover or keyboard, so small touch screens get the same words in text. */}
      <dl className="flex flex-col gap-4 md:hidden">
        {explainedFeatures.map((feature) => (
          <div key={feature.id} className="flex flex-col gap-1">
            <dt className="text-sm font-medium">{feature.name}</dt>
            <dd className="text-sm text-muted-foreground">{feature.hint}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
