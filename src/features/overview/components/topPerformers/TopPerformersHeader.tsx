import { useTranslation } from "react-i18next";

export function TopPerformersHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">
        {t("overview.topPerformers.title")}
      </h3>
    </div>
  );
}
