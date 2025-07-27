import {
  Phone,
  Laptop,
  Watch,
  Headphones,
  ShoppingCart,
  Moon,
  ShoppingBag,
} from "lucide-react";
import { StockAlertCard, type StockAlert } from "./StockAlertCard";
import { ItemsSection } from "../ItemsSection";

const stockAlerts: StockAlert[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    marketplace: "Amazon",
    stockStatus: "3 left",
    averageSales: 12,
    icon: <Phone className="w-5 h-5" />,
    marketplaceIcon: <ShoppingCart className="w-4 h-4" />,
    alertLevel: "critical",
  },
  {
    id: "2",
    name: "MacBook Air M2",
    marketplace: "Noon",
    stockStatus: "Out of Stock",
    averageSales: 8,
    icon: <Laptop className="w-5 h-5" />,
    marketplaceIcon: <Moon className="w-4 h-4" />,
    alertLevel: "critical",
  },
  {
    id: "3",
    name: "Samsung Watch 6",
    marketplace: "Trendyol",
    stockStatus: "5 left",
    averageSales: 6,
    icon: <Watch className="w-5 h-5" />,
    marketplaceIcon: <ShoppingBag className="w-4 h-4" />,
    alertLevel: "warning",
  },
  {
    id: "4",
    name: "AirPods 3rd Gen",
    marketplace: "Amazon",
    stockStatus: "2 left",
    averageSales: 15,
    icon: <Headphones className="w-5 h-5" />,
    marketplaceIcon: <ShoppingCart className="w-4 h-4" />,
    alertLevel: "critical",
  },
];

const renderStockAlert = (alert: StockAlert) => (
  <StockAlertCard alert={alert} />
);

function StockAlertHeader() {
  return (
    <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
      View All
    </a>
  );
}

export function StockAlerts() {
  return (
    <ItemsSection
      title="Stock Alerts"
      headerAction={<StockAlertHeader />}
      items={stockAlerts}
      renderItem={renderStockAlert}
      keyExtractor={(alert) => alert.id}
    />
  );
}
