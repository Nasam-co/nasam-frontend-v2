import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useTranslation } from "react-i18next";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination?: {
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    prefetchNextPage?: () => void;
    prefetchPreviousPage?: () => void;
    hasNextPage?: boolean;
  };
}

export function DataTablePagination<TData>({
  table,
  pagination,
}: DataTablePaginationProps<TData>) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t("common.rowsPerPage")}</p>
          <Select
            value={`${
              pagination
                ? pagination.limit
                : table.getState().pagination.pageSize
            }`}
            onValueChange={(value) => {
              if (pagination && pagination.onLimitChange) {
                pagination.onLimitChange(Number(value));
              } else {
                table.setPageSize(Number(value));
              }
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                placeholder={
                  pagination
                    ? pagination.limit
                    : table.getState().pagination.pageSize
                }
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {t("common.page")}{" "}
          {pagination
            ? pagination.page
            : table.getState().pagination.pageIndex + 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() =>
              pagination ? pagination.onPageChange(1) : table.setPageIndex(0)
            }
            disabled={
              pagination ? pagination.page === 1 : !table.getCanPreviousPage()
            }
            onMouseEnter={() => pagination?.prefetchPreviousPage?.()}
          >
            <span className="sr-only">{t("common.first")}</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() =>
              pagination
                ? pagination.onPageChange(pagination.page - 1)
                : table.previousPage()
            }
            disabled={
              pagination ? pagination.page === 1 : !table.getCanPreviousPage()
            }
            onMouseEnter={() => pagination?.prefetchPreviousPage?.()}
          >
            <span className="sr-only">{t("common.previous")}</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() =>
              pagination
                ? pagination.onPageChange(pagination.page + 1)
                : table.nextPage()
            }
            disabled={
              pagination ? !pagination.hasNextPage : !table.getCanNextPage()
            }
            onMouseEnter={() => pagination?.prefetchNextPage?.()}
          >
            <span className="sr-only">{t("common.next")}</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
