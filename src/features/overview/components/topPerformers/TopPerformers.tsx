import { useDashboardStats } from "../../hooks/useOverview";
import { TopPerformersHeader } from "./TopPerformersHeader";
import { TopPerformerItem } from "./TopPerformerItem";

export function TopPerformers() {
  const { data: dashboardData, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-4 flex-grow bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-32" />
          <div className="h-8 bg-gray-200 animate-pulse rounded w-24" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Handle empty state - hide component if no data
  if (
    !dashboardData?.topPerformers ||
    dashboardData.topPerformers.length === 0
  ) {
    return null;
  }

  return (
    <div className="space-y-4 flex-grow bg-white p-6 rounded-lg shadow-md">
      <TopPerformersHeader />
      
      <div className="space-y-2">
        {dashboardData.topPerformers.map((performer, index) => (
          <TopPerformerItem 
            key={`${performer.listing.sku}-${index}`} 
            performer={performer} 
          />
        ))}
      </div>
    </div>
  );
}
