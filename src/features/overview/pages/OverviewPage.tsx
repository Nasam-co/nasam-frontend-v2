import React from "react";
import StatsGrid from "../components/cards/StatsGrid";
import { LineRevenueChart } from "../components/LineRevenueChart";
import { StockAlerts } from "../components/stockAlert/StockAlerts";
import { TopPerformers } from "../components/topPerformers/TopPerformers";
import { useTranslation } from "react-i18next";

export const OverviewPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8 flex flex-col p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("navigation.overview")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("overview.description")}
        </p>
      </div>
      
      <StatsGrid />
      <LineRevenueChart />
      <div className="flex flex-grow gap-4">
        <StockAlerts />
        <TopPerformers />
      </div>
    </div>
  );
};
