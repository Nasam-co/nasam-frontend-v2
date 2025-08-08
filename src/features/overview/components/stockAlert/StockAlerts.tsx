import {
  Phone,
  Laptop,
  Watch,
  Headphones,
  ShoppingCart,
  Moon,
  ShoppingBag,
  Package,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { StockAlertCard, type StockAlert } from "./StockAlertCard";
import { ItemsSection } from "../ItemsSection";
import { useDashboardStats } from "../../hooks/useOverview";

const getProductIcon = (index: number) => {
  const icons = [Phone, Laptop, Watch, Headphones, Package];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className="w-5 h-5" />;
};

const getMarketplaceIcon = (marketplaceName: string) => {
  const name = marketplaceName.toLowerCase();
  if (name.includes("amazon")) return <ShoppingCart className="w-4 h-4" />;
  if (name.includes("noon")) return <Moon className="w-4 h-4" />;
  if (name.includes("trendyol")) return <ShoppingBag className="w-4 h-4" />;
  return <Package className="w-4 h-4" />;
};

const renderStockAlert = (alert: StockAlert) => (
  <StockAlertCard alert={alert} />
);

function StockAlertHeader() {
  const { t } = useTranslation();
  return (
    <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
      {t("overview.viewAll")}
    </a>
  );
}

export function StockAlerts() {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  const stockAlerts: StockAlert[] =
    dashboardData?.stockAlerts?.listing?.map((item, index) => ({
      id: `${item.name}-${index}`,
      name: item.name,
      marketplace: item.marketplace,
      stockStatus:
        item.availableQuantity === 0
          ? "Out of Stock"
          : `${item.availableQuantity} left`,
      averageSales: Math.floor(Math.random() * 20) + 1, // API doesn't provide this yet
      icon: getProductIcon(index),
      marketplaceIcon: getMarketplaceIcon(item.marketplace),
      alertLevel:
        item.availableQuantity === 0
          ? ("critical" as const)
          : ("warning" as const),
    })) || [];

  return (
    <ItemsSection
      title={`${t("overview.stockAlerts")} (${
        dashboardData?.stockAlerts?.totalLowStock || 0
      } low, ${dashboardData?.stockAlerts?.totalOutOfStock || 0} out)`}
      headerAction={<StockAlertHeader />}
      items={stockAlerts}
      renderItem={renderStockAlert}
      keyExtractor={(alert) => alert.id}
    />
  );
}
