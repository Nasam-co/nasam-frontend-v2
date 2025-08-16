import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useSellersStore, type DateRange } from "@/shared/store/sellersStore";

export function DateRangeTabs() {
  const { t } = useTranslation();
  const selectedDateRange = useSellersStore((state) => state.selectedDateRange);
  const customDateRange = useSellersStore((state) => state.customDateRange);
  const setSelectedDateRange = useSellersStore(
    (state) => state.setSelectedDateRange
  );

  const handleDateRangeChange = (value: string) => {
    // This will clear custom date range and set the tab-based range
    setSelectedDateRange(value as DateRange);
  };

  // Show no active tab if custom date range is selected
  const activeValue = customDateRange ? "" : selectedDateRange;

  return (
    <Tabs
      value={activeValue}
      onValueChange={handleDateRangeChange}
      className="w-auto"
    >
      <TabsList className="">
        <TabsTrigger value="7days">
          {t("overview.dateRange.7days", "Last 7 days")}
        </TabsTrigger>
        <TabsTrigger value="30days">
          {t("overview.dateRange.30days", "Last 30 days")}
        </TabsTrigger>
        <TabsTrigger value="90days">
          {t("overview.dateRange.90days", "Last 90 days")}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
