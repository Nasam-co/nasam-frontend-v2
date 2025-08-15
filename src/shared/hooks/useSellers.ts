import { useQuery } from "@tanstack/react-query";
import { useSellersStore } from "../store/sellersStore";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useEffect, useMemo } from "react";
import { getAllSellers } from "../services/sellers";

export const useSellers = () => {
  const setSellers = useSellersStore((state) => state.setSellers);
  const initializeFromUrl = useSellersStore((state) => state.initializeFromUrl);
  const { user, getAllowedSellerIds } = useAuthStore();

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["sellers"],
    queryFn: () => getAllSellers(),
  });

  // Filter sellers based on user's permissions
  const filteredSellers = useMemo(() => {
    if (!data || !user) return data;

    const allowedSellerIds = getAllowedSellerIds();

    // If user has no seller manager, return all sellers
    if (allowedSellerIds.length === 0) {
      return data;
    }

    // Filter sellers based on user's sellerManagers
    return data.filter((seller) =>
      allowedSellerIds.includes(parseInt(seller.id))
    );
  }, [data, user, getAllowedSellerIds]);

  useEffect(() => {
    initializeFromUrl();
  }, [initializeFromUrl]);

  useEffect(() => {
    if (filteredSellers) {
      setSellers(filteredSellers);
    }
  }, [filteredSellers, setSellers]);

  return {
    isLoading,
    error,
    sellers: filteredSellers,
    allSellers: data,
    refetch,
    isRefetching,
  };
};
