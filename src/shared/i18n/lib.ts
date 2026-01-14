"use server";
import { headers } from "next/headers";

import Negotiator from "negotiator";

import { defaultLocale, locales } from "./config";

export const getBrowserLocaleOnServer = async () => {
  const acceptLanguage = (await headers()).get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const language = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).language();

  if (language) {
    const broswerLocale = language.split("-")[0];
    if (locales.includes(broswerLocale as any)) {
      return broswerLocale;
    } else {
      return defaultLocale;
    }
  } else {
    return defaultLocale;
  }
};
