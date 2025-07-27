import { DollarSign, Package, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatCard } from "./StatCard";

export default function StatsGrid() {
  const { t } = useTranslation();

  const statsData = [
    {
      title: t("overview.todayRevenue"),
      value: "$12,345",
      description: t("overview.revenueChange"),
      icon: DollarSign,
    },
    {
      title: t("overview.orders"),
      value: t("overview.pendingOrders", { count: 8 }),
      description: t("overview.readyToShip", { count: 16 }),
      icon: ShoppingCart,
    },
    {
      title: t("overview.activeProducts"),
      value: "156",
      description: t("overview.acrossMarketplaces", { count: 3 }),
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
