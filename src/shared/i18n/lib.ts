"use server";
import { headers } from "next/headers";

import Negotiator from "negotiator";

import { defaultLocale } from "./config";

export const getBrowserLocaleOnServer = async () => {
  const acceptLanguage = (await headers()).get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const language = new Negotiator({
    headers: { "accept-language": acceptLanguage },
  }).language();

  if (language) {
    return language.split("-")[0];
  } else {
    return defaultLocale;
  }
};
