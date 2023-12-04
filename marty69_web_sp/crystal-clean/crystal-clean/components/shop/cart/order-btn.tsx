"use client";

import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { forwardRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import useCurrencyStore from "@/hooks/use-store-currency";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const OrderTheProducts = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    const searchParams = useSearchParams();
    const { currency } = useCurrencyStore();

    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.clearCart);

    const totalPriceCZK = items.reduce((total, item) => {
      return total + parseFloat(item.product.priceCZK) * item.quantity;
    }, 0);

    const totalPriceEUR = items.reduce((total, item) => {
      return total + parseFloat(item.product.priceEUR) * item.quantity;
    }, 0);

    const onCheckout = async () => {
      const response = await axios.post("/api/checkout", {
        productInfo: {
          productIds: items.map((item) => item.product.id),
          quantities: items.map((item) => item.quantity),
        },
        totalPriceCZK,
        totalPriceEUR,
        currency: currency.value,
      });
      window.location = response.data.url;
    };

    useEffect(() => {
      if (searchParams.get("success")) {
        toast.success("Objednávka úspešne odoslaná");
        removeAll();
      }
      if (searchParams.get("canceled")) {
        toast.error("Objednávka zrušená");
      }
    }, [searchParams, removeAll]);

    return (
      <button
        type={type}
        className={cn(className)}
        disabled={disabled}
        onClick={onCheckout}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

OrderTheProducts.displayName = "Button";

export default OrderTheProducts;
