import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { billingOptions, plans } from "../data/plans";
import { PlanCard } from "./plan-card";

/**
 * Monthly and yearly each have a full panel of server-rendered cards. `keepMounted` keeps both
 * in the HTML, and the two panels are the same height, so toggling never shifts the layout.
 */
export function BillingTabs() {
  return (
    <Tabs defaultValue={billingOptions[0]?.id} className="min-w-0 items-center gap-8">
      <TabsList
        aria-label="Billing cycle"
        className="h-auto gap-1 rounded-full p-1 group-data-horizontal/tabs:h-auto"
      >
        {billingOptions.map((option) => (
          <TabsTrigger
            key={option.id}
            value={option.id}
            className="h-11 flex-none rounded-full px-6 text-sm"
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {billingOptions.map((option) => (
        <TabsContent key={option.id} value={option.id} keepMounted className="w-full">
          <div className="mx-auto grid max-w-marketing grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} cycle={option.id} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
