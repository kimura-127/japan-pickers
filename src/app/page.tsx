import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import BookingSection from "@/components/sections/BookingSection";
import ContactSection from "@/components/sections/ContactSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";
import OtherVehicleSection from "@/components/sections/OtherVehicleSection";
import PlanSection from "@/components/sections/PlanSection";
import VehicleSection from "@/components/sections/VehicleSection";

export const metadata = {
  title: "群馬県のキャンピングカーレンタル・レンタカー | ジャパンピッカーズ",
  description:
    "群馬県で最高級のキャンピングカーレンタル・レンタカーを提供するジャパンピッカーズ。充実した装備と丁寧なサポートで、特別な旅の体験をご提供します。キャンピングカーでのアウトドア体験を群馬で満喫しませんか。",
  alternates: {
    canonical: "https://japan-pickers.com/",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <VehicleSection /> {/* 車両 */}
        <OtherVehicleSection /> {/* おもしろ車両 */}
        <PlanSection /> {/* おすすめオプション */}
        <FeaturesSection /> {/* 借りるメリット */}
        <BookingSection /> {/* 予約 */}
        <ContactSection /> {/* お問い合わせ */}
      </main>
      <Footer />
    </div>
  );
}
