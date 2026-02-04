import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import deepmerge from "deepmerge";

import { LOCALE_COOKIE_NAME } from "./config";
import { getBrowserLocaleOnServer } from "./lib";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const browsersLocale = await getBrowserLocaleOnServer();
  const locale = cookieStore.get(LOCALE_COOKIE_NAME)?.value || browsersLocale;

  // импорты переводов
  // widgets
  const appHeader = (await import(`@/widgets/appHeader/i18n/${locale}.json`)).default;
  const appFooter = (await import(`@/widgets/appFooter/i18n/${locale}.json`)).default;
  const promoSection = (await import(`@/widgets/promoSection/i18n/${locale}.json`)).default;

  //pages
  const notFoundPage = await import(`@/_pages/notFoundPage/i18n/${locale}.json`);
  const homePage = await import(`@/_pages/homePage/i18n/${locale}.json`);
  const authPage = await import(`@/_pages/authPage/i18n/${locale}.json`);
  const gameCategoriesPage = await import(`@/_pages/gameCategoriesPage/i18n/${locale}.json`);
  const coursesPage = await import(`@/_pages/coursesPage/i18n/${locale}.json`);
  const ratingPage = await import(`@/_pages/ratingPage/i18n/${locale}.json`);

  //features
  const register = await import(`@/features/auth/register/i18n/${locale}.json`);
  const login = await import(`@/features/auth/login/i18n/${locale}.json`);
  const google = await import(`@/features/auth/google/i18n/${locale}.json`);

  //entities
  const user = await import(`@/entities/user/i18n/${locale}.json`);

  // общий файл перевода
  const messages = deepmerge.all([
    //pages
    notFoundPage,
    homePage,
    authPage,
    gameCategoriesPage,
    coursesPage,
    ratingPage,

    //widgets
    appHeader,
    appFooter,
    promoSection,

    //features
    register,
    login,
    google,

    //entities
    user,
  ]);

  return {
    locale,
    messages,
  };
});
