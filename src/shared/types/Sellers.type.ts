export interface Seller {
  id: string;
  name: string;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
  notes?: string;
  warehouseId?: number;
  createdAt: string;
  updatedAt: string;
  marketplaceAccounts: MarketplaceAccount[];
}

export interface MarketplaceAccount {
  id: number;
  sellerId: number;
  marketplaceId: number;
  sellerIdInMarketplace: string;
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: string;
  status: string;
  connectionDate: string;
  connectionError?: string;
  fulfillmentModel: string;
  warehouseId?: number;
  lastOrderSync?: string;
  createdAt: string;
  updatedAt: string;
  marketplace: Marketplace;
}

export interface Marketplace {
  id: number;
  name: string;
  logoUrl?: string;
  apiVersion?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
