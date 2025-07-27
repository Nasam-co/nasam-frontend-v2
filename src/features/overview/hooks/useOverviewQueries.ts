import { useQuery } from "@tanstack/react-query";
import { OverviewService } from "@/features/overview/services/overview";

export const overviewKeys = {
  all: ["overview"] as const,
  stats: () => [...overviewKeys.all, "stats"] as const,
};

export const useDashboardStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: overviewKeys.stats(),
    queryFn: OverviewService.getDashboardStats,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
};
