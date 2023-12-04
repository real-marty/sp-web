"use client";

import Link from "next/link";

import type { User } from "next-auth";

import UserMenuPopover from "@/components/shop/navigation/layout/user-navigation-popup";
import AdminSidePanel from "@/components/admin/navigation/layout/a-mobile-navigation";
import { Logo } from "@/components/crystal-logo";
import {
  useAdminTeams,
  useAdminNavigation,
  useAdminCategoryNavigation,
} from "../data/a-navigation";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { classNames } from "@/components/tooling/classnames";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  readonly user?: User;
  readonly children: any;
};

export default function AdminNavigation({ children, user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navigation = useAdminNavigation();
  const teams = useAdminTeams();
  const categories = useAdminCategoryNavigation();

  if (user?.role !== "SUPER_ADMIN") {
    const index = navigation.findIndex((item) => item.name === "Obchod");
    if (index !== -1) {
      navigation.splice(index, 1);
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <AdminSidePanel user={user}>
        <div>{user && <UserMenuPopover down={false} user={user} />}</div>
      </AdminSidePanel>
      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <Logo
            logoText="CRYSTAL CLEAN"
            seo="Crystal Clean Karlovy Vary"
            className="text-2xl font-rye text-white pt-4"
          />
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <ul key={item.href}>
                    <li>
                      <Link
                        href={item.href}
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
                    </li>
                  </ul>
                ))}
                <ul>
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className=" space-y-2 text-white"
                  >
                    <li className="items-center rounded-sm space-x-4 px-4 py-2">
                      <CollapsibleTrigger asChild>
                        <div className="flex cursor-pointer justify-between">
                          <button className="text-sm pt-1 mr-5 flex">
                            Záložky
                          </button>
                          <Button variant="ghost" size="sm">
                            <CaretSortIcon className="h-4 w-4" />
                            <li className="sr-only">Otevřít nabídku</li>
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                    </li>
                    <CollapsibleContent className="space-y-2">
                      {categories.map((item) => (
                        <Link
                          key={item.href}
                          className="rounded-md border align-middle border-zinc-600 px-4 py-2 font-mono text-sm shadow-sm flex"
                          href={item.href}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
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
              <div className="-mx-6 mt-auto">
                <ol className="cursor-pointer w-full flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-800">
                  {user && <UserMenuPopover down={false} user={user} />}
                </ol>
              </div>
            </ul>
          </nav>
        </div>
      </div>
      <div className="xl:pl-72">{children}</div>
    </div>
  );
}
