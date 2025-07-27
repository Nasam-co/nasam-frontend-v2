export interface User {
  id: number;
  email: string;
  name?: string;
  role: "Admin" | "User";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
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
