import { DataTable } from "@/shared/components/ui/data-table";
import { useOrdersColumns } from "../components/columns";
import { useOrdersTableData } from "../hooks/useOrdersTableData";
import { OrdersOverviewRequest, ShipmentStatus } from "../types";
import { useState, useEffect } from "react";
import StatusFilterBar from "../components/StatusFilterBar";
import { useSellersStore } from "@/shared/store/sellersStore";
import { useTranslation } from "react-i18next";

export default function OrdersPage() {
  const { t } = useTranslation();
  const columns = useOrdersColumns();
  const selectedSellerIds = useSellersStore((state) => state.selectedSellerIds);
  const getSelectedSellerIds = useSellersStore(
    (state) => state.getSelectedSellerIds
  );
  const getDateRangeParams = useSellersStore(
    (state) => state.getDateRangeParams
  );
  const selectedDateRange = useSellersStore((state) => state.selectedDateRange);
  const customDateRange = useSellersStore((state) => state.customDateRange);

  const [params, setParams] = useState<OrdersOverviewRequest>({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    const actualSellerIds = getSelectedSellerIds();
    const sellerIds = actualSellerIds.includes("all-sellers")
      ? undefined
      : actualSellerIds.map(Number);

    const dateRange = getDateRangeParams();

    setParams((prev) => ({
      ...prev,
      sellerIds: sellerIds,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }));
  }, [
    selectedSellerIds,
    getSelectedSellerIds,
    getDateRangeParams,
    selectedDateRange,
    customDateRange,
  ]);

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

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setParams((prev) => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleStatusChange = (status?: ShipmentStatus) => {
    setParams((prev) => ({ ...prev, status, page: 1 }));
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("navigation.orders")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("orders.description")}
        </p>
      </div>

      <StatusFilterBar
        selectedStatus={params.status}
        onStatusChange={handleStatusChange}
        filters={params}
      />
      <DataTable
        columns={columns}
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
