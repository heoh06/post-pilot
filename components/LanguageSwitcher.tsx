"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const locales = [
  { value: "en" as const, label: "EN" },
  { value: "kr" as const, label: "KR" },
] as const;

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="relative grid grid-cols-2 items-center gap-0 rounded-full border border-gray-300 bg-gray-200 p-1 shadow-sm">
      {/* Sliding pill background */}
      <div
        className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-gradient-to-r bg-white transition-[transform] duration-500 ease-out shadow-md"
        style={{
          width: "calc(50% - 4px)",
          left: "4px",
          transform: locale === "kr" ? "translateX(100%)" : "translateX(0)",
        }}
        aria-hidden
      />
      {locales.map(({ value, label }) => (
        <Link
          key={value}
          href={pathname}
          locale={value}
          className={`relative z-10 flex min-w-[2.5rem] items-center justify-center rounded-full py-1 text-xs font-medium transition-colors duration-200 ease-out ${locale === value
            ? "text-gray-900"
            : "text-gray-600 hover:text-gray-900"
            }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
