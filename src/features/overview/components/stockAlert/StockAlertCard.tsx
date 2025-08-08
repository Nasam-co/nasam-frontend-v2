import { ItemCard } from "../ItemCard";

export interface StockAlert {
  id: string;
  name: string;
  marketplace: string;
  stockStatus: string;
  averageSales: number;
  icon: React.ReactNode;
  marketplaceIcon: React.ReactNode;
  alertLevel: "critical" | "warning";
}

interface StockAlertCardProps {
  alert: StockAlert;
}

export function StockAlertCard({ alert }: StockAlertCardProps) {
  return (
    <ItemCard
      name={alert.name}
      marketplace={alert.marketplace}
      icon={alert.icon}
      marketplaceIcon={alert.marketplaceIcon}
    >
      <div className="flex items-center max-w-xs gap-2">
        <span
          className={`text-sm font-medium ${
            alert.alertLevel === "critical" ? "text-red-600" : "text-orange-600"
          }`}
        >
          {alert.stockStatus}
        </span>
        <div
          className={`w-2 h-2 rounded-full ${
            alert.alertLevel === "critical" ? "bg-red-500" : "bg-orange-500"
          }`}
        />
        <span className="text-sm text-gray-500">
          {alert.averageSales}/day avg
        </span>
      </div>
    </ItemCard>
  );
}
