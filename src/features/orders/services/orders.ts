import apiClient from "@/lib/api-client";
import type { OrdersResponse, OrdersParams, Order } from "../types";

export class OrdersService {
  static async getOrders(params: OrdersParams): Promise<OrdersResponse> {
    // const queryParams: Record<string, string | number> = {
    //   sellerId: params.sellerId,
    //   page: params.page || 1,
    //   limit: params.limit || 20,
    // };

    // if (params.status) {
    //   queryParams.status = params.status;
    // }

    const response = await apiClient.get<OrdersResponse>("orders", {
      // params: queryParams,
    });
    return response.data;
  }

  static async getOrderById(id: number): Promise<Order> {
    const response = await apiClient.get<Order>(`orders/${id}`);
    return response.data;
  }
}
