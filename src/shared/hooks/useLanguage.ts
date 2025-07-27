import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "../types/Language";

export function useLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng");
    const currentLanguage = savedLanguage || i18n.language || "en";

    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;

    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
    localStorage.setItem("i18nextLng", lng);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    isRTL: i18n.language === "ar",
  };
}
