"use client";

import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useCurrencyStore from "@/hooks/use-store-currency";
import { useFrequencies } from "@/components/shop/data/frequencies";

const PricingGroup = () => {
  const frequencies = useFrequencies();
  const { currency, setCurrency } = useCurrencyStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFrequencyChange = (value: string) => {
    // Update the currency state with the new frequency
    const selectedFrequency = frequencies.find((f) => f.value === value);
    if (selectedFrequency) {
      setCurrency(selectedFrequency);
    }
  };

  if (!isMounted) return null;

  return (
    <RadioGroup
      value={currency.value}
      onChange={handleFrequencyChange}
      className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
    >
      <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
      {frequencies.map((option) => (
        <RadioGroup.Option
          key={option.value}
          value={option.value}
          className={({ checked }) =>
            clsx({
              "bg-zinc-500": checked,
              "cursor-pointer": true,
              "rounded-full": true,
              "px-2.5": true,
              "py-1": true,
            })
          }
        >
          <span>{option.label}</span>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

export default PricingGroup;
