import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrdersService } from "../services/orders";
import { OrdersOverviewRequest, OrderTableRow } from "../types";

export function useOrders(params: OrdersOverviewRequest) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => OrdersService.getOrders(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOrdersTableData(params: OrdersOverviewRequest) {
  const queryClient = useQueryClient();
  const { data: ordersResponse, isLoading, error } = useOrders(params);

  const tableData: OrderTableRow[] = ordersResponse?.orders?.map((order) => ({
    id: order.id,
    orderIdInMarketplace: order.orderIdInMarketplace,
    orderDate: new Date(order.orderDate).toLocaleDateString(),
    marketplace: order.marketplace,
    fulfillmentModel: order.fulfillmentModel,
    orderStatus: order.orderStatus,
    totalAmount: order.totalAmount,
    items: order.orderItems?.length || 0,
    trackingNumber: order.trackingNumber,
  })) || [];

  // Prefetch next page
  const prefetchNextPage = () => {
    const nextPageParams = { ...params, page: (params.page || 1) + 1 };
    queryClient.prefetchQuery({
      queryKey: ["orders", nextPageParams],
      queryFn: () => OrdersService.getOrders(nextPageParams),
      staleTime: 5 * 60 * 1000,
    });
  };

  // Prefetch previous page
  const prefetchPreviousPage = () => {
    if (params.page && params.page > 1) {
      const prevPageParams = { ...params, page: params.page - 1 };
      queryClient.prefetchQuery({
        queryKey: ["orders", prevPageParams],
        queryFn: () => OrdersService.getOrders(prevPageParams),
        staleTime: 5 * 60 * 1000,
      });
    }
  };

  // Determine if there's a next page based on the number of items returned
  const hasNextPage = ordersResponse?.orders?.length === (params.limit || 10);

  return {
    data: tableData,
    isLoading,
    error,
    page: ordersResponse?.page || 1,
    limit: ordersResponse?.limit || 20,
    hasNextPage,
    prefetchNextPage,
    prefetchPreviousPage,
  };
}