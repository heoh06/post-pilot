import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

const Pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "PostPilot",
  description:
    "AI-powered tool that transforms blog posts into SEO-optimized content and polished to SNS friendly content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Pretendard.variable} font-pretendard antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
