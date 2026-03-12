import OpenAI from "openai";

function getOpenAI(): OpenAI {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY is not configured");
  return new OpenAI({ apiKey: key });
}

const GENERATE_PROMPT = `You are an expert SEO editor and social media content creator.

Rewrite the blog post for SEO optimization and create social-ready content.

Return EXACTLY in this format (do not omit any section):

Title:
Meta Description:
Tags:

SEO Optimized Korean Version:

English Version:

---
Twitter Thread (write 3-5 tweets for a thread, each under 280 characters; start each tweet with "TWEET:" on its own line):
TWEET:
(first tweet text)
TWEET:
(second tweet text)
TWEET:
(third tweet text)
---
LinkedIn Post:
(one professional LinkedIn post summarizing or expanding on the blog, with line breaks and optional hashtags)

Blog post:
`;

export type GenerateResult = {
  title: string;
  metaDescription: string;
  tags: string;
  seoOptimizedKorean: string;
  englishVersion: string;
  twitterThread: string[];
  linkedInPost: string;
};

export async function generateSEOContent(content: string): Promise<GenerateResult> {
  const openai = getOpenAI();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: GENERATE_PROMPT + content,
      },
    ],
  });

  const text =
    completion.choices[0]?.message?.content?.trim() ?? "";

  const titleMatch = text.match(/Title:\s*([\s\S]*?)(?=Meta Description:)/i);
  const metaMatch = text.match(/Meta Description:\s*([\s\S]*?)(?=Tags:)/i);
  const tagsMatch = text.match(/Tags:\s*([\s\S]*?)(?=SEO Optimized Korean Version:)/i);
  const koreanMatch = text.match(/SEO Optimized Korean Version:\s*([\s\S]*?)(?=English Version:)/i);
  const englishMatch = text.match(/English Version:\s*([\s\S]*?)(?=---)/i);
  const twitterSection = text.match(/---\s*Twitter Thread[\s\S]*?---\s*([\s\S]*?)---/i);
  const linkedInMatch = text.match(/LinkedIn Post:\s*([\s\S]*?)$/i);

  const twitterRaw = twitterSection?.[1]?.trim() ?? "";
  const twitterThread = twitterRaw
    .split(/\nTWEET:\s*\n?/i)
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    title: titleMatch?.[1]?.trim() ?? "",
    metaDescription: metaMatch?.[1]?.trim() ?? "",
    tags: tagsMatch?.[1]?.trim() ?? "",
    seoOptimizedKorean: koreanMatch?.[1]?.trim() ?? "",
    englishVersion: englishMatch?.[1]?.trim() ?? "",
    twitterThread,
    linkedInPost: linkedInMatch?.[1]?.trim() ?? "",
  };
}
