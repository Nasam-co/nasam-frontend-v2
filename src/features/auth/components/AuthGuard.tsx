import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const hasToken = useAuthStore((state) => state.hasToken);

  if (!hasToken()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
