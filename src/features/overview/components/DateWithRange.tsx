"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { CalendarSearch, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useSellersStore } from "@/shared/store/sellersStore";
import { format } from "date-fns";

export function DateWithRange() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localDateRange, setLocalDateRange] = React.useState<
    DateRange | undefined
  >();
  const customDateRange = useSellersStore((state) => state.customDateRange);
  const setCustomDateRange = useSellersStore(
    (state) => state.setCustomDateRange
  );
  const clearCustomDateRange = useSellersStore(
    (state) => state.clearCustomDateRange
  );

  // Convert store format to react-day-picker format for display
  const dateRange: DateRange | undefined = React.useMemo(() => {
    if (customDateRange) {
      return {
        from: new Date(customDateRange.startDate),
        to: new Date(customDateRange.endDate),
      };
    }
    return undefined;
  }, [customDateRange]);

  // Use local state when calendar is open, store state when closed
  const selectedRange = isOpen ? localDateRange : dateRange;

  const handleDateSelect = (range: DateRange | undefined) => {
    // Always update local state for calendar display
    setLocalDateRange(range);

    // Only update the store when both start and end dates are selected AND they are different
    if (
      range?.from &&
      range?.to &&
      range.from.getTime() !== range.to.getTime()
    ) {
      setCustomDateRange({
        startDate: range.from.toISOString().split("T")[0],
        endDate: range.to.toISOString().split("T")[0],
      });
      setIsOpen(false);
      setLocalDateRange(undefined); // Reset local state
    }
    // If both dates are the same, keep calendar open to allow second date selection
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // When opening, initialize local state with the current stored date range
      setLocalDateRange(dateRange);
    } else {
      // Reset local state when closing without selecting
      setLocalDateRange(undefined);
    }
  };

  const handleClearDates = () => {
    clearCustomDateRange();
    setLocalDateRange(undefined);
  };

  const getButtonText = () => {
    if (customDateRange) {
      const start = format(new Date(customDateRange.startDate), "MMM d");
      const end = format(new Date(customDateRange.endDate), "MMM d, yyyy");
      return `${start} - ${end}`;
    }
    return null;
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-muted rounded-md"
          >
            <div className="flex items-center gap-2">
              <CalendarSearch className="size-4" />
              {customDateRange && (
                <span className="text-sm font-medium">{getButtonText()}</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="range"
            defaultMonth={selectedRange?.from || new Date()}
            selected={selectedRange}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
          />
        </PopoverContent>
      </Popover>
      {customDateRange && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-200"
          onClick={handleClearDates}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
