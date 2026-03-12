import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "kr"],
  defaultLocale: "en",
  localePrefix: "always",
});
