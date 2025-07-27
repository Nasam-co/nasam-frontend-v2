import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { LanguageSwitcher } from "@/shared/components/common/LanguageSwitcher";

const marketplaces = ["all-marketplaces", "amazon", "trendyol", "noon"];
const stores = ["Thannah", "IOUD", "Rfoof", "O'SO"];

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [selectedMarketplace, setSelectedMarketplace] = useState(
    marketplaces[0]
  );
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  const getMarketplaceLabel = (marketplace: string) => {
    switch (marketplace) {
      case "all-marketplaces":
        return t("header.allMarketplaces");
      case "amazon":
        return t("header.amazon");
      case "trendyol":
        return t("header.trendyol");
      case "noon":
        return t("header.noon");
      default:
        return marketplace;
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card px-4 lg:px-6">
      <div className="flex h-full items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store} value={store}>
                  {store}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedMarketplace}
            onValueChange={setSelectedMarketplace}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {marketplaces.map((marketplace) => (
                <SelectItem key={marketplace} value={marketplace}>
                  {getMarketplaceLabel(marketplace)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
