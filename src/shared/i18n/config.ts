export const locales = ["ru", "tk"] as const;
export const defaultLocale: (typeof locales)[number] = "tk"
export const LOCALE_COOKIE_NAME = "app_locale";