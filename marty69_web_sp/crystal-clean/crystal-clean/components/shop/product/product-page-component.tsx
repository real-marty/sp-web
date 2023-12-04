import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import ProductImageGalery from "./product-image-galery";
import { ProductType } from "@/types/product-types";
import Currency from "../products/products-currency";
import { Feature } from "@prisma/client";
import AddToCart from "@/components/shop/cart/add-to-cart-btn";

const policies = [
  {
    name: "Fungujeme v Čechách a na Slovensku",
    icon: GlobeAmericasIcon,
  },
  {
    name: "Doručení zdarma od 1000 Kč",
    icon: CurrencyDollarIcon,
  },
];

export default function ProductPageComponent({
  product,
  features,
}: Readonly<{
  product: ProductType;
  features: Feature[];
}>) {
  return (
    <div>
      <div className="pb-16 pt-3 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-4xl font-medium font-rye text-zinc-50">
                  {product.name}
                </h1>
                <div className="text-2xl font font-medium text-zinc-50">
                  <Currency
                    priceCZK={product.priceCZK}
                    priceEUR={product.priceEUR}
                  />
                </div>
              </div>
              {/* Reviews component here */}
            </div>

            {/* Image gallery */}
            <ProductImageGalery product={product} />

            <div className="mt-8 lg:col-span-5">
              <form>
                {/* Colors picker here */}
                {/* Sizes component here */}

                <AddToCart
                  className="mt-8 flex w-full items-center justify-center
                rounded-md border border-transparent bg-red-600 px-8 py-3
                text-base font-medium text-white hover:bg-red-700
                focus:outline-none focus:ring-1 focus:ring-red-500
                focus:ring-offset-2"
                  product={product}
                >
                  Přidat do košíku
                </AddToCart>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-zinc-50">Popisek</h2>

                <div
                  className="prose prose-sm mt-4 text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div className="mt-8 border-t border-zinc-200 pt-8">
                <h2 className="text-sm font-medium text-zinc-50">
                  Čištění &amp; Péče
                </h2>

                <div className="prose prose-sm mt-4 text-zinc-300">
                  <ul>
                    {features.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Naše zásady
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-zinc-50"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-zinc-50">
                          {policy.name}
                        </span>
                      </dt>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
