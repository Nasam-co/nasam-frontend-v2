import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "../services/orders";
import { OrdersParams, OrderTableRow } from "../types";

export function useOrders(params: OrdersParams) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => OrdersService.getOrders(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOrdersTableData(params: OrdersParams) {
  const { data: ordersResponse, isLoading, error } = useOrders(params);

  const tableData: OrderTableRow[] = ordersResponse?.data?.map((order) => ({
    id: order.id,
    orderDate: order.orderDate,
    customerName: order.customerName || 'N/A',
    status: order.status,
    totalAmount: order.totalAmount,
    currency: order.currency || 'USD',
    items: order.items?.length || 0,
  })) || [];

  return {
    data: tableData,
    isLoading,
    error,
    totalPages: ordersResponse?.totalPages || 0,
    total: ordersResponse?.total || 0,
  };
}