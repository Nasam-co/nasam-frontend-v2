import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "../services/orders";
import { ShipmentStatus, OrderStatusCountsRequest } from "../types";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface StatusFilterBarProps {
  selectedStatus?: ShipmentStatus;
  onStatusChange: (status?: ShipmentStatus) => void;
  filters?: OrderStatusCountsRequest;
}

const STATUS_COLORS: Record<ShipmentStatus, string> = {
  PENDING: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  PROCESSING: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  SHIPPED: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  DELIVERED: "bg-green-100 text-green-800 hover:bg-green-200",
  CANCELLED: "bg-red-100 text-red-800 hover:bg-red-200",
  REFUNDED: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  RETURNED: "bg-orange-100 text-orange-800 hover:bg-orange-200",
};

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped", 
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
  RETURNED: "Returned",
};

export default function StatusFilterBar({ selectedStatus, onStatusChange, filters = {} }: StatusFilterBarProps) {
  const { data: statusCounts, isLoading } = useQuery({
    queryKey: ["orderStatusCounts", filters],
    queryFn: () => OrdersService.getOrderStatusCounts(filters),
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

  const totalCount = statusCounts?.reduce((sum, item) => sum + item.count, 0) || 0;

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
      {statusCounts?.map((statusCount) => (
        <Button
          key={statusCount.status}
          variant={selectedStatus === statusCount.status ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(statusCount.status)}
          className={`flex items-center gap-2 ${
            selectedStatus === statusCount.status ? '' : STATUS_COLORS[statusCount.status]
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