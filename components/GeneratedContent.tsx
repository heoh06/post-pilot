import { useTranslations } from "next-intl";
import { ResultCard } from "./ResultCard";
import { TweetCard } from "./TweetCard";
import { LinkedInCard } from "./LinkedInCard";
import { GenerateResult } from "@/lib/openai";
import TabButton from "./ui/tab-button";
import Card from "./ui/card";
type TabType = "seo" | "twitter" | "linkedin";

type GeneratedContentProps = {
  result: GenerateResult | null;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const GeneratedContent = ({ result, activeTab, setActiveTab }: GeneratedContentProps) => {
  const t = useTranslations();

  return (
    <section className="size-full">
      {/* Tab Navigation */}
      <div className="flex justify-center pb-5">
        <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          <TabButton
            onClick={() => setActiveTab("seo")}
            active={activeTab === "seo"}
          >
            {t("tabSeo")}
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("twitter")}
            active={activeTab === "twitter"}
          >
            {t("tabTwitter")}
          </TabButton>
          <TabButton
            onClick={() => setActiveTab("linkedin")}
            active={activeTab === "linkedin"}
          >
            {t("tabLinkedIn")}
          </TabButton>
        </div>
      </div>
      <div className="space-y-6 h-full">

        {/* Tab Content */}
        <section className="w-full">
          <div className="space-y-4">
            {result ? <>
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
            </> : <Card>
              <p className="text-center text-gray-800">
                {t("noResult")}
              </p></Card>}
          </div>
        </section>
      </div>
    </section>
  )
}

export default GeneratedContent;