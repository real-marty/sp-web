import { create } from "zustand";

interface UseStoreFiltersMenuStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useStoreFiltersMenu = create<UseStoreFiltersMenuStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
