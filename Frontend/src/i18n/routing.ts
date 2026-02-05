import { defaultLocale } from "@/constants/languages";
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: defaultLocale
});