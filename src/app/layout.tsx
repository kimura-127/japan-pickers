import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ジャパンピッカーズ | 群馬県のキャンピングカーレンタル・レンタカーサービス",
  description:
    "群馬県で最高級のキャンピングカーレンタル・レンタカーを提供する「ジャパンピッカーズ」。快適な車内空間と充実した装備で、特別な旅の思い出を作りませんか。",
  keywords: "キャンピングカー, レンタル, 群馬, レンタカー, ジャパンピッカーズ, アウトドア, 旅行",
  openGraph: {
    title: "ジャパンピッカーズ | 群馬県のキャンピングカーレンタル・レンタカーサービス",
    description:
      "群馬県で最高級のキャンピングカーレンタル・レンタカーを提供する「ジャパンピッカーズ」。快適な車内空間と充実した装備で、特別な旅の思い出を作りませんか。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="CJZs3NCDwFV0OmcBMYfqxSj7hOQGDIVZaQF7JjO93cY" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
