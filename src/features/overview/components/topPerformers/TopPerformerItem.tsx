import { Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TopPerformer } from "../../types/overview.types";
import Riyal from "@/shared/components/common/Riyal";

interface TopPerformerItemProps {
  performer: TopPerformer;
}

export function TopPerformerItem({ performer }: TopPerformerItemProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div>
        <div className="relative">
          {performer.listing.imageUrl ? (
            <img
              src={performer.listing.imageUrl}
              alt={performer.listing.name}
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
              <Package className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className="font-medium text-gray-900 truncate max-w-xs"
            title={performer.listing.name}
          >
            {performer.listing.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-600 truncate">
            {performer.listing.marketplace.name}
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-600 truncate">
            {performer.sellerName}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {t("overview.unitsSoldCount", { count: performer.unitsSold })}
          </div>
          <div className="text-sm font-medium text-green-600 flex items-center gap-2">
            <Riyal />
            <span> {performer.totalRevenue.toFixed(2)}</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
