import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/shared/i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export default intlMiddleware;
