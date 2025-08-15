import { useDashboardStats } from "../../hooks/useOverview";
import { StockAlertsHeader } from "./StockAlertsHeader";
import { StockAlertItem } from "./StockAlertItem";

export function StockAlerts() {
  const { data: dashboardData, isLoading } = useDashboardStats();

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

  // Hide component if no stock alerts data
  if (
    !dashboardData?.stockAlerts?.listing ||
    dashboardData.stockAlerts.listing.length === 0
  ) {
    return null;
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
