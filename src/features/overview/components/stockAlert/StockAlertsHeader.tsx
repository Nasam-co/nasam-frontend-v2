import { useTranslation } from "react-i18next";

interface StockAlertsHeaderProps {
  totalLowStock: number;
  totalOutOfStock: number;
}

export function StockAlertsHeader({ totalLowStock, totalOutOfStock }: StockAlertsHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">
        {`${t("overview.stockAlerts")} (${totalLowStock} low, ${totalOutOfStock} out)`}
      </h3>
      <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
        {t("overview.viewAll")}
      </a>
    </div>
  );
}