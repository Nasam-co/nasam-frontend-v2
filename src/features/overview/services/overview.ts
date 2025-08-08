import apiClient from "@/lib/api-client";
import type { DashboardStats } from "../types";

export class OverviewService {
  static async getOverview(
    sellerIds?: string[],
    dateRange?: { startDate: string; endDate: string }
  ): Promise<DashboardStats> {
    const params: Record<string, string> = {
      startDate: dateRange?.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      endDate: dateRange?.endDate || new Date().toISOString().split("T")[0],
    };

    if (sellerIds && sellerIds.length > 0) {
      params.sellerIds = sellerIds.join(",");
    }
    
    const response = await apiClient.get<DashboardStats>("overview", {
      params,
    });
    return response.data;
  }
}
