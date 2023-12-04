"use client";

import { Fragment } from "react";

import Image from "next/image";
import Link from "next/link";

import type { User } from "next-auth";
import { Role } from "@prisma/client";

import { useGlobalNavigationPopup } from "@/components/shop/data/navigation-popup";
import { Menu, Transition } from "@headlessui/react";

import { classNames } from "../../../tooling/classnames";

type Props = {
  readonly user?: User;
  readonly down: boolean;
};

export default function UserMenuPopover({
  user,
  down,
}: Readonly<Props>): React.JSX.Element {
  const userNavigation = useGlobalNavigationPopup(user?.role as Role);

  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <Menu.Button className="relative flex  text-sm text-white focus:outline-none">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Uživatelské menu</span>
        <div className="flex items-center">
          <div>
            <Image
              className="inline-block h-9 w-9 rounded-full"
              src={user?.image as string}
              alt="User Profile Image"
              width={48}
              height={48}
            ></Image>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-50 hover:text-gray-400">
              {user?.name as string}
            </p>
          </div>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={
            down
              ? "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-zinc-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              : "absolute -right-16 bottom-0 z-10 mb-16 ml-10 w-48 origin-bottom-right rounded-md bg-zinc-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          }
        >
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick(e);
                    }
                  }}
                  className={classNames(
                    active ? "bg-zinc-800" : "",
                    "block px-4 py-2 text-sm text-gray-100",
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
