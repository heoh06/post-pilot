"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import Card from "./ui/card";

interface TweetCardProps {
  content: string;
  index: number;
}

export function TweetCard({ content, index }: TweetCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className="font-semibold text-gray-900">Tweet {index}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
        {content}
      </p>
    </Card>
  );
}
