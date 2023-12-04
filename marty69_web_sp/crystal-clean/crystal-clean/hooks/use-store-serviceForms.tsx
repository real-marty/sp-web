import { create } from "zustand";

interface UseStoreServiceForm {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useStoreServiceForm = create<UseStoreServiceForm>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
