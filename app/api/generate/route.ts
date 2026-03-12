import { NextResponse } from "next/server";

import { generateSEOContent } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const content = body?.content;

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "content is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const result = await generateSEOContent(content);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 }
    );
  }
}
