import { DataTable } from "@/shared/components/ui/data-table";
import { ordersColumns } from "../components/columns";
import { useOrdersTableData } from "../hooks/useOrders";
import { OrdersOverviewRequest } from "../types";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL or use defaults
  const getPageFromUrl = () => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  };

  const getLimitFromUrl = () => {
    const limitParam = searchParams.get("limit");
    return limitParam ? parseInt(limitParam, 10) : 10;
  };

  const [params, setParams] = useState<OrdersOverviewRequest>({
    page: getPageFromUrl(),
    limit: getLimitFromUrl(),
  });

  useEffect(() => {
    setParams({
      page: getPageFromUrl(),
      limit: getLimitFromUrl(),
    });
  }, [searchParams]);

  const {
    data,
    isLoading,
    error,
    page,
    limit,
    hasNextPage,
    prefetchNextPage,
    prefetchPreviousPage,
  } = useOrdersTableData(params);

  const updateUrlParams = (newParams: Partial<OrdersOverviewRequest>) => {
    const updatedParams = { ...params, ...newParams };
    const newSearchParams = new URLSearchParams(searchParams);

    // Only set non-default values in URL
    if (updatedParams.page && updatedParams.page !== 1) {
      newSearchParams.set("page", updatedParams.page.toString());
    } else {
      newSearchParams.delete("page");
    }

    if (updatedParams.limit && updatedParams.limit !== 10) {
      newSearchParams.set("limit", updatedParams.limit.toString());
    } else {
      newSearchParams.delete("limit");
    }

    setSearchParams(newSearchParams);
  };

  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: newPage });
  };

  const handleLimitChange = (newLimit: number) => {
    updateUrlParams({ limit: newLimit, page: 1 });
  };

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-600">
          Error loading orders: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <DataTable
        columns={ordersColumns}
        data={data}
        isLoading={isLoading}
        pagination={{
          page,
          limit,
          onPageChange: handlePageChange,
          onLimitChange: handleLimitChange,
          hasNextPage,
          prefetchNextPage,
          prefetchPreviousPage,
        }}
      />
    </div>
  );
}
