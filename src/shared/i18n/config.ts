import { getRequestConfig } from "next-intl/server";

export const locales = ["tm", "ru"];

export const defaultLocale = "tm";

export const getLocaleConfig = () => {
  return getRequestConfig(async ({ locale }) => ({
  messages: null,
  locale: ''
}));
}
