"use client";

import { classNames } from "@/components/tooling/classnames";
import { StarIcon } from "@heroicons/react/20/solid";
import { oneProductDetails } from "./data";

const ProductReviews = () => {
  const product = oneProductDetails();

  return (
    <div className="mt-4">
      {/*Reviews */}
      <h2 className="sr-only">Reviews</h2>
      <div className="flex items-center">
        <p className="text-sm text-zinc-300">
          {product.rating}
          <span className="sr-only"> out of 5 stars</span>
        </p>
        <div className="ml-1 flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                product.rating > rating ? "text-yellow-400" : "text-zinc-200",
                "h-5 w-5 flex-shrink-0",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <div aria-hidden="true" className="ml-4 text-sm text-zinc-300">
          ·
        </div>
        <div className="ml-4 flex">
          <a
            href="#"
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            See all {product.reviewCount} reviews
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
