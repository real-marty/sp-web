"use client";

import useCurrencyStore from "@/hooks/use-store-currency";
import { formatterCZ, formatterSK } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  priceCZK?: string | number;
  priceEUR?: string | number;
};

const Currency = ({ priceCZK, priceEUR }: Props) => {
  const { currency } = useCurrencyStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-1 flex-col justify-end">
      {currency.value === "CZK" ? (
        <p className=" text-zinc-100">{formatterCZ.format(Number(priceCZK))}</p>
      ) : (
        <p className=" text-zinc-100">
          {" "}
          {formatterSK.format(Number(priceEUR))}
        </p>
      )}
    </div>
  );
};

export default Currency;
