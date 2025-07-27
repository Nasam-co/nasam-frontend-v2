import apiClient from "@/lib/api-client";
import type { User, LoginCredentials } from "../types";
import { getCookie, setCookie } from "@/shared/utils/CookiesHelper";

export type { LoginCredentials } from "../types";

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiClient.post<User>("/v1/auth/sign-in", {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  }

  static async refreshToken(): Promise<void> {
    try {
      const userData = getCookie("user-data");
      if (!userData) {
        throw new Error("No user data available");
      }

      const user = JSON.parse(userData);
      if (!user.refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post<{
        accessToken: string;
      }>("/v1/auth/refresh", {
        refreshToken: user.refreshToken,
      });

      const newToken = response.data.accessToken;

      const updatedUser = { ...user, accessToken: newToken };
      setCookie("user-data", JSON.stringify(updatedUser));
    } catch {
      throw new Error("Failed to refresh token");
    }
  }
}
