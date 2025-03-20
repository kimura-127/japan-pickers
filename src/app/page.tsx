import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import VehicleSection from "@/components/sections/VehicleSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PlanSection from "@/components/sections/PlanSection";
import BookingSection from "@/components/sections/BookingSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "ジャパンピッカーズ | プレミアムキャンピングカーレンタル",
  description: "群馬県のプレミアムキャンピングカーレンタル「ジャパンピッカーズ」。最高級の装備と丁寧なサポートで、特別な旅の体験をご提供します。",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <VehicleSection />
        <FeaturesSection />
        <PlanSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
