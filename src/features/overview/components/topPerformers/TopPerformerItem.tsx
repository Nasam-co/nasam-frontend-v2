import type { TopPerformer } from "../../types/overview.types";

interface TopPerformerItemProps {
  performer: TopPerformer;
}

export function TopPerformerItem({ performer }: TopPerformerItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div>
        <img
          src={`https://via.placeholder.com/100x100?text=${encodeURIComponent(
            performer.listing.sku.charAt(0)
          )}`}
          alt={performer.listing.sku}
          className="w-12 h-12 object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900">SKU: {performer.listing.sku}</h3>
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-500">{performer.unitsSold} units sold</div>
        </div>
      </div>
    </div>
  );
}
