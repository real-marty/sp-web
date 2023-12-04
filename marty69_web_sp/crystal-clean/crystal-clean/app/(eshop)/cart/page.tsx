"use client";

import { useEffect, useState } from "react";
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid";
import useCart from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import Currency from "@/components/shop/products/products-currency";
import AddToCart from "@/components/shop/cart/add-to-cart-btn";
import OrderTheProducts from "@/components/shop/cart/order-btn";

const CartPage = () => {
  const cart = useCart();
  const deliveryPriceCZK = 150;
  const deliveryPriceEUR = 8;
  const totalPriceWithTaxCZK = deliveryPriceCZK + cart.getTotalPriceCZK();
  const priceWithoutTaxCZK = totalPriceWithTaxCZK / 1.21;
  const taxAmountCZK = totalPriceWithTaxCZK - priceWithoutTaxCZK;
  const totalPriceWithTaxEUR = deliveryPriceEUR + cart.getTotalPriceEUR();
  const priceWithoutTaxEUR = totalPriceWithTaxEUR / 1.21;
  const taxAmountEUR = totalPriceWithTaxEUR - priceWithoutTaxEUR;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold font-sans tracking-tight text-zinc-50 sm:text-4xl">
          Nákupní košík
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Položky v nákupním košíku Crystal Clean
            </h2>
            <ul className="divide-y divide-zinc-700 border-b border-t border-zinc-700">
              {cart.items.map((product, productIdx) => (
                <li key={product.product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <Image
                      width={500}
                      height={500}
                      src={product.product.images[0].url}
                      alt={
                        "Obrázek pro " +
                        product.product.name +
                        product.product.description
                      }
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-xl font-rye">
                            <Link
                              href={`/products/${product.product.id}`}
                              className="font-medium text-zinc-50 hover:text-zinc-300"
                            >
                              {product.product.name}
                            </Link>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-zinc-100">
                            {product.product.category.name}
                          </p>
                          {product.product.specification ? (
                            <p className="ml-4 border-l border-zinc-500 pl-4 text-zinc-100">
                              {product.product.specification.name}
                            </p>
                          ) : null}
                          {product.product.color ? (
                            <p className="ml-4 border-l border-zinc-500 pl-4 text-zinc-100">
                              {product.product.color.name}
                            </p>
                          ) : null}
                          {product.product.size ? (
                            <p className="ml-4 border-l border-zinc-500 pl-4 text-zinc-100">
                              {product.product.size.name}
                            </p>
                          ) : null}
                        </div>
                        <div className="mt-1 text-sm font-medium text-zinc-50">
                          <Currency
                            priceCZK={
                              Number(product.product.priceCZK) *
                              cart.getItemQuantity(product.product.id)
                            }
                            priceEUR={
                              Number(product.product.priceEUR) *
                              cart.getItemQuantity(product.product.id)
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {cart.getItemQuantity(product.product.id)}
                        </label>
                        <div className="max-w-full  rounded-md py-1.5 text-left text-base font-medium leading-5 sm:text-sm mt-1 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              cart.removeFromCart(product.product.id)
                            }
                            className="font-medium text-zinc-50 hover:text-zinc-300"
                          >
                            <span className="sr-only">Remove</span>
                            <MinusCircleIcon className="h-6 w-6" />
                          </button>
                          <p className="text-zinc-100">
                            {cart.getItemQuantity(product.product.id)}
                          </p>
                          <AddToCart
                            product={product.product}
                            className="font-medium text-zinc-50 hover:text-zinc-300"
                          >
                            <span className="sr-only">Remove</span>
                            <PlusCircleIcon className="h-6 w-6" />
                          </AddToCart>
                        </div>
                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            onClick={() => cart.removeItem(product.product.id)}
                            className="-m-2 inline-flex p-2 text-zinc-400 hover:text-zinc-500"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-zinc-900 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-zinc-50"
            >
              Přehled objednávky
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-zinc-200">Mezisoučet</dt>
                <dd className="text-sm font-medium text-zinc-50">
                  <Currency
                    priceCZK={cart.getTotalPriceCZK()}
                    priceEUR={cart.getTotalPriceEUR()}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
                <dt className="flex items-center text-sm text-zinc-200">
                  <span>Cena za dopravu</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-zinc-400 hover:text-zinc-500"
                  >
                    <span className="sr-only">
                      Více informací o ceně dopravy
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-sm font-medium text-zinc-50">
                  <Currency
                    priceCZK={deliveryPriceCZK}
                    priceEUR={deliveryPriceEUR}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
                <dt className="flex text-sm text-zinc-200">
                  <span>bez DPH</span>
                  <a
                    href="#"
                    className="ml-2 flex-shrink-0 text-zinc-400 hover:text-zinc-500"
                  >
                    <span className="sr-only">
                      Zjistěte více o způsobu výpočtu daně
                    </span>
                    <QuestionMarkCircleIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </a>
                </dt>
                <dd className="text-xs font-medium text-zinc-50 flex gap-2 text-center items-center">
                  <Currency
                    priceCZK={priceWithoutTaxCZK}
                    priceEUR={priceWithoutTaxEUR}
                  />
                  +
                  <Currency priceCZK={taxAmountCZK} priceEUR={taxAmountEUR} />
                  DPH{" "}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
                <dt className="text-base font-medium text-zinc-50">
                  Cena celkem
                </dt>
                <dd className="text-base font-medium text-zinc-50">
                  {" "}
                  <Currency
                    priceCZK={totalPriceWithTaxCZK}
                    priceEUR={totalPriceWithTaxEUR}
                  />
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <OrderTheProducts
                type="button"
                className="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50"
              >
                Koupit
              </OrderTheProducts>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
