export interface MarketplaceAccount {
  id: number;
  sellerId: number;
  marketplaceId: number;
  sellerIdInMarketplace: string;
  apiKey: string | null;
  apiSecret: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: string | null;
  status: string;
  connectionDate: string;
  connectionError: string | null;
  fulfillmentModel: string;
  warehouseId: number | null;
  lastOrderSync: string | null;
  createdAt: string;
  updatedAt: string;
  marketplace: Marketplace;
}

export interface Seller {
  id: number;
  name: string;
  logoUrl: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  isActive: boolean;
  notes: string | null;
  warehouseId: number | null;
  createdAt: string;
  updatedAt: string;
  marketplaceAccounts: MarketplaceAccount[];
}

export interface Marketplace {
  id: number;
  name: string;
  logoUrl: string | null;
  apiVersion: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RevenueTrendItem {
  date: string;
  revenue: number;
}

export interface StockAlertItem {
  name: string;
  marketplace: string;
  availableQuantity: number;
  imageUrl: string | null;
}

export interface StockAlerts {
  listing: StockAlertItem[];
  totalLowStock: number;
  totalOutOfStock: number;
}

export interface TopPerformer {
  id: number;
  name: string;
  revenue: number;
  orders: number;
}

export interface DashboardStats {
  pendingOrdersCount: number;
  activeProducts: number;
  todaysRevenue: number;
  increaseFromYesterday: number;
  sellers: Seller[];
  marketplaces: Marketplace[];
  revenueTrend: RevenueTrendItem[];
  stockAlerts: StockAlerts;
  topPerformers: TopPerformer[];
}