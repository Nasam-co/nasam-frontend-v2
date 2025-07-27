import { DollarSign, Package, ShoppingCart } from "lucide-react";
import { StatCard } from "./StatCard";

const statsData = [
  {
    title: "Today Revenue",
    value: "$12,345",
    description: "+12.5% from yesterday",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "8 Pending",
    description: "16 Ready to ship",
    icon: ShoppingCart,
  },
  {
    title: "Active Products",
    value: "156",
    description: "Across 3 marketplaces",
    icon: Package,
  },
];

export default function StatsGrid() {
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
