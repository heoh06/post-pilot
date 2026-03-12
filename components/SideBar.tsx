import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { BlogInput } from "./BlogInput";
import { LanguageSwitcher } from "./LanguageSwitcher"
import Image from "next/image";

type SideBarProps = {
  blogPost: string;
  setBlogPost: (blogPost: string) => void;
  loading: boolean;
  handleGenerate: () => void;
}

const SideBar = ({ blogPost, setBlogPost, loading, handleGenerate }: SideBarProps) => {
  const t = useTranslations();

  return (
    <nav className="bg-white p-6 rounded-xl min-w-64 max-w-[320px] h-fit sticky top-0">
      {/* Title and Description */}
      <div className="mb-12 flex items-start justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mx-auto mt-1 max-w-2xl text-gray-600 sm:mx-0">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Main Input Area */}
      <section className="mb-8">
        <BlogInput
          value={blogPost}
          onChange={setBlogPost}
          loading={loading}
        />
      </section>

      {/* Generate Button - centered, with loader */}
      <div className="mb-8 flex justify-center">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !blogPost.trim()}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 w-full justify-center py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl hover:from-red-700 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50 duration-700"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          {loading ? t("loading") : t("generateButton")}
        </button>
      </div>
    </nav>
  )
}

export default SideBar;