import { Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { currency, planFeatures } from "../data/plans";
import type { BillingCycle, Plan } from "../types";
import { formatPrice } from "../utils/format-price";

interface PlanCardProps {
  plan: Plan;
  cycle: BillingCycle;
}

type Feature = (typeof planFeatures)[number];

// Numeric limits first, yes/no features last.
const keyFeatures = planFeatures
  .filter((feature) => feature.keyFeature)
  .sort((a, b) => Number(a.values.free.kind !== "limit") - Number(b.values.free.kind !== "limit"));

// "1,000 / month" -> { amount: 1000, unit: "" }, "50 GB" -> { amount: 50, unit: "gb" }
function parseLimit(label: string) {
  const match = label.match(/^([\d,.]+)\s*([a-z]*)/i);
  if (!match) return null;
  return { amount: Number(match[1].replace(/,/g, "")), unit: match[2].toLowerCase() };
}

// How many times more than Free this plan offers, e.g. "25×". Only when units match.
function upliftOverFree(feature: Feature, planId: Plan["id"]) {
  const base = feature.values.free;
  const current = feature.values[planId];
  if (planId === "free" || base.kind !== "limit" || current.kind !== "limit") return null;

  const a = parseLimit(base.label);
  const b = parseLimit(current.label);
  if (!a || !b || a.unit !== b.unit || a.amount <= 0) return null;

  const ratio = Math.round(b.amount / a.amount);
  return ratio >= 2 ? `${ratio}×` : null;
}

export function PlanCard({ plan, cycle }: PlanCardProps) {
  const price = plan.prices[cycle];
  const featured = Boolean(plan.recommended);

  const tone = featured
    ? { strong: "text-white", muted: "text-zinc-400", rule: "bg-white/10" }
    : { strong: "text-foreground", muted: "text-muted-foreground", rule: "bg-border" };

  return (
    <div className="group relative h-full transition-transform duration-300 hover:-translate-y-1">
      <article
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[28px] p-8 md:p-10",
          featured
            ? "bg-zinc-950 shadow-2xl ring-1 ring-white/10 dark:bg-zinc-900"
            : "bg-card ring-1 ring-border transition-shadow duration-300 group-hover:shadow-xl",
        )}
      >
        {featured ? (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* Light bloom from the top edge */}
            <div className="absolute -top-36 left-1/2 h-72 w-[130%] -translate-x-1/2 rounded-full bg-primary/40 blur-3xl dark:bg-primary/10" />
            {/* Fine grid that fades out, adds texture without noise */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent_55%)] bg-size-[28px_28px] opacity-[0.06]" />
          </div>
        ) : null}

        <div className="relative flex flex-1 flex-col">
          {/* Header */}
          <header className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <h3 className={cn("font-heading text-h3", tone.strong)}>{plan.name}</h3>
              {/* Same height on both cards, so the sections below line up side by side */}
              <p className={cn("text-sm text-pretty md:min-h-15 lg:min-h-10", tone.muted)}>
                {plan.description}
              </p>
            </div>
            {featured ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur">
                <Sparkles className="size-3.5" />
                Recommended
              </span>
            ) : null}
          </header>

          {/* Price */}
          <div className="mt-10">
            <p className="flex items-end gap-2">
              <span
                className={cn(
                  "font-heading text-5xl font-semibold tracking-tight tabular-nums md:text-6xl",
                  tone.strong,
                )}
              >
                {formatPrice(price.monthlyAmount, currency)}
              </span>
              <span className={cn("pb-1.5 text-sm", tone.muted)}>/ month</span>
            </p>
            <p className={cn("mt-2 text-sm", tone.muted)}>{price.note}</p>
          </div>

          {/* CTA */}
          <Button
            disabled={plan.cta.disabled}
            variant={featured ? "default" : "outline"}
            className={cn(
              "mt-10 h-12 w-full gap-2.5 rounded-full text-base disabled:opacity-100",
              featured && "bg-white text-zinc-950 shadow-lg shadow-primary/30 hover:bg-zinc-100",
            )}
          >
            {plan.cta.disabled ? (
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
            ) : null}
            {plan.cta.label}
          </Button>

          <div className={cn("my-10 h-px", tone.rule)} />

          <p className={cn("mb-5 text-xs font-medium tracking-wider uppercase", tone.muted)}>
            {featured ? "Everything in Free, scaled up" : "What's included"}
          </p>

          {/* Features: name left, value right */}
          <ul className="flex flex-col gap-5">
            {keyFeatures.map((feature) => {
              const value = feature.values[plan.id];
              const uplift = upliftOverFree(feature, plan.id);

              return (
                <li key={feature.id} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full",
                      featured
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>

                  <span className={cn("flex-1", value.kind === "limit" ? tone.muted : tone.strong)}>
                    {feature.name}
                  </span>

                  {value.kind === "limit" ? (
                    <span className="flex items-center gap-2 text-right">
                      {uplift ? (
                        <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[11px] font-semibold text-white ring-1 ring-white/15">
                          {uplift}
                        </span>
                      ) : null}
                      <span className={cn("font-semibold tabular-nums", tone.strong)}>
                        {value.label}
                      </span>
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </div>
  );
}
