import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface GlobalState {
  isLoading: boolean;
  theme: "light" | "dark" | "system";

  setLoading: (loading: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      isLoading: false,
      theme: "system",

      setLoading: (isLoading) => set({ isLoading }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "globalStore" }
  )
);
