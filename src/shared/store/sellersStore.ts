import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Seller } from "../types/Sellers.type";

export type DateRange = "7days" | "30days" | "90days";

export interface CustomDateRange {
  startDate: string;
  endDate: string;
}

interface SellersState {
  sellers: Seller[];
  selectedSellerId: string | null; // null means "All Sellers"
  selectedSellerIds: string[]; // Array for multi-select
  selectedMarketplaces: string[]; // Array for multi-select marketplaces
  selectedDateRange: DateRange;
  customDateRange: CustomDateRange | null; // Takes priority over selectedDateRange

  // Actions
  setSellers: (sellers: Seller[]) => void;
  setSelectedSellerId: (sellerId: string | null, updateUrl?: boolean) => void;
  setSelectedSellerIds: (sellerIds: string[], updateUrl?: boolean) => void;
  setSelectedMarketplaces: (marketplaces: string[], updateUrl?: boolean) => void;
  setSelectedDateRange: (dateRange: DateRange, updateUrl?: boolean) => void;
  setCustomDateRange: (dateRange: CustomDateRange | null, updateUrl?: boolean) => void;
  getSelectedSellerIds: () => string[];
  getDateRangeParams: () => { startDate: string; endDate: string };
  clearCustomDateRange: (updateUrl?: boolean) => void;
  initializeFromUrl: () => void;
}

export const useSellersStore = create<SellersState>()(
  devtools(
    (set, get) => ({
      sellers: [],
      selectedSellerId: null,
      selectedSellerIds: ["all-sellers"],
      selectedMarketplaces: ["all-marketplaces"],
      selectedDateRange: "30days" as DateRange,
      customDateRange: null,

      setSellers: (sellers) =>
        set({
          sellers,
        }),
      setSelectedSellerIds: (sellerIds, updateUrl = true) => {
        set({ selectedSellerIds: sellerIds });
        if (updateUrl) {
          const url = new URL(window.location.href);
          if (sellerIds.length === 0) {
            url.searchParams.delete("sellerIds");
          } else {
            url.searchParams.set("sellerIds", sellerIds.join(","));
          }
          window.history.replaceState({}, "", url.toString());
        }
      },
      setSelectedMarketplaces: (marketplaces, updateUrl = true) => {
        set({ selectedMarketplaces: marketplaces });
        if (updateUrl) {
          const url = new URL(window.location.href);
          if (marketplaces.length === 0 || (marketplaces.length === 1 && marketplaces[0] === "all-marketplaces")) {
            url.searchParams.delete("marketplaces");
          } else {
            url.searchParams.set("marketplaces", marketplaces.join(","));
          }
          window.history.replaceState({}, "", url.toString());
        }
      },
      setSelectedSellerId: (sellerId, updateUrl = true) => {
        set({ selectedSellerId: sellerId });
        if (updateUrl) {
          const url = new URL(window.location.href);
          if (sellerId === null) {
            url.searchParams.delete("sellerId");
          } else {
            url.searchParams.set("sellerId", sellerId);
          }
          window.history.replaceState({}, "", url.toString());
        }
      },
      setSelectedDateRange: (dateRange, updateUrl = true) => {
        set({ selectedDateRange: dateRange, customDateRange: null });
        if (updateUrl) {
          const url = new URL(window.location.href);
          // Clear custom date params and set dateRange
          url.searchParams.delete("startDate");
          url.searchParams.delete("endDate");
          url.searchParams.set("dateRange", dateRange);
          window.history.replaceState({}, "", url.toString());
        }
      },
      setCustomDateRange: (dateRange, updateUrl = true) => {
        set({ customDateRange: dateRange });
        if (updateUrl) {
          const url = new URL(window.location.href);
          if (dateRange) {
            // Clear dateRange param and set custom dates
            url.searchParams.delete("dateRange");
            url.searchParams.set("startDate", dateRange.startDate);
            url.searchParams.set("endDate", dateRange.endDate);
          } else {
            // Clear custom date params
            url.searchParams.delete("startDate");
            url.searchParams.delete("endDate");
          }
          window.history.replaceState({}, "", url.toString());
        }
      },
      getSelectedSellerIds: () => {
        const state = get();
        // Return multi-select array if it has values, otherwise fall back to single select
        if (state.selectedSellerIds.length > 0) {
          return state.selectedSellerIds;
        }
        if (state.selectedSellerId === null) {
          return [];
        }
        return [state.selectedSellerId];
      },
      getDateRangeParams: () => {
        const state = get();
        
        // If custom date range is set, use it (priority over tabs)
        if (state.customDateRange) {
          return {
            startDate: state.customDateRange.startDate,
            endDate: state.customDateRange.endDate,
          };
        }
        
        // Otherwise use tab-based date range
        const endDate = new Date();
        const startDate = new Date();
        
        switch (state.selectedDateRange) {
          case "7days":
            startDate.setDate(startDate.getDate() - 7);
            break;
          case "30days":
            startDate.setDate(startDate.getDate() - 30);
            break;
          case "90days":
            startDate.setDate(startDate.getDate() - 90);
            break;
        }
        
        return {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        };
      },
      clearCustomDateRange: (updateUrl = true) => {
        set({ customDateRange: null });
        if (updateUrl) {
          const url = new URL(window.location.href);
          url.searchParams.delete("startDate");
          url.searchParams.delete("endDate");
          // Set default dateRange if none exists
          if (!url.searchParams.has("dateRange")) {
            url.searchParams.set("dateRange", get().selectedDateRange);
          }
          window.history.replaceState({}, "", url.toString());
        }
      },
      initializeFromUrl: () => {
        const url = new URL(window.location.href);
        const sellerIdFromUrl = url.searchParams.get("sellerId");
        const sellerIdsFromUrl = url.searchParams.get("sellerIds");
        const marketplacesFromUrl = url.searchParams.get("marketplaces");
        const dateRangeFromUrl = url.searchParams.get("dateRange") as DateRange;
        const startDateFromUrl = url.searchParams.get("startDate");
        const endDateFromUrl = url.searchParams.get("endDate");

        const updates: Partial<Pick<SellersState, 'selectedSellerId' | 'selectedSellerIds' | 'selectedMarketplaces' | 'selectedDateRange' | 'customDateRange'>> = {};
        
        // Handle seller selection (multi-select takes priority)
        if (sellerIdsFromUrl) {
          updates.selectedSellerIds = sellerIdsFromUrl.split(",").filter(Boolean);
        } else if (sellerIdFromUrl) {
          updates.selectedSellerId = sellerIdFromUrl;
        }
        
        // Handle marketplace selection
        if (marketplacesFromUrl) {
          updates.selectedMarketplaces = marketplacesFromUrl.split(",").filter(Boolean);
        }
        
        // Priority: custom date range over tab-based range
        if (startDateFromUrl && endDateFromUrl) {
          updates.customDateRange = {
            startDate: startDateFromUrl,
            endDate: endDateFromUrl,
          };
        } else if (dateRangeFromUrl && ["7days", "30days", "90days"].includes(dateRangeFromUrl)) {
          updates.selectedDateRange = dateRangeFromUrl;
          updates.customDateRange = null;
        }
        
        if (Object.keys(updates).length > 0) {
          set(updates);
        }
      },
    }),
    { name: "sellersStore" }
  )
);
