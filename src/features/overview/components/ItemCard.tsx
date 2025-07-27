import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ItemCardProps {
  id?: string;
  name: string;
  marketplace: string;
  icon: React.ReactNode;
  marketplaceIcon: React.ReactNode;
  children?: React.ReactNode;
  showTrend?: boolean;
  trendDirection?: "up" | "down" | "stable";
  className?: string;
}

export function ItemCard({
  name,
  marketplace,
  icon,
  marketplaceIcon,
  children,
  showTrend = false,
  trendDirection = "up",
  className = "",
}: ItemCardProps) {
  const getTrendIcon = () => {
    switch (trendDirection) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "stable":
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg ${className}`}
    >
      {/* Item Icon */}
      <div className="text-gray-600">{icon}</div>

      {/* Item Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900">{name}</h3>
          {showTrend && getTrendIcon()}
          <div className="flex items-center gap-1 text-gray-500">
            {marketplaceIcon}
            <span className="text-sm">{marketplace}</span>
          </div>
        </div>

        {/* Custom content */}
        {children}
      </div>
    </div>
  );
}
