"use client";

import { Fragment, useState } from "react";

import Link from "next/link";

import { useStoreAdminMenu } from "@/hooks/use-store-adminMenu";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  useAdminNavigation,
  useAdminTeams,
  useAdminCategoryNavigation,
} from "@/components/admin/navigation/data/a-navigation";

import { classNames } from "@/components/tooling/classnames";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import type { User } from "next-auth";
import { Logo } from "@/components/crystal-logo";

type Props = {
  readonly children: React.ReactNode;
  readonly user?: User;
};

export default function AdminSidePanel({ children, user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useAdminNavigation();
  const adminMenu = useStoreAdminMenu();
  const teams = useAdminTeams();
  const categories = useAdminCategoryNavigation();

  if (user?.role !== "SUPER_ADMIN") {
    const index = navigation.findIndex((item) => item.name === "Obchod");

    // Check if the "Obchod" entry exists and splice it out
    if (index !== -1) {
      navigation.splice(index, 1);
    }
  }

  return (
    <Transition.Root show={adminMenu.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 xl:hidden"
        onClose={adminMenu.onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={adminMenu.onClose}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <Logo
                    logoText="CRYSTAL CLEAN"
                    seo="Crystal Clean LOGO"
                    className="font-rye text-white text-2xl"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.href}>
                            <ul key={item.name}>
                              <Link
                                href={item.href}
                                onClick={adminMenu.onClose}
                                className={classNames(
                                  item.current
                                    ? "bg-zinc-800 text-white"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                )}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </ul>
                          </li>
                        ))}
                        <li>
                          <Collapsible
                            open={isOpen}
                            onOpenChange={setIsOpen}
                            className=" space-y-2 text-white"
                          >
                            <ul className="items-center rounded-sm space-x-4 px-4 py-2">
                              <CollapsibleTrigger asChild>
                                <li className="flex cursor-pointer justify-between">
                                  <button className="text-sm pt-1 mr-5 flex">
                                    Záložky
                                  </button>
                                  <Button variant="ghost" size="sm">
                                    <CaretSortIcon className="h-4 w-4" />
                                    <div className="sr-only">
                                      Otevřít nabídku
                                    </div>
                                  </Button>
                                </li>
                              </CollapsibleTrigger>
                            </ul>
                            <CollapsibleContent className="space-y-2">
                              {categories.map((item) => (
                                <Link
                                  key={item.href}
                                  onClick={adminMenu.onClose}
                                  className="rounded-md border align-middle border-zinc-600 px-4 py-2 font-mono text-sm shadow-sm flex"
                                  href={item.href}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-zinc-400">
                        Administrace
                      </div>
                      <ul className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <Link
                              href={team.href}
                              onClick={adminMenu.onClose}
                              className={classNames(
                                team.current
                                  ? "bg-zinc-800 text-white"
                                  : "text-zinc-400 hover:text-white hover:bg-zinc-800",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-[0.625rem] font-medium text-zinc-400 group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="-mx-6 mt-auto">
                      <div className="cursor-pointer w-full flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-800">
                        {children}
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
