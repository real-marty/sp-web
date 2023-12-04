"use client";

import { RadioGroup } from "@headlessui/react";
import { oneProductDetails } from "./data";
import { classNames } from "@/components/tooling/classnames";
import { useState } from "react";

const ProductSizes = () => {
  const product = oneProductDetails();
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="mt-8">
      {/* Size picker */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-zinc-50">Size</h2>
        <a
          href="#"
          className="text-sm font-medium text-red-600 hover:text-red-500"
        >
          See sizing chart
        </a>
      </div>

      <RadioGroup
        value={selectedSize}
        onChange={setSelectedSize}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {product.sizes.map((size) => (
            <RadioGroup.Option
              key={size.name}
              value={size}
              className={({ active, checked }) =>
                classNames(
                  size.inStock
                    ? "cursor-pointer focus:outline-none"
                    : "cursor-not-allowed opacity-25",
                  active ? "ring-2 ring-red-500 ring-offset-2" : "",
                  checked
                    ? "border-transparent bg-red-600 text-white hover:bg-red-700"
                    : "border-zinc-200 bg-white text-zinc-50 hover:bg-zinc-50",
                  "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1",
                )
              }
              disabled={!size.inStock}
            >
              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ProductSizes;
