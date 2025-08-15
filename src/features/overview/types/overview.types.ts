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
  lastProductLink: string | null;
  createdAt: string;
  updatedAt: string;
  marketplace: Marketplace;
}

export interface Seller {
  id: number;
  name: string;
  nameAR: string | null;
  logoUrl: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  isActive: boolean;
  notes: string | null;
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

export interface RevenueTrendData {
  date: string;
  totalRevenue: number;
  totalOrders: number;
}

export interface RevenueTrendItem {
  marketplace: string;
  trends: RevenueTrendData[];
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
  listing: {
    sku: string;
  };
  unitsSold: number;
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