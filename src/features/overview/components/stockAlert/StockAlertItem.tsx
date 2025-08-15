import { ShoppingCart, Moon, ShoppingBag, Package } from "lucide-react";
import type { StockAlertItem as StockAlertItemType } from "../../types/overview.types";

interface StockAlertItemProps {
  alert: StockAlertItemType;
}

export function StockAlertItem({ alert }: StockAlertItemProps) {
  const getMarketplaceIcon = (marketplaceName: string) => {
    const name = marketplaceName.toLowerCase();
    if (name.includes("amazon")) return <ShoppingCart className="w-4 h-4" />;
    if (name.includes("noon")) return <Moon className="w-4 h-4" />;
    if (name.includes("trendyol")) return <ShoppingBag className="w-4 h-4" />;
    return <Package className="w-4 h-4" />;
  };

  const alertLevel = alert.availableQuantity === 0 ? "critical" : "warning";
  const stockStatus =
    alert.availableQuantity === 0
      ? "Out of Stock"
      : `${alert.availableQuantity} left`;

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div>
        <img
          src={alert.imageUrl || `https://placehold.co/100x100`}
          alt={alert.name}
          className="w-12 h-12 object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900">{alert.name}</h3>
          <div className="flex items-center gap-1 text-gray-500">
            {getMarketplaceIcon(alert.marketplace)}
            <span className="text-sm">{alert.marketplace}</span>
          </div>
        </div>

        <div className="flex items-center max-w-xs gap-2">
          <span
            className={`text-sm font-medium ${
              alertLevel === "critical" ? "text-red-600" : "text-orange-600"
            }`}
          >
            {stockStatus}
          </span>
          <div
            className={`w-2 h-2 rounded-full ${
              alertLevel === "critical" ? "bg-red-500" : "bg-orange-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
