import Image from "next/image";
import NoResults from "./no-result";
import { ProductType } from "@/types/product-types";
import Link from "next/link";
import Currency from "./products-currency";

type Products = {
  items: ProductType[];
};

const ProductList = ({ items }: Products) => {
  if (items?.length === 0) {
    return <NoResults />;
  } else {
    return (
      <section
        aria-labelledby="product-heading"
        className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
      >
        <h2 id="product-heading" className="sr-only">
          Produkty Crystal Clean
        </h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
          {items.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-600 bg-transparent"
            >
              <div className="aspect-h-4 aspect-w-3 bg-zinc-600 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <Image
                  width={400}
                  height={800}
                  src={product.images[0].url}
                  alt={product.name + " " + product.description}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="font-rye font-normal text-xl text-zinc-50">
                  <Link href={`/products/${product.id}`}>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 font-rye"
                    />
                    {product.name}
                  </Link>
                </h3>
                <p className="text-sm text-zinc-400">{product.category.name}</p>
                <Currency
                  priceCZK={product.priceCZK}
                  priceEUR={product.priceEUR}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
};

export default ProductList;
