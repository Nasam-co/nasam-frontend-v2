import React from "react";
import StatsGrid from "../components/cards/StatsGrid";
import { LineRevenueChart } from "../components/LineRevenueChart";
import { StockAlerts } from "../components/stockAlert/StockAlerts";
import { TopPerformers } from "../components/topPerformers/TopPerformers";
import { useAuthStore } from "@/features/auth/store/authStore";

export const OverviewPage: React.FC = () => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <div className="space-y-8 flex flex-col p-6 max-w-7xl">
      <StatsGrid />
      <LineRevenueChart />
      <div className="flex flex-grow gap-4">
        <StockAlerts />
        <TopPerformers />
      </div>
    </div>
  );
};
