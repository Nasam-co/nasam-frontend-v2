import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "../services/orders";
import { ShipmentStatus, OrderStatusCountsRequest } from "../types";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useSellersStore } from "@/shared/store/sellersStore";
import { useTranslation } from "react-i18next";
import {
  STATUS_COLORS_WITH_HOVER,
} from "../constants/status-colors";

interface StatusFilterBarProps {
  selectedStatus?: ShipmentStatus;
  onStatusChange: (status?: ShipmentStatus) => void;
  filters?: OrderStatusCountsRequest;
}

export default function StatusFilterBar({
  selectedStatus,
  onStatusChange,
  filters = {},
}: StatusFilterBarProps) {
  const { t } = useTranslation();
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
    queryKey: ["orderStatusCounts", statusCountsFilters],
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
    <div className="flex flex-wrap gap-2 p-4 w-fit  bg-white border rounded-lg ">
      {/* All Orders Button */}
      <Button
        variant={!selectedStatus ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange(undefined)}
        className="flex items-center gap-2"
      >
        {t("orders.allOrders")}
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
              : STATUS_COLORS_WITH_HOVER[statusCount.status]
          }`}
        >
          {t(`orders.${statusCount.status.toLowerCase()}`)}
          <span className="px-2 py-1 text-xs bg-white/50 rounded-full">
            {statusCount.count}
          </span>
        </Button>
      ))}
    </div>
  );
}
