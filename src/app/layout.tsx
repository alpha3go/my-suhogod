import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MY SUHOGOD - 나만의 수호천사",
  description: "생년월일과 시간을 분석하여 당신만을 위한 수호천사를 만들어보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-gradient-to-b from-purple-50 to-white"
      >
        {children}
      </body>
    </html>
  );
}
