import { Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { StockAlertItem as StockAlertItemType } from "../../types/overview.types";

interface StockAlertItemProps {
  alert: StockAlertItemType;
}

export function StockAlertItem({ alert }: StockAlertItemProps) {
  const { t } = useTranslation();
  const getMarketplaceLogo = (marketplaceName: string) => {
    const name = marketplaceName.toLowerCase();
    return `/assets/images/marketplaces/${name}.png`;
  };

  const alertLevel = alert.availableQuantity === 0 ? "critical" : "warning";
  const stockStatus =
    alert.availableQuantity === 0
      ? t("overview.outOfStock")
      : `${alert.availableQuantity} ${t("common.left", "left")}`;

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="relative">
        {alert.imageUrl ? (
          <img
            src={alert.imageUrl}
            alt={alert.name}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
            <Package className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className="font-medium text-gray-900 text-sm truncate"
            title={alert.name}
          >
            {alert.name}
          </h3>
        </div>

        {alert.sellerName && (
          <div
            className="text-xs text-gray-500 mb-1 truncate"
            title={alert.sellerName}
          >
            {t("common.seller", "Seller")}: {alert.sellerName}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-1">
            <img
              src={getMarketplaceLogo(alert.marketplace)}
              alt={alert.marketplace}
              width={55}
              height={55}
            />
            <span className="text-xs text-gray-500 hidden">
              {alert.marketplace}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
