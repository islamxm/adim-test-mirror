import { useEffect } from "react";
import { defaultLocale, LOCALE_COOKIE_NAME, locales } from "./config";
import { Locale } from "./model";
import Cookies from "js-cookie";

export const LocaleDetector = () => {
  useEffect(() => {
    const hasCookie = Cookies.get(LOCALE_COOKIE_NAME);
    if (!hasCookie) {
      const browserLang = navigator.language.split("-")[0] as Locale;
      const targetLocale = locales.includes(browserLang)
        ? browserLang
        : defaultLocale;
      document.cookie = `${LOCALE_COOKIE_NAME}=${targetLocale};SameSite=Lax`;
    }
  }, []);

  return null;
};
