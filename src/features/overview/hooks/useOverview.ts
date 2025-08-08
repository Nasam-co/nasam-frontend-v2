import { useQuery } from "@tanstack/react-query";
import { OverviewService } from "@/features/overview/services/overview";
import { useSellersStore } from "@/shared/store/sellersStore";

export const overviewKeys = {
  all: ["overview"] as const,
  stats: (sellerIds?: string[], dateKey?: string) =>
    [
      ...overviewKeys.all,
      "stats",
      sellerIds?.join(",") || "all",
      dateKey || "30days",
    ] as const,
};

export const useDashboardStats = () => {
  const selectedSellerIds = useSellersStore((state) => state.selectedSellerIds);
  const selectedDateRange = useSellersStore((state) => state.selectedDateRange);
  const customDateRange = useSellersStore((state) => state.customDateRange);
  const getDateRangeParams = useSellersStore(
    (state) => state.getDateRangeParams
  );

  const sellerIdsForQuery =
    selectedSellerIds.length > 0 && !selectedSellerIds.includes("all-sellers")
      ? selectedSellerIds
      : undefined;
  const dateRangeParams = getDateRangeParams();

  // Create a unique cache key that considers both tab-based and custom date ranges
  const dateKey = customDateRange
    ? `custom-${customDateRange.startDate}-${customDateRange.endDate}`
    : selectedDateRange;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: overviewKeys.stats(sellerIdsForQuery, dateKey),
    queryFn: () => {
      return OverviewService.getOverview(sellerIdsForQuery, dateRangeParams);
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error, refetch };
};
