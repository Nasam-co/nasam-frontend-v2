import React from "react";
import StatsGrid from "../components/cards/StatsGrid";
import { LineRevenueChart } from "../components/LineRevenueChart";
import { StockAlerts } from "../components/stockAlert/StockAlerts";
import { TopPerformers } from "../components/topPerformers/TopPerformers";
import { DateRangeTabs } from "../components/DateRangeTabs";
import { DateWithRange } from "../components/DateWithRange";

export const OverviewPage: React.FC = () => {
  return (
    <div className="space-y-8 flex flex-col p-6 max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="flex items-center gap-2">
          <DateWithRange /> <DateRangeTabs />
        </div>
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
