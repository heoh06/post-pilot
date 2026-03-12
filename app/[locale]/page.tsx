"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import SideBar from "@/components/SideBar";
import GeneratedContent from "@/components/GeneratedContent";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Image from "next/image";

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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="flex items-center justify-between bg-white px-10 h-[60px]">
        <Image src="/logo.png" alt="PostPilot" width={40} height={40} />
        <LanguageSwitcher />
      </header>
      <div className="flex h-full max-w-6xl px-6 pt-10 mx-auto gap-10">
        {/* Header */}
        <SideBar blogPost={blogPost} setBlogPost={setBlogPost} loading={loading} handleGenerate={handleGenerate} />
        {/* Results Section with Tabs */}
        <GeneratedContent result={result} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </main>
  );
}
