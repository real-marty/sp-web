import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatterCZ = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
});

export const formatterSK = new Intl.NumberFormat("sk-SK", {
  style: "currency",
  currency: "EUR",
});
