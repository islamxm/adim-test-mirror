import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/shared/i18n';
 
export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true
});
 
export const config = {
  // Игнорируем API, статические файлы и служебные пути Next.js
  matcher: ['/((?!api|_next|.*\\..*).*)']
};