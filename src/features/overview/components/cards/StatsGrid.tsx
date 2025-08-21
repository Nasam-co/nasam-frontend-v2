import { DollarSign, Package, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatCard } from "./StatCard";
import { useDashboardStats } from "../../hooks/useOverview";
import Riyal from "@/shared/components/common/Riyal";
import { cn } from "@/shared/utils";
import { useLanguage } from "@/shared/hooks/useLanguage";

export default function StatsGrid() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { data, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    console.error("Dashboard stats error:", error);
  }

  const statsData = [
    {
      title: t("overview.todayRevenue"),
      value: data?.todaysRevenue ? (
        <div
          className={cn(
            "flex gap-2",
            isRTL ? "flex-row justify-end" : "flex-row-reverse justify-end"
          )}
        >
          <Riyal width={20} />
          <span>{data.todaysRevenue.toLocaleString()}</span>
        </div>
      ) : (
        <div>
          {" "}
          <span>0</span>
          <Riyal />
        </div>
      ),
      description: data?.increaseFromYesterday
        ? `${data.increaseFromYesterday > 0 ? "+" : ""}${
            data.increaseFromYesterday
          }% ${t("overview.fromYesterday")}`
        : t("overview.revenueChange"),
      icon: DollarSign,
    },
    {
      title: t("overview.orders"),
      value: t("overview.pendingOrders", {
        count: data?.pendingOrdersCount || 0,
      }),
      description: t("overview.readyToShip", {
        count: data?.pendingOrdersCount || 0,
      }),
      icon: ShoppingCart,
    },
    {
      title: t("overview.activeProducts"),
      value: data?.activeProducts?.toString() || "0",
      description: t("overview.acrossMarketplaces", {
        count: data?.marketplaces?.length || 0,
      }),
      icon: Package,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
