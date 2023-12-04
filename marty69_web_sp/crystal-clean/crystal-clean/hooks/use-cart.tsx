import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "@/types/product-types";

export type CartItemType = {
  product: ProductType;
  quantity: number;
};

interface CartStore {
  items: CartItemType[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: string) => void;
  removeItem: (id: string) => void;
  getTotalQuantity: () => number;
  getItemQuantity: (id: string) => number;
  clearCart: () => void;
  logCart: () => void;
  getTotalPriceCZK: () => number;
  getTotalPriceEUR: () => number;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addToCart: (product: ProductType) => {
        const currentItems = get().items;
        const existingProductIndex = currentItems.findIndex(
          (item) => item.product.id === product.id,
        );

        if (existingProductIndex !== -1) {
          const updatedItems = currentItems.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...currentItems, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (id: string) => {
        const currentItems = get().items;
        const existingProductIndex = currentItems.findIndex(
          (item) => item.product.id === id,
        );

        if (existingProductIndex !== -1) {
          const updatedItems = currentItems
            .map((item, index) =>
              index === existingProductIndex
                ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                : item,
            )
            .filter((item) => item.quantity > 0); // Remove item if quantity is 0
          set({ items: updatedItems });
        }
      },
      getTotalPriceCZK: () => {
        const currentItems = get().items;
        return currentItems.reduce((total, item) => {
          return total + parseFloat(item.product.priceCZK) * item.quantity;
        }, 0);
      },
      getTotalPriceEUR: () => {
        const currentItems = get().items;
        return currentItems.reduce((total, item) => {
          return total + parseFloat(item.product.priceEUR) * item.quantity;
        }, 0);
      },
      getItemQuantity: (id: string) => {
        const currentItems = get().items;
        const item = currentItems.find((item) => item.product.id === id);
        return item ? item.quantity : 0;
      },
      getTotalQuantity: () => {
        const currentItems = get().items;
        return currentItems.reduce((total, item) => total + item.quantity, 0);
      },
      removeItem: (id: string) => {
        const currentItems = get().items;
        const filteredItems = currentItems.filter(
          (item) => item.product.id !== id,
        );
        set({ items: filteredItems });
      },
      clearCart: () => set({ items: [] }),
      logCart: () => console.log(get().items),
    }),
    {
      name: "crystal-clean-cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
