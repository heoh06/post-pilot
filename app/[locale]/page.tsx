"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { LinkedInCard } from "@/components/LinkedInCard";
import { ResultCard } from "@/components/ResultCard";
import SideBar from "@/components/SideBar";
import { TweetCard } from "@/components/TweetCard";

type TabType = "seo" | "twitter" | "linkedin";

type GenerateResult = {
  title: string;
  metaDescription: string;
  tags: string;
  seoOptimizedKorean: string;
  englishVersion: string;
  twitterThread: string[];
  linkedInPost: string;
};

export default function HomePage() {
  const t = useTranslations();
  const [blogPost, setBlogPost] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("seo");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);

  // Generating the content
  const handleGenerate = async () => {
    if (!blogPost.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: blogPost }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText);
      }
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({
        title: "",
        metaDescription: "",
        tags: "",
        seoOptimizedKorean: "",
        englishVersion:
          "Error: " + (e instanceof Error ? e.message : "Generation failed"),
        twitterThread: [],
        linkedInPost: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <SideBar blogPost={blogPost} setBlogPost={setBlogPost} loading={loading} handleGenerate={handleGenerate} />

        {/* Results Section with Tabs */}
        {result && (
          <section className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveTab("seo")}
                  className={`rounded-lg px-6 py-2 font-medium transition-all ${activeTab === "seo"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {t("tabSeo")}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("twitter")}
                  className={`rounded-lg px-6 py-2 font-medium transition-all ${activeTab === "twitter"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {t("tabTwitter")}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("linkedin")}
                  className={`rounded-lg px-6 py-2 font-medium transition-all ${activeTab === "linkedin"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {t("tabLinkedIn")}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "seo" && (
                <div className="space-y-4">
                  <ResultCard title={t("seoTitle")} content={result.title} />
                  <ResultCard
                    title={t("metaDescription")}
                    content={result.metaDescription}
                  />
                  <ResultCard title={t("tags")} content={result.tags} />
                  <ResultCard
                    title={t("koreanVersion")}
                    content={result.seoOptimizedKorean}
                  />
                  <ResultCard
                    title={t("englishVersion")}
                    content={result.englishVersion}
                  />
                </div>
              )}

              {activeTab === "twitter" && (
                <div className="space-y-4">
                  {result.twitterThread.length > 0 ? (
                    result.twitterThread.map((tweet, index) => (
                      <TweetCard
                        key={index}
                        content={tweet}
                        index={index + 1}
                      />
                    ))
                  ) : (
                    <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-500">
                      No Twitter thread generated.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "linkedin" && (
                <div className="flex justify-center">
                  <LinkedInCard content={result.linkedInPost} />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
