import {
  Phone,
  Laptop,
  Headphones,
  ShoppingCart,
  Moon,
  ShoppingBag,
  Package,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { TopPerformerCard, type TopPerformer } from "./TopPerformerCard";
import { ItemsSection } from "../ItemsSection";
import { useDashboardStats } from "../../hooks/useOverview";

const getProductIcon = (index: number) => {
  const icons = [Phone, Laptop, Headphones, Package];
  const IconComponent = icons[index % icons.length];
  return <IconComponent className="w-5 h-5" />;
};

const getSellerIcon = (sellerName: string) => {
  const name = sellerName.toLowerCase();
  if (name.includes("amazon")) return <ShoppingCart className="w-4 h-4" />;
  if (name.includes("noon")) return <Moon className="w-4 h-4" />;
  if (name.includes("trendyol")) return <ShoppingBag className="w-4 h-4" />;
  return <Package className="w-4 h-4" />;
};

const renderTopPerformer = (performer: TopPerformer) => (
  <TopPerformerCard performer={performer} />
);

function TopPerformersHeader() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("this-week");

  const periods = [
    { value: "this-week", label: t("overview.topPerformers.thisWeek") },
    { value: "this-month", label: t("overview.topPerformers.thisMonth") },
  ];

  return (
    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period) => (
          <SelectItem key={period.value} value={period.value}>
            {period.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TopPerformers() {
  const { t } = useTranslation();
  const { data: dashboardData, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
          <div className="h-8 bg-gray-200 animate-pulse rounded w-24" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Transform API data to match component structure
  const topPerformers: TopPerformer[] =
    dashboardData?.topPerformers?.map((item, index) => ({
      id: item.id.toString(),
      name: item.name,
      seller: "Seller", // API doesn't provide seller info in this format yet
      revenue: item.revenue,
      unitsSold: item.orders,
      icon: getProductIcon(index),
      sellerIcon: getSellerIcon("seller"),
      trend: "up" as const, // API doesn't provide trend info yet
    })) || [];

  // Handle empty state
  if (topPerformers.length === 0) {
    return (
      <div className="space-y-4 flex-grow bg-white p-6 shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {t("overview.topPerformers.title")}
          </h3>
          <TopPerformersHeader />
        </div>
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p>
            {t(
              "overview.topPerformers.noData",
              "No top performers data available"
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <ItemsSection
      title={t("overview.topPerformers.title")}
      headerAction={<TopPerformersHeader />}
      items={topPerformers}
      renderItem={renderTopPerformer}
      keyExtractor={(performer: TopPerformer) => performer.id}
    />
  );
}
