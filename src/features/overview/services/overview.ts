import apiClient from '@/lib/api-client';
import type { DashboardStats } from '../types';

export class OverviewService {
  static async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>('/v1/overview/stats');
    return response.data;
  }
}