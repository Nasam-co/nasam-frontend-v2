import { Checkbox } from "@/shared/components/ui/checkbox";
import { DataTableColumnHeader } from "@/shared/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { OrderTableRow } from "../types";

export const ordersColumns: ColumnDef<OrderTableRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    accessorKey: "orderIdInMarketplace",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    accessorKey: "orderDate",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marketplace" />
    ),
    accessorKey: "marketplace",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fulfillment" />
    ),
    accessorKey: "fulfillmentModel",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    accessorKey: "orderStatus",
    cell: ({ row }) => {
      const status = row.getValue("orderStatus") as string;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "DELIVERED"
              ? "bg-green-100 text-green-800"
              : status === "SHIPPED"
              ? "bg-blue-100 text-blue-800"
              : status === "PROCESSING"
              ? "bg-yellow-100 text-yellow-800"
              : status === "CANCELLED"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    accessorKey: "totalAmount",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number;
      return (
        <div className="flex items-center gap-2">
          <img
            src="/assets/images/riyal.png"
            alt="Currency"
            width={16}
            height={16}
          />
          <span className="text-sm font-medium">{amount}</span>
        </div>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Items" />
    ),
    accessorKey: "items",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tracking" />
    ),
    accessorKey: "trackingNumber",
    cell: ({ row }) => {
      const trackingNumber = row.getValue("trackingNumber") as string;
      return <div>{trackingNumber || "N/A"}</div>;
    },
  },
];
