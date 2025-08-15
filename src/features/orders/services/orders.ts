import apiClient from "@/lib/api-client";
import type {
  OrderOverviewResponse,
  OrdersOverviewRequest,
  OrderOverview,
  OrderStatusCountsResponse,
} from "../types";

export class OrdersService {
  static async getOrders(
    params: OrdersOverviewRequest
  ): Promise<OrderOverviewResponse> {
    const queryParams: Record<string, string | number> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      switch (key) {
        case "sellerIds":
          if (Array.isArray(value) && value.length > 0) {
            queryParams.sellerId = value.join(",");
          }
          break;
        case "excludedMarketplacesIds":
          if (Array.isArray(value) && value.length > 0) {
            queryParams.excludedMarketplacesIds = value.join(",");
          }
          break;
        case "status":
          queryParams.status = value.toLowerCase();
          break;
        default:
          queryParams[key] = value;
      }
    });

    const response = await apiClient.get<OrderOverviewResponse>("orders", {
      params: queryParams,
    });
    return response.data;
  }

  static async getOrderById(id: number): Promise<OrderOverview> {
    const response = await apiClient.get<OrderOverview>(`orders/${id}`);
    return response.data;
  }

  static async getOrderStatusCounts(): Promise<OrderStatusCountsResponse> {
    const response = await apiClient.get<OrderStatusCountsResponse>(
      "orders/status-counts"
    );
    return response.data;
  }
}
