import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export function TopPerformersHeader() {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("this-week");

  const periods = [
    { value: "this-week", label: t("overview.topPerformers.thisWeek") },
    { value: "this-month", label: t("overview.topPerformers.thisMonth") },
  ];

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">
        {t("overview.topPerformers.title")}
      </h3>
      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {periods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}