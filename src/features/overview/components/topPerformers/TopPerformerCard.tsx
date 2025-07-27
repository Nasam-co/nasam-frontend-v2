import { ItemCard } from "../ItemCard";

export interface TopPerformer {
  id: string;
  name: string;
  seller: string;
  revenue: number;
  unitsSold: number;
  icon: React.ReactNode;
  sellerIcon: React.ReactNode;
  trend: "up" | "down" | "stable";
}

interface TopPerformerCardProps {
  performer: TopPerformer;
}

export function TopPerformerCard({ performer }: TopPerformerCardProps) {
  return (
    <ItemCard
      name={performer.name}
      marketplace={performer.seller}
      icon={performer.icon}
      marketplaceIcon={performer.sellerIcon}
      showTrend={true}
      trendDirection={performer.trend}
    >
      <div className="text-right">
        <div className="font-semibold text-gray-900">
          {performer.revenue.toLocaleString()} SAR
        </div>
        <div className="text-sm text-gray-500">{performer.unitsSold} units</div>
      </div>
    </ItemCard>
  );
}
