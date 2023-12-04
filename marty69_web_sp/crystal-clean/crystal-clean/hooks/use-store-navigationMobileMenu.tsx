import { create } from "zustand";

interface UseStoreNavigationMobileMenuStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const UseStoreNavigationMobileMenu =
  create<UseStoreNavigationMobileMenuStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
