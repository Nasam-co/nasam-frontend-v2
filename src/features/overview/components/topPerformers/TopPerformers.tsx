import {
  Phone,
  Laptop,
  Headphones,
  ShoppingCart,
  Moon,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
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
  return (
    <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
      This Week
      <ChevronDown className="w-4 h-4" />
    </button>
  );
}

export function TopPerformers() {
  return (
    <ItemsSection
      title="Top Performers"
      headerAction={<TopPerformersHeader />}
      items={topPerformers}
      renderItem={renderTopPerformer}
      keyExtractor={(performer: TopPerformer) => performer.id}
    />
  );
}
