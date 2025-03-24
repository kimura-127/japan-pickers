import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-24 bg-jp-black">
        <div className="premium-container text-center">
          <h1 className="text-4xl md:text-5xl font-noto-serif-jp font-bold text-white mb-6">
            車両が見つかりません
          </h1>
          <p className="text-jp-silver text-lg mb-8">
            お探しの車両情報は見つかりませんでした。
            <br />
            URLが正しいかご確認ください。
          </p>
          <Link
            href="/#vehicles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-jp-gold text-jp-black font-medium rounded-full transition-all hover:bg-jp-gold/90"
          >
            <ArrowLeft className="w-5 h-5" />
            車両一覧に戻る
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
