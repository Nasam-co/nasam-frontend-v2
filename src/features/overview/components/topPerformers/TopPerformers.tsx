import {
  Phone,
  Laptop,
  Headphones,
  ShoppingCart,
  Moon,
  ShoppingBag,
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

const topPerformers: TopPerformer[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    seller: "Amazon",
    revenue: 67500,
    unitsSold: 45,
    icon: <Phone className="w-5 h-5" />,
    sellerIcon: <ShoppingCart className="w-4 h-4" />,
    trend: "up",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    seller: "Noon",
    revenue: 44800,
    unitsSold: 32,
    icon: <Phone className="w-5 h-5" />,
    sellerIcon: <Moon className="w-4 h-4" />,
    trend: "up",
  },
  {
    id: "3",
    name: "MacBook Pro M3",
    seller: "Amazon",
    revenue: 43200,
    unitsSold: 18,
    icon: <Laptop className="w-5 h-5" />,
    sellerIcon: <ShoppingCart className="w-4 h-4" />,
    trend: "up",
  },
  {
    id: "4",
    name: "AirPods Pro 2",
    seller: "Trendyol",
    revenue: 26700,
    unitsSold: 89,
    icon: <Headphones className="w-5 h-5" />,
    sellerIcon: <ShoppingBag className="w-4 h-4" />,
    trend: "up",
  },
];

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
