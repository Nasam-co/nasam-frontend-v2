export interface SellerManager {
  id: number;
  userId: number;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  role: "Admin" | "User";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userID: number;
  refreshToken: string;
  accessToken: string;
  sellerManagers: SellerManager[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface RefreshTokenResponse {
  token: string;
  expiresIn: number;
}
