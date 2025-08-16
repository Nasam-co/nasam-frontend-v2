import { ColumnDef } from "@tanstack/react-table";
import { OrderTableRow } from "../types";
import { ShipmentStatus } from "../types/orders.types";
import { STATUS_COLORS } from "../constants/status-colors";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Riyal from "@/shared/components/common/Riyal";

export const useOrdersColumns = (): ColumnDef<OrderTableRow>[] => {
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language === "ar" ? ar : enUS;

  return useMemo(
    () => [
      {
        header: t("orders.orderId"),
        accessorKey: "orderIdInMarketplace",
        enableSorting: false,
      },
      {
        header: t("orders.date"),
        accessorKey: "orderDate",
        enableSorting: false,
        cell: ({ row }) => {
          const date = row.getValue("orderDate") as string;
          const timeAgo = formatDistanceToNow(new Date(date), {
            locale: currentLocale,
            addSuffix: true,
          });
          return <div>{timeAgo}</div>;
        },
      },
      {
        header: t("orders.marketplace"),
        accessorKey: "marketplace",
        enableSorting: false,
        cell: ({ row }) => {
          const marketplace = row.getValue("marketplace") as string;
          const marketplaceLower = marketplace.toLowerCase();
          return (
            <img
              src={`/assets/images/marketplaces/${marketplaceLower}.png`}
              alt={marketplace}
              width={60}
              height={60}
              className="object-contain"
            />
          );
        },
      },
      {
        header: t("orders.fulfillment"),
        accessorKey: "fulfillmentModel",
        enableSorting: false,
      },
      {
        header: t("orders.status"),
        accessorKey: "orderStatus",
        enableSorting: false,
        cell: ({ row }) => {
          const status = row.getValue("orderStatus") as ShipmentStatus;
          return (
            <button
              className={`px-2 py-1 rounded-full text-xs w-fit font-medium ${STATUS_COLORS[status]}`}
            >
              {t(`orders.${status.toLowerCase()}`)}
            </button>
          );
        },
      },
      {
        header: t("orders.total"),
        accessorKey: "totalAmount",
        enableSorting: false,
        cell: ({ row }) => {
          const amount = row.getValue("totalAmount") as number;
          return (
            <div className="flex w-fit items-center justify-center gap-2">
              <Riyal />
              <span className="text-sm font-medium">{amount}</span>
            </div>
          );
        },
      },
      {
        header: t("orders.items"),
        accessorKey: "items",
        enableSorting: false,
      },
      {
        header: t("orders.tracking"),
        accessorKey: "trackingNumber",
        enableSorting: false,
        cell: ({ row }) => {
          const trackingNumber = row.getValue("trackingNumber") as string;
          return <div>{trackingNumber || t("orders.notAvailable")}</div>;
        },
      },
    ],
    [currentLocale, t]
  );
};
