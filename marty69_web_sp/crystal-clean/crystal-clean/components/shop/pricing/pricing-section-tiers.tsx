import { classNames } from "@/components/tooling/classnames";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CurrencySwap from "./pricing-section-currency-swap";
import { PricingTier } from "@/types/pricingTier";

type Props = {
  data: PricingTier[];
};

const PricingTiers = ({ data }: Props) => {
  return (
    <>
      {data.map((tier) => (
        <div
          key={tier.id}
          className={classNames(
            tier.featured
              ? "z-10 bg-zinc-900 shadow-xl ring-1 ring-gray-900/10"
              : "bg-zinc-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
            "relative rounded-2xl",
          )}
        >
          <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-gray-100" : "text-white",
                " leading-6 font-rye text-xl",
              )}
            >
              {tier.name}
            </h3>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
              <CurrencySwap tier={tier} />
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-red-800 shadow-sm hover:bg-red-700 focus-visible:outline-red-800"
                    : "bg-white/10 hover:bg-white/20 focus-visible:outline-white",
                  "rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                )}
              >
                Stránka služby
              </Link>
            </div>
            <div className="mt-8 flow-root sm:mt-10">
              <ul
                className={classNames(
                  tier.featured
                    ? "divide-gray-900/5 border-gray-900/5 text-white"
                    : "divide-white/5 border-white/5 text-white",
                  "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0",
                )}
              >
                {tier.mainFeatures.map((mainFeature) => (
                  <li key={mainFeature} className="flex gap-x-3 py-2">
                    <CheckIcon
                      className={classNames(
                        tier.featured ? "text-red-600" : "text-gray-100",
                        "h-6 w-5 flex-none",
                      )}
                      aria-hidden="true"
                    />
                    {mainFeature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PricingTiers;
