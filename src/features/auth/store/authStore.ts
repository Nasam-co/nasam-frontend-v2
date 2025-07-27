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

  // Actions
  setUser: (user: User | null) => void;
  logout: () => void;
  storeUserData: (user: User) => void;

  // Utilities
  getToken: () => string | null;
  hasToken: () => boolean;
  getUserFromStorage: () => User | null;
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
    (set) => {
      // Get initial user data
      const initialUser = getInitialUserData();

      return {
        user: initialUser,
        isAuthenticated: !!initialUser,
        isLoading: false,

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
      };
    },
    { name: "authStore" }
  )
);
