export interface Order {
  id: number;
  sellerId: number;
  status: OrderStatus;
  orderDate: string;
  totalAmount: number;
  currency?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrdersParams {
  sellerId: number;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export interface OrderTableRow {
  id: number;
  orderDate: string;
  customerName: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  items: number;
}
export type ShipmentStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED"
  | "RETURNED";

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
