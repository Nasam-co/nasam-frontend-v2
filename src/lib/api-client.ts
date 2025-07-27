import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "@/shared/utils/CookiesHelper";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor({
    message,
    status,
    code,
  }: {
    message: string;
    status: number;
    code?: string;
  }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000"),
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  try {
    const userData = getCookie("user-data");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.code === "ECONNABORTED") {
      throw new ApiError({
        message: "Request timeout",
        status: 408,
        code: "TIMEOUT",
      });
    }

    if (error.response) {
      const errorData = error.response.data as {
        message?: string;
        code?: string;
      };

      // Handle 401 Unauthorized
      if (
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const userData = getCookie("user-data");
          if (!userData) {
            throw new Error("No user data available");
          }

          const user = JSON.parse(userData);
          if (!user.refreshToken) {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await axios.post(
            `${apiClient.defaults.baseURL}/v1/auth/refresh`,
            {
              refreshToken: user.refreshToken,
            }
          );

          if (refreshResponse.data.accessToken) {
            const newToken = refreshResponse.data.accessToken;

            // Update user data with new access token
            const updatedUser = { ...user, accessToken: newToken };
            setCookie("user-data", JSON.stringify(updatedUser));

            // Update the authorization header and retry the original request
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          removeCookie("user-data");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      throw new ApiError({
        message: errorData?.message || error.message || "Request failed",
        status: error.response.status,
        code: errorData?.code,
      });
    }

    throw new ApiError({
      message: error.message || "Network error",
      status: 0,
      code: "NETWORK_ERROR",
    });
  }
);

export default apiClient;
