"use client";

import { classNames } from "@/components/tooling/classnames";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { ImageType, ProductType } from "@/types/product-types";

type Props = {
  readonly product: ProductType;
};

const ProductImageGalery = ({ product }: Props) => {
  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Images</h2>

      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Image selector */}
        <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {product.images.map((image) => (
              <ProductGalleryTab
                key={image.id}
                image={image}
                product={product}
              />
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="aspect-h-1 aspect-w-1 w-full h-full">
          {product.images.map((image) => (
            <Tab.Panel key={image.id}>
              <Image
                width={1920}
                height={1080}
                src={image.url}
                alt={product.name + " " + product.description}
                className="h-full w-full object-scale-down object-center sm:rounded-lg"
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProductImageGalery;

type ImageProps = {
  image: ImageType;
  product: ProductType;
};

const ProductGalleryTab = ({ image, product }: ImageProps) => {
  return (
    <Tab className="relative flex aspect-1 cursor-pointer items-center justify-center rounded-md bg-zinc-900 text-sm font-medium uppercase text-zinc-900 hover:bg-zinc-700 focus:outline-none focus:ring focus:ring-red-900 focus:ring-opacity-50 focus:ring-offset-4">
      {({ selected }) => (
        <>
          <span className="sr-only">{product.name + product.description}</span>
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <Image
              width={1080}
              height={1080}
              src={image.url}
              alt={product.name + " " + product.description}
              className="h-full w-full object-contain object-center"
            />
          </span>
          <span
            className={classNames(
              selected ? "ring-red-500" : "ring-transparent",
              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
            )}
            aria-hidden="true"
          />
        </>
      )}
    </Tab>
  );
};
