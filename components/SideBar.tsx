import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { BlogInput } from "./BlogInput";
import { LanguageSwitcher } from "./LanguageSwitcher"

type SideBarProps = {
  blogPost: string;
  setBlogPost: (blogPost: string) => void;
  loading: boolean;
  handleGenerate: () => void;
}

const SideBar = ({ blogPost, setBlogPost, loading, handleGenerate }: SideBarProps) => {
  const t = useTranslations();

  return (
    <nav>
      <LanguageSwitcher />
      <header className="mb-12 flex items-start justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 sm:mx-0">
            {t("description")}
          </p>
        </div>
      </header>
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
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          {loading ? t("loading") : t("generateButton")}
        </button>
      </div>
    </nav>
  )
}

export default SideBar;