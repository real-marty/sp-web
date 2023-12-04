import { create } from "zustand";

interface UseStoreAdminMenuStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useStoreAdminMenu = create<UseStoreAdminMenuStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
