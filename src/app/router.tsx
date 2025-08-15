import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { MainLayout } from "@/shared/components/layout/MainLayout";
import { OverviewPage } from "@/features/overview/pages/OverviewPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import ProductsPage from "@/products-page";
import MarketplaceAccountsPage from "@/marketplace-accounts-updated";

import ProductsPage from "@/products-page";
import MarketplaceAccountsPage from "@/marketplace-accounts-updated";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        {/* Default redirect to overview */}
        <Route index element={<Navigate to="/overview" replace />} />

        {/* Overview page */}
        <Route path="overview" element={<OverviewPage />} />

        {/* Orders page */}
        <Route path="orders" element={<OrdersPage />} />

        {/* Products page */}
        <Route path="products" element={<ProductsPage />} />

        {/* Marketplace Accounts page */}
        <Route
          path="marketplace-accounts"
          element={<MarketplaceAccountsPage />}
        />

      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
