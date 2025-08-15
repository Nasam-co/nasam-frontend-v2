import apiClient from "@/lib/api-client";
import { Seller } from "../types/Sellers.type";

export async function getAllSellers(): Promise<Seller[]> {
  const response = await apiClient.get<Seller[]>("sellers");
  console.log("response", response);
  return response.data;
}

export async function getSellers(ids?: number[]): Promise<Seller[]> {
  if (!ids || ids.length === 0) {
    return getAllSellers();
  }

  const response = await apiClient.get<Seller[]>("sellers", {
    params: { ids: ids.join(",") },
  });
  return response.data;
}

export async function getSeller(id: number): Promise<Seller> {
  const response = await apiClient.get<Seller>(`sellers/${id}`);
  return response.data;
}
