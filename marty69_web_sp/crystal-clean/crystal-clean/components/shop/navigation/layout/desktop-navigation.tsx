"use client";

import { Fragment } from "react";

import { signIn } from "next-auth/react";
import type { User } from "next-auth";
import Link from "next/link";

import { UseStoreNavigationMobileMenu } from "@/hooks/use-store-navigationMobileMenu";

import { Popover, Transition } from "@headlessui/react";

import {
  Bars3Icon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { Logo } from "@/components/crystal-logo";
import UserMenuPopover from "./user-navigation-popup";

import { Navigation } from "@/components/shop/data/navigation";

import { classNames } from "@/components/tooling/classnames";
import ShoppingCart from "@/components/shop/cart/cart-preview";
import CurrencySelect from "./currency/currency-select";
import Image from "next/image";

interface MainNavigationProps {
  user: User | undefined;
  navigation: Navigation;
}

const DesktopNavigation = ({ user, navigation }: MainNavigationProps) => {
  const { onOpen } = UseStoreNavigationMobileMenu();

  return (
    <header className="absolute w-full z-10">
      <nav aria-label="Top">
        {/* Top navigation */}
        <div className="bg-zinc-950">
          <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Currency selector */}
            <form>
              <div>
                <label htmlFor="desktop-currency" className="sr-only">
                  Měna
                </label>
                <div className="group relative -m-2 rounded-md border-transparent bg-white focus-within:ring-2 focus-within:ring-white">
                  <CurrencySelect />
                </div>
              </div>
            </form>

            <div className="flex items-center space-x-6">
              {!user && (
                <button
                  onClick={() => signIn()}
                  className="text-sm font-medium text-white hover:text-gray-200"
                >
                  Přihlásit se
                </button>
              )}
              {user && <UserMenuPopover down={true} user={user} />}
            </div>
          </div>
        </div>

        {/* Secondary navigation */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <div className="flex h-16 items-center justify-between">
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <Logo
                    logoText="CRYSTAL CLEAN"
                    seo="Crystal Clean Karlovy Vary"
                    className="text-2xl font-rye text-white"
                  />
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <Popover.Group className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button
                                  as="button"
                                  className="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out"
                                >
                                  {category.name}
                                  <span
                                    className={classNames(
                                      open ? "bg-white" : "",
                                      "absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out",
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-300">
                                  <div
                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                    aria-hidden="true"
                                  />

                                  <div className="relative bg-zinc-950">
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                      <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                        {category.featured.map((item) => (
                                          <div
                                            key={item.name}
                                            className="group relative"
                                          >
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                              <Image
                                                width={400}
                                                height={400}
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <Link
                                              href={item.href}
                                              className="mt-4 block font-medium text-gray-100"
                                            >
                                              <Popover.Button
                                                className="absolute inset-0 z-10"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </Link>
                                            <p
                                              aria-hidden="true"
                                              className="mt-1"
                                            >
                                              Ukázat detaily
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <Link
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-white"
                        >
                          {page.name}
                        </Link>
                      ))}
                    </div>
                  </Popover.Group>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 p-2 text-white"
                    onClick={onOpen}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Search */}
                  <Link href="#" className="ml-2 p-2 text-white">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <Logo
                  logoText="CRYSTAL CLEAN"
                  seo="Crystal Clean Karlovy Vary"
                  className="lg:hidden text-white text-lg md:text-2xl font-rye"
                />

                <div className="flex flex-1 items-center justify-end">
                  <Link
                    href="#"
                    className="hidden text-sm font-medium text-white lg:block"
                  >
                    Vyhledat
                  </Link>

                  <div className="flex items-center lg:ml-8">
                    {/* Help */}
                    <Link href="/info" className="p-2 text-white lg:hidden">
                      <span className="sr-only">Informace</span>
                      <InformationCircleIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                    <Link
                      href="/info"
                      className="hidden text-sm font-medium text-white lg:block"
                    >
                      Informace
                    </Link>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <ShoppingCart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DesktopNavigation;
