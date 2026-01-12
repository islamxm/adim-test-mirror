import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { LOCALE_COOKIE_NAME } from "./config";
import { getBrowserLocaleOnServer } from "./lib";
import deepmerge from "deepmerge";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const browsersLocale = await getBrowserLocaleOnServer();
  const locale = cookieStore.get(LOCALE_COOKIE_NAME)?.value || browsersLocale;

  // импорты переводов
  // widgets
  const appHeader = (await import(`@/widgets/appHeader/i18n/${locale}.json`))
    .default;
  const appFooter = (await import(`@/widgets/appFooter/i18n/${locale}.json`))
    .default;

  //pages
  const homePage = await import(`@/_pages/homePage/i18n/${locale}.json`);
  const authPage = await import(`@/_pages/authPage/i18n/${locale}.json`);

  //features
  const register = await import(`@/features/auth/register/i18n/${locale}.json`);
  const login = await import(`@/features/auth/login/i18n/${locale}.json`);
  const google = await import(`@/features/auth/google/i18n/${locale}.json`);

  // общий файл перевода
  const messages = deepmerge.all([
    //pages
    homePage,
    authPage,

    //widgets
    appHeader,
    appFooter,

    //features
    register,
    login,
    google,
  ]);

  return {
    locale,
    messages,
  };
});
