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
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

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