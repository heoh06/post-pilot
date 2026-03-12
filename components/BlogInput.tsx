"use client";

import { useTranslations } from "next-intl";

type BlogInputProps = {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
};

export function BlogInput({
  value,
  onChange,
  loading,
}: BlogInputProps) {
  const t = useTranslations();

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t("pasteBlogPost")}
      className="h-64 w-full resize-none rounded-xl border border-gray-200 bg-white p-6 text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={loading}
    />
  );
}
