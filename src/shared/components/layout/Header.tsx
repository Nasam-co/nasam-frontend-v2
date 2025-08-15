import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { MultiSelect } from "@/shared/components/ui/multi-select";
import { LanguageSwitcher } from "@/shared/components/common/LanguageSwitcher";
import { Seller } from "@/shared/types/Sellers.type";
import { useSellersStore } from "@/shared/store/sellersStore";

// Remove hardcoded marketplaces - will be dynamically generated from sellers

export default function Header({ sellers }: { sellers?: Seller[] }) {
  const { t } = useTranslation();
  const {
    selectedSellerIds,
    selectedMarketplaces,
    setSelectedSellerIds,
    setSelectedMarketplaces,
  } = useSellersStore();

  // Generate available marketplaces dynamically from user's allowed sellers
  const availableMarketplaces = useMemo(() => {
    if (!sellers || sellers.length === 0) {
      return ["all-marketplaces"];
    }

    const marketplaceSet = new Set<string>(["all-marketplaces"]);

    sellers.forEach((seller) => {
      seller.marketplaceAccounts?.forEach((account) => {
        if (account.marketplace?.name) {
          marketplaceSet.add(account.marketplace.name.toLowerCase());
        }
      });
    });

    return Array.from(marketplaceSet);
  }, [sellers]);

  const handleSellerChange = (values: string[]) => {
    // If no values selected, default to "all-sellers"
    if (values.length === 0) {
      setSelectedSellerIds(["all-sellers"]);
      return;
    }

    // If "all-sellers" is being selected and other sellers are already selected
    if (
      values.includes("all-sellers") &&
      selectedSellerIds.some((id) => id !== "all-sellers")
    ) {
      // Only keep "all-sellers"
      setSelectedSellerIds(["all-sellers"]);
      return;
    }

    // If a specific seller is being selected while "all-sellers" is selected
    if (
      values.some((id) => id !== "all-sellers") &&
      selectedSellerIds.includes("all-sellers")
    ) {
      // Remove "all-sellers" and keep only the specific sellers
      setSelectedSellerIds(values.filter((id) => id !== "all-sellers"));
      return;
    }

    // Normal selection
    setSelectedSellerIds(values);
  };

  const handleMarketplaceChange = (values: string[]) => {
    // If no values selected, default to "all-marketplaces"
    if (values.length === 0) {
      setSelectedMarketplaces(["all-marketplaces"]);
      return;
    }

    // If "all-marketplaces" is being selected and other marketplaces are already selected
    if (
      values.includes("all-marketplaces") &&
      selectedMarketplaces.some((id) => id !== "all-marketplaces")
    ) {
      // Only keep "all-marketplaces"
      setSelectedMarketplaces(["all-marketplaces"]);
      return;
    }

    // If a specific marketplace is being selected while "all-marketplaces" is selected
    if (
      values.some((id) => id !== "all-marketplaces") &&
      selectedMarketplaces.includes("all-marketplaces")
    ) {
      // Remove "all-marketplaces" and keep only the specific marketplaces
      setSelectedMarketplaces(values.filter((id) => id !== "all-marketplaces"));
      return;
    }

    // Normal selection
    setSelectedMarketplaces(values);
  };

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
          <MultiSelect
            className="w-48"
            options={[
              {
                value: "all-sellers",
                label: t("header.allSellers", "All Sellers"),
              },
              ...(sellers?.map((seller) => ({
                value: seller.id.toString(),
                label: seller.name,
              })) || []),
            ]}
            value={selectedSellerIds}
            onValueChange={handleSellerChange}
            placeholder={t("header.selectSellers", "Select sellers...")}
          />
          <MultiSelect
            className="w-48"
            options={availableMarketplaces.map((marketplace) => ({
              value: marketplace,
              label: getMarketplaceLabel(marketplace),
            }))}
            value={selectedMarketplaces}
            disabled={true}
            onValueChange={handleMarketplaceChange}
            placeholder={t(
              "header.selectMarketplaces",
              "Select marketplaces..."
            )}
          />
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
