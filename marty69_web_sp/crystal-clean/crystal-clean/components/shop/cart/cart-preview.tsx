"use client";

import { Fragment, useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import useCart from "@/hooks/use-cart";
import Link from "next/link";
import Image from "next/image";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import AddToCart from "./add-to-cart-btn";
import Currency from "../products/products-currency";
import OrderTheProducts from "./order-btn";

export default function ShoppingCartPreview() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  const products = cart.items.slice(0, 2);

  if (!isMounted) {
    return null;
  }

  return (
    <Popover className="flow-root text-sm lg:relative">
      <Popover.Button className="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-300"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-200 group-hover:text-gray-300">
          {cart.getTotalQuantity()}
        </span>
        <span className="sr-only">položky v košíku, zobrazit nákup</span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-zinc-900 pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
          <h2 className="sr-only">Nákupní košík</h2>

          {cart.getTotalQuantity() > 0 ? (
            <div className="mx-auto max-w-2xl px-4">
              <ul className="divide-y divide-zinc-500">
                {products.map((product) => (
                  <li
                    key={product.product.id}
                    className="flex items-center py-6"
                  >
                    <Image
                      width={64}
                      height={64}
                      src={product.product.images[0].url}
                      alt={
                        product.product.name +
                        " obrázek " +
                        product.product.description
                      }
                      className="h-16 w-16 flex-none object-contain rounded-md border border-gray-200"
                    />
                    <div className="ml-4 flex-auto">
                      <h3 className="font-medium text-zinc-50">
                        <Link href={`/products/${product.product.id}`}>
                          <Popover.Button aria-hidden="true">
                            {product.product.name}
                          </Popover.Button>
                        </Link>
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            cart.removeFromCart(product.product.id)
                          }
                        >
                          <span className="sr-only">
                            Odebrat množství {" " + product.product.name}
                          </span>
                          <MinusCircleIcon className="h-5 w-5 text-zinc-100 hover:text-zinc-50" />
                        </button>
                        <p className="text-zinc-200">
                          {"- " +
                            cart.getItemQuantity(product.product.id) +
                            " -"}
                        </p>
                        <AddToCart product={product.product}>
                          <span className="sr-only">
                            Přidat množství {" " + product.product.name}
                          </span>
                          <PlusCircleIcon className="h-5 w-5 text-zinc-100 hover:text-zinc-50" />
                        </AddToCart>
                      </div>
                    </div>
                  </li>
                ))}
                {cart.getTotalQuantity() > 2 && (
                  <li>
                    <Link href="/cart">
                      <Popover.Button
                        className="text-red-500 font-semibold py-2 justify-center flex items-center w-full"
                        aria-hidden="true"
                      >
                        Zobrazit všechny položky v košíku
                      </Popover.Button>
                    </Link>
                  </li>
                )}
                {cart.getTotalQuantity() > 0 && (
                  <li className=" text-zinc-100 hover:text-zinc-50 flex py-2">
                    <div className="flex gap-2">
                      Cena:{" "}
                      <Currency
                        priceCZK={cart.getTotalPriceCZK()}
                        priceEUR={cart.getTotalPriceEUR()}
                      />
                    </div>
                  </li>
                )}
              </ul>

              <OrderTheProducts
                type="button"
                className="w-full rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Koupit
              </OrderTheProducts>

              <p className="mt-6 text-center">
                <Link
                  href="/cart"
                  className="text-sm font-bold text-red-600 hover:text-red-700"
                >
                  <Popover.Button aria-hidden="true" />
                  Zobrazit nákupní košík
                </Link>
              </p>
            </div>
          ) : (
            <div className=" px-4 mx-4">
              <p className=" pt-5 text-center font-semibold text-zinc-200">
                Váš nákupní košík je prázdný.
              </p>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
