export type ShipmentStatus =
  | "Created"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned";

export interface OrderItem {
  id: number;
  orderId: number;
  listingId: number;
  quantity: number;
  price: string;
  marketplaceItemId: string;
  createdAt: string;
  updatedAt: string;
  listing: Listing;
  imageUrl: any;
}

export interface Listing {
  id: number;
  productId: number;
  marketplaceAccountId: number;
  externalData: any;
  marketplaceSku: string;
  listingStatus: string;
  listingUrl: any;
  lastSyncAt: any;
  listPrice: string;
  listingCurrency: string;
  salePrice: any;
  saleStartDate: any;
  saleEndDate: any;
  marketplaceMinimumPrice: any;
  marketplaceMaximumPrice: any;
  marketplaceCommission: any;
  pricingSyncStatus: string;
  pricingLastSyncAt: any;
  availableQuantity: number;
  fulfilledBy: string;
  inventorySyncStatus: string;
  inventoryLastSyncAt: string;
  pricingSyncFailureReason: any;
  inventorySyncFailureReason: any;
  totalRevenue: string;
  totalUnitsSold: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Product {
  id: number;
  sellerId: number;
  sku: string;
  name: string;
  nameAR: any;
  description: string;
  brand: any;
  category: any;
  mainImageUrl: any;
  additionalImages: any;
  color: any;
  size: any;
  weight: string;
  dimensions: any;
  material: any;
  isActive: boolean;
  basePrice: string;
  pricingCurrency: string;
  pricingSyncStatus: string;
  costPrice: any;
  manufacturerRetailPrice: any;
  minimumAllowedPrice: any;
  maximumAllowedPrice: any;
  pricingLastSyncAt: any;
  totalAvailableQuantity: number;
  inventoryLastSyncAt: string;
  inventorySyncStatus: string;
  totalRevenue: string;
  totalUnitsSold: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderOverview {
  id: number;
  orderIdInMarketplace: string;
  orderDate: string;
  acceptedDeliveryDate?: string;
  orderStatus: ShipmentStatus;
  marketplace: string;
  fulfillmentModel: string;
  totalAmount: string;
  sellerName: string;
  orderItems: OrderItem[];
  shipmentIdInCarrier: string;
  trackingNumber: string;
}

export interface OrderOverviewResponse {
  orders: OrderOverview[];
  page: number;
  limit: number;
}

export interface OrdersOverviewRequest {
  startDate?: string;
  endDate?: string;
  sellerIds?: number[];
  excludedMarketplacesIds?: number[];
  status?: ShipmentStatus;
  page?: number;
  limit?: number;
}

export interface OrderStatusCountsRequest {
  startDate?: string;
  endDate?: string;
  sellerIds?: number[];
  excludedMarketplacesIds?: number[];
}

export interface OrderStatusCount {
  status: ShipmentStatus;
  count: number;
}

export type OrderStatusCountsResponse = OrderStatusCount[];

export interface OrderTableRow {
  id: number;
  orderIdInMarketplace: string;
  orderDate: string;
  marketplace: string;
  fulfillmentModel: string;
  orderStatus: ShipmentStatus;
  totalAmount: number;
  items: number;
  trackingNumber?: string;
}
