"use client";

import { useStoreFiltersMenu } from "@/hooks/use-store-filtersMenu";
import { PlusIcon } from "@heroicons/react/24/outline";

const MobileMenuFilterOpen = () => {
  const { onOpen } = useStoreFiltersMenu();

  return (
    <button
      type="button"
      className="inline-flex items-center lg:hidden"
      onClick={onOpen}
    >
      <span className="text-sm font-medium text-zinc-100">Filtrace</span>
      <PlusIcon
        className="ml-1 h-4 w-4 flex-shrink-0 text-zinc-50"
        aria-hidden="true"
      />
    </button>
  );
};

export default MobileMenuFilterOpen;
