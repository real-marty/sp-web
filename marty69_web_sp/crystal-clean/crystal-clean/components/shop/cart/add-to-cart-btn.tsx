"use client";

import useCart from "@/hooks/use-cart";
import { ProductType } from "@/types/product-types";
import { MouseEventHandler, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly product: ProductType;
}

const AddToCart = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, product, disabled, type = "button", ...props },
    ref,
  ) => {
    const cart = useCart();

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation();
      cart.addToCart(product);
    };

    return (
      <button
        type={type}
        className={cn(className)}
        disabled={disabled}
        onClick={onAddToCart}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

AddToCart.displayName = "Button";

export default AddToCart;
