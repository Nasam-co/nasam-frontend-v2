import { ShipmentStatus } from "../types/orders.types";

export const STATUS_COLORS: Record<ShipmentStatus, string> = {
  Created: "bg-gray-100 text-gray-800",
  Packed: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Returned: "bg-orange-100 text-orange-800",
};

export const STATUS_COLORS_WITH_HOVER: Record<ShipmentStatus, string> = {
  Created: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  Packed: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  Shipped: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  Delivered: "bg-green-100 text-green-800 hover:bg-green-200",
  Cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
  Returned: "bg-orange-100 text-orange-800 hover:bg-orange-200",
};

export const STATUS_LABELS: Record<ShipmentStatus, string> = {
  Created: "Created",
  Packed: "Packed",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
  Returned: "Returned",
};