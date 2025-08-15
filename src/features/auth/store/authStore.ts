import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "../types";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "@/shared/utils/CookiesHelper";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasInitializedUser: boolean;

  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  storeUserData: (user: User) => void;
  fetchAndStoreUser: () => Promise<void>;
  setHasInitializedUser: (value: boolean) => void;

  // Utilities
  getToken: () => string | null;
  hasToken: () => boolean;
  getUserFromStorage: () => User | null;
  getAllowedSellerIds: () => number[];
}

// Helper function to get initial user data from localStorage
const getInitialUserData = (): User | null => {
  try {
    const userData = getCookie("user-data");
    if (!userData) return null;
    return JSON.parse(userData) as User;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => {
      // Get initial user data
      const initialUser = getInitialUserData();

      return {
        user: initialUser,
        isAuthenticated: !!initialUser,
        isLoading: false,
        hasInitializedUser: false,

        setUser: (user) => {
          set({
            user,
            isAuthenticated: !!user,
          });
        },

        storeUserData: (user: User) => {
          setCookie("user-data", JSON.stringify(user));

          set({
            user,
            isAuthenticated: true,
          });
        },

        logout: () => {
          removeCookie("user-data");

          set({
            user: null,
            isAuthenticated: false,
          });
        },

        getToken: () => {
          try {
            const userData = getCookie("user-data");
            if (!userData) return null;
            const user = JSON.parse(userData);
            return user.accessToken || null;
          } catch {
            return null;
          }
        },

        hasToken: () => {
          try {
            const userData = getCookie("user-data");
            if (!userData) return false;
            const user = JSON.parse(userData);
            return !!user.accessToken;
          } catch {
            return false;
          }
        },

        getUserFromStorage: () => {
          try {
            const userData = getCookie("user-data");
            if (!userData) return null;

            return JSON.parse(userData) as User;
          } catch {
            return null;
          }
        },

        fetchAndStoreUser: async () => {
          // Just use the data from cookies - no API call needed
          const userData = getCookie("user-data");
          if (userData) {
            try {
              const user = JSON.parse(userData) as User;
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
                hasInitializedUser: true,
              });
            } catch (error) {
              console.error("Failed to parse user data from cookies:", error);
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                hasInitializedUser: true,
              });
            }
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              hasInitializedUser: true,
            });
          }
        },

        setHasInitializedUser: (value: boolean) => {
          set({ hasInitializedUser: value });
        },

        getAllowedSellerIds: () => {
          const state = get();
          if (!state.user || !state.user.sellerManagers) {
            return [];
          }
          return state.user.sellerManagers.map(sm => sm.sellerId);
        },
      };
    },
    { name: "authStore" }
  )
);
