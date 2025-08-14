import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "../services/orders";
import { OrdersOverviewRequest } from "../types";

export function useOrders(params: OrdersOverviewRequest) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => OrdersService.getOrders(params),
    staleTime: 5 * 60 * 1000,
  });
}