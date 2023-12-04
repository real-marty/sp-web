"use client";

import { classNames } from "@/components/tooling/classnames";
import { useStoreFiltersMenu } from "@/hooks/use-store-filtersMenu";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Category, Color, Size, Specification } from "@prisma/client";
import { useSearchParams, useRouter } from "next/navigation";
import { Fragment } from "react";
import qs from "query-string";
import Button from "./product-btn";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color | Category | Specification)[];
  name: string;
  valueKey: string;
}

export const ProductsFilters: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedFilters = searchParams.get(valueKey);

  const onClick = (value: string) => {
    const currentParams = qs.parse(searchParams.toString());
    const query = {
      ...currentParams,
      [valueKey]: value,
    };
    if (currentParams[valueKey] === value) {
      query[valueKey] = null;
    }
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <>
      <legend className="block text-sm font-medium text-white">{name}</legend>
      <div className="space-y-3 pt-6">
        {data.map((option, optionIdx) => (
          <div key={option.name} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-xs text-zinc-100 px-2 py-1 bg-zinc-900 border",
                selectedFilters === option.id && "bg-red-800 text-white",
              )}
              onClick={() => onClick(option.id)}
            >
              {option.name}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export const MobileFilters: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedFilters = searchParams.get(valueKey);

  const onClick = (value: string) => {
    const currentParams = qs.parse(searchParams.toString());
    const query = {
      ...currentParams,
      [valueKey]: value,
    };
    if (currentParams[valueKey] === value) {
      query[valueKey] = null;
    }
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="mt-4">
      <Disclosure
        as="div"
        key={name}
        className="border-t border-zinc-700 pb-4 pt-4"
      >
        {({ open }) => (
          <fieldset>
            <legend className="w-full px-2">
              <Disclosure.Button className="flex w-full items-center justify-between p-2 text-zinc-400 hover:text-zinc-500">
                <span className="text-sm font-medium text-white">{name}</span>
                <span className="ml-6 flex h-7 items-center">
                  <ChevronDownIcon
                    className={classNames(
                      open ? "-rotate-180" : "rotate-0",
                      "h-5 w-5 transform",
                    )}
                    aria-hidden="true"
                  />
                </span>
              </Disclosure.Button>
            </legend>
            <Disclosure.Panel className="px-4 pb-2 pt-4">
              <div className="space-y-6">
                {data.map((option, optionIdx) => (
                  <div key={option.name} className="flex items-center">
                    <Button
                      className={cn(
                        "rounded-md text-xs text-zinc-100 px-2 py-1 bg-zinc-900 border",
                        selectedFilters === option.id &&
                          "bg-red-800 text-white",
                      )}
                      onClick={() => onClick(option.id)}
                    >
                      {option.name}
                    </Button>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </fieldset>
        )}
      </Disclosure>
    </div>
  );
};

export const MobileFitersWrapper = ({ children }: any) => {
  const { isOpen, onClose } = useStoreFiltersMenu();

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-zinc-900 py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-white">Filtrace</h2>
                  <button
                    type="button"
                    className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-zinc-400 hover:text-zinc-500"
                    onClick={onClose}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
