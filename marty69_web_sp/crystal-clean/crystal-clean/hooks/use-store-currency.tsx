import { create } from "zustand";

interface CurrencyState {
  currency: { value: string; label: string };
  setCurrency: (currency: { value: string; label: string }) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: { value: "CZK", label: "CZK" }, // default value
  setCurrency: (currency) => set({ currency }),
}));

export default useCurrencyStore;
