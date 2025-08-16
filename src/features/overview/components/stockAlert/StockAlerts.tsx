import { useDashboardStats } from "../../hooks/useOverview";
import { StockAlertsHeader } from "./StockAlertsHeader";
import { StockAlertItem } from "./StockAlertItem";
import { useTranslation } from "react-i18next";

export function StockAlerts() {
  const { data: dashboardData, isLoading } = useDashboardStats();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="space-y-4 flex-grow bg-white p-6 rounded-lg shadow-md">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Show empty state if no stock alerts data
  if (
    !dashboardData?.stockAlerts?.listing ||
    dashboardData.stockAlerts.listing.length === 0
  ) {
    return (
      <div className="space-y-4 flex-grow bg-white p-6 rounded-lg shadow-md">
        <StockAlertsHeader 
          totalLowStock={0}
          totalOutOfStock={0}
        />
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t("overview.allProductsStocked")}</h3>
          <p className="text-gray-500">{t("overview.noLowStockItems")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 flex-grow bg-white p-6 rounded-lg shadow-md">
      <StockAlertsHeader 
        totalLowStock={dashboardData?.stockAlerts?.totalLowStock || 0}
        totalOutOfStock={dashboardData?.stockAlerts?.totalOutOfStock || 0}
      />

      <div className="space-y-2">
        {dashboardData.stockAlerts.listing.map((alert, index) => (
          <StockAlertItem 
            key={`${alert.name}-${index}`} 
            alert={alert} 
          />
        ))}
      </div>
    </div>
  );
}
