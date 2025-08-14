import apiClient from "@/lib/api-client";
import type { OrderOverviewResponse, OrdersOverviewRequest, OrderOverview, OrderStatusCountsRequest, OrderStatusCountsResponse } from "../types";

export class OrdersService {
  static async getOrders(params: OrdersOverviewRequest): Promise<OrderOverviewResponse> {
    const queryParams: Record<string, string | number> = {};

    if (params.startDate) queryParams.startDate = params.startDate;
    if (params.endDate) queryParams.endDate = params.endDate;
    if (params.sellerIds) queryParams.sellerIds = params.sellerIds.join(',');
    if (params.excludedMarketplacesIds) queryParams.excludedMarketplacesIds = params.excludedMarketplacesIds.join(',');
    if (params.status) queryParams.status = params.status;
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;

    const response = await apiClient.get<OrderOverviewResponse>("orders", {
      params: queryParams,
    });
    return response.data;
  }

  static async getOrderById(id: number): Promise<OrderOverview> {
    const response = await apiClient.get<OrderOverview>(`orders/${id}`);
    return response.data;
  }

  static async getOrderStatusCounts(params: OrderStatusCountsRequest): Promise<OrderStatusCountsResponse> {
    const queryParams: Record<string, string | number> = {};

    if (params.startDate) queryParams.startDate = params.startDate;
    if (params.endDate) queryParams.endDate = params.endDate;
    if (params.sellerIds) queryParams.sellerIds = params.sellerIds.join(',');
    if (params.excludedMarketplacesIds) queryParams.excludedMarketplacesIds = params.excludedMarketplacesIds.join(',');

    const response = await apiClient.get<OrderStatusCountsResponse>("orders/status-counts", {
      params: queryParams,
    });
    return response.data;
  }
}
