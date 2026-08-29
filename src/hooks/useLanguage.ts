import { useEffect, useState } from "react";
import type { Language } from "../types/site";

const LANGUAGE_STORAGE_KEY = "shipping-site-language";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() =>
    window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "fr",
  );

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  return { language, setLanguage };
}
