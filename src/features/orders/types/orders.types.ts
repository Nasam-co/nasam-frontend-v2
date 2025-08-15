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
  price: number;
  marketplaceItemId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderOverview {
  id: number;
  orderIdInMarketplace: string;
  orderDate: Date;
  acceptedDeliveryDate?: Date;
  orderStatus: ShipmentStatus;
  marketplace: string;
  fulfillmentModel: string;
  totalAmount: number;
  orderItems: OrderItem[];
  shipmentIdInCarrier?: string;
  trackingNumber?: string;
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
