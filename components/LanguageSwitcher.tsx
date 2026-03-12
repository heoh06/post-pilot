"use client";

import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 dark:border-neutral-800 dark:bg-neutral-900">
      <Link
        href={pathname}
        locale="en"
        className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="kr"
        className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
      >
        KR
      </Link>
    </div>
  );
}
