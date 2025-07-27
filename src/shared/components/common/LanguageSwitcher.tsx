import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Languages } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <Select value={currentLanguage} onValueChange={changeLanguage}>
      <SelectTrigger>
        <Languages className="h-4 w-4" />
        <SelectValue placeholder={t("language.switchLanguage")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("language.english")}</SelectItem>
        <SelectItem value="ar">{t("language.arabic")}</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function LanguageToggle() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      {currentLanguage === "en" ? t("language.arabic") : t("language.english")}
    </Button>
  );
}
