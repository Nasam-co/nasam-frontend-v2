import React, { useState } from "react";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const marketplaces = ["all-marketplaces", "amazon", "trendyol", "noon"];

const marketplaceLabels = {
  "all-marketplaces": "All Marketplaces",
  amazon: "Amazon",
  trendyol: "Trendyol",
  noon: "Noon",
};

const stores = [
  "all-stores",
  "tech-world",
  "fashion-hub",
  "home-garden",
  "sports-zone",
  "book-corner",
  "beauty-plus",
  "auto-parts-pro",
  "kids-paradise",
  "kitchen-master",
];

const storeLabels = {
  "all-stores": "All Stores",
  "tech-world": "Tech World",
  "fashion-hub": "Fashion Hub",
  "home-garden": "Home & Garden",
  "sports-zone": "Sports Zone",
  "book-corner": "Book Corner",
  "beauty-plus": "Beauty Plus",
  "auto-parts-pro": "Auto Parts Pro",
  "kids-paradise": "Kids Paradise",
  "kitchen-master": "Kitchen Master",
};

export const Header: React.FC = () => {
  const [selectedMarketplace, setSelectedMarketplace] = useState(
    marketplaces[0]
  );
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <header className="h-16 border-b border-border bg-card px-4 lg:px-6">
      <div className="flex h-full items-center gap-4">
        <SidebarTrigger />

        <Select value={selectedStore} onValueChange={setSelectedStore}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {stores.map((store) => (
              <SelectItem key={store} value={store}>
                {storeLabels[store as keyof typeof storeLabels]}
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
                {
                  marketplaceLabels[
                    marketplace as keyof typeof marketplaceLabels
                  ]
                }
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};
