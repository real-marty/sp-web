"use client";

import { useStoreAdminMenu } from "@/hooks/use-store-adminMenu";
import { Bars3Icon } from "@heroicons/react/20/solid";

export function AdminMenuOpenButton() {
  const adminMenu = useStoreAdminMenu();

  return (
    <button
      type="button"
      className="-m-2.5 p-2.5 text-white xl:hidden"
      onClick={adminMenu.onOpen}
    >
      <span className="sr-only">Otevřít menu</span>
      <Bars3Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
