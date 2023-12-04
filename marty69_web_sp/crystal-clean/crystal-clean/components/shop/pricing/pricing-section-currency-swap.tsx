"use client";

import { classNames } from "@/components/tooling/classnames";
import useCurrencyStore from "@/hooks/use-store-currency";
import { PricingTier } from "@/types/pricingTier";

type Props = {
  tier: PricingTier;
};

const CurrencySwap = ({ tier }: Props) => {
  const { currency } = useCurrencyStore();

  return (
    <div className="mt-2 flex items-center gap-x-2">
      <p
        className={classNames(
          tier.featured ? "text-gray-100" : "text-white",
          "text-4xl font-bold tracking-tight",
        )}
      >
        {tier.price[currency.value as keyof typeof tier.price]}
      </p>
      <div className="text-sm leading-5">
        <p className={tier.featured ? "text-gray-100" : "text-white"}>
          {currency.label} {/* Displaying the label */}
        </p>
      </div>
    </div>
  );
};

export default CurrencySwap;
