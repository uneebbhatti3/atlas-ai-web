export type PlanId = "free" | "pro";

export type BillingCycle = "monthly" | "yearly";

export type FeatureGroupId = "organize" | "knowledge" | "limits" | "advanced";

export type FeatureValue =
  | { kind: "included"; note?: string }
  | { kind: "excluded" }
  | { kind: "limit"; label: string }
  | { kind: "comingLater" };

export interface PlanPrice {
  /** Whole US dollars per month, also when billed yearly. */
  monthlyAmount: number;
  /** One line under the price, shown on every card so they stay the same height. */
  note: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  prices: Record<BillingCycle, PlanPrice>;
  recommended: boolean;
  /** `disabled: true` is a literal so no plan can be made purchasable before billing exists. */
  cta: { label: string; disabled: boolean };
}

export interface FeatureGroup {
  id: FeatureGroupId;
  name: string;
}

export interface PlanFeature {
  id: string;
  name: string;
  group: FeatureGroupId;
  values: Record<PlanId, FeatureValue>;
  /** Plain-language explanation, shown in a tooltip. */
  hint?: string;
  /** Also listed on the plan cards. */
  keyFeature?: boolean;
}

export interface BillingOption {
  id: BillingCycle;
  label: string;
}
