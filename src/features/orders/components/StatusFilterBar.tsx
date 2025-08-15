import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "../services/orders";
import { ShipmentStatus, OrderStatusCountsRequest } from "../types";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useSellersStore } from "@/shared/store/sellersStore";

interface StatusFilterBarProps {
  selectedStatus?: ShipmentStatus;
  onStatusChange: (status?: ShipmentStatus) => void;
  filters?: OrderStatusCountsRequest;
}

const STATUS_COLORS: Record<ShipmentStatus, string> = {
  Created: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  Packed: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  Shipped: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  Delivered: "bg-green-100 text-green-800 hover:bg-green-200",
  Cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
  Returned: "bg-orange-100 text-orange-800 hover:bg-orange-200",
};

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  Created: "Created",
  Packed: "Packed",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
  Returned: "Returned",
};

export default function StatusFilterBar({
  selectedStatus,
  onStatusChange,
  filters = {},
}: StatusFilterBarProps) {
  const getSelectedSellerIds = useSellersStore(
    (state) => state.getSelectedSellerIds
  );

  // Create filters object that includes seller IDs
  const statusCountsFilters = {
    ...filters,
    sellerIds: (() => {
      const actualSellerIds = getSelectedSellerIds();
      return actualSellerIds.includes("all-sellers")
        ? undefined
        : actualSellerIds.map(Number);
    })(),
  };

  const { data: statusCounts, isLoading } = useQuery({
    queryKey: ["orderStatusCounts"],
    queryFn: () => OrdersService.getOrderStatusCounts(),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="flex gap-2 p-4 bg-white border rounded-lg">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-24" />
        ))}
      </div>
    );
  }

  const totalCount =
    statusCounts?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white border rounded-lg">
      {/* All Orders Button */}
      <Button
        variant={!selectedStatus ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange(undefined)}
        className="flex items-center gap-2"
      >
        All Orders
        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
          {totalCount}
        </span>
      </Button>

      {/* Status Filter Buttons */}
      {statusCounts?.map((statusCount, index) => (
        <Button
          key={`${statusCount.status}-${index}`}
          variant={
            selectedStatus === statusCount.status ? "default" : "outline"
          }
          size="sm"
          onClick={() => onStatusChange(statusCount.status)}
          className={`flex items-center gap-2 ${
            selectedStatus === statusCount.status
              ? ""
              : STATUS_COLORS[statusCount.status]
          }`}
        >
          {STATUS_LABELS[statusCount.status]}
          <span className="px-2 py-1 text-xs bg-white/50 rounded-full">
            {statusCount.count}
          </span>
        </Button>
      ))}
    </div>
  );
}
