"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  ArrowLeft,
  Maximize
} from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import VehicleGallery from "./VehicleGallery";
import VehicleSpecifications from "./VehicleSpecifications";
import VehicleEquipment from "./VehicleEquipment";
import VehicleRecommendedUse from "./VehicleRecommendedUse";
import VehicleBooking from "./VehicleBooking";

interface VehicleDetailProps {
  vehicle: Vehicle;
}

const VehicleDetail = ({ vehicle }: VehicleDetailProps) => {
  const [activeTab] = useState<string>("specs");
  // 現在は使用していませんが、将来的に使用する予定の状態
  // const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative h-[80vh] min-h-[600px] bg-jp-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={vehicle.images[0].src}
            alt={vehicle.images[0].alt}
            fill
            priority
            className="object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-jp-black/80 via-jp-black/50 to-jp-black" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="premium-container">
            <Link 
              href="/#vehicles" 
              className="inline-flex items-center gap-2 text-jp-silver hover:text-jp-gold transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>車両一覧に戻る</span>
            </Link>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={0}
              className="mb-4"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-noto-serif-jp font-bold text-white mb-3">
                {vehicle.name}
              </h1>
              <p className="text-xl text-jp-silver max-w-3xl">
                {vehicle.description}
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={1}
              className="flex flex-wrap gap-6 md:gap-10 mt-8 mb-6"
            >
              <div className="flex items-center gap-2 text-jp-silver">
                <Users className="gold-icon w-5 h-5" />
                <span>{vehicle.capacity}名様</span>
              </div>
              <div className="flex items-center gap-2 text-jp-silver">
                <Maximize className="gold-icon w-5 h-5" />
                <span>{vehicle.specs.length} × {vehicle.specs.width} × {vehicle.specs.height}</span>
              </div>
              <div className="flex items-center gap-2 text-jp-silver">
                <Calendar className="gold-icon w-5 h-5" />
                <span>{vehicle.specs.year}年式</span>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={2}
              className="flex items-center gap-4 mt-8"
            >
              <div>
                <p className="text-jp-silver text-sm">1泊あたり</p>
                <p className="text-3xl font-bold text-jp-gold">¥{vehicle.pricePerNight.toLocaleString()}</p>
              </div>
              <a 
                href="#booking" 
                className="px-8 py-4 bg-jp-gold text-jp-black font-bold rounded-full hover:bg-jp-gold/90 transition-colors"
              >
                予約する
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ギャラリーセクション */}
      <section className="py-16 bg-jp-darkgray/30">
        <div className="premium-container">
          <h2 className="text-2xl md:text-3xl font-noto-serif-jp font-bold text-white mb-8">
            ギャラリー
          </h2>
          <VehicleGallery images={vehicle.images} videoTour={vehicle.videoTour} />
        </div>
      </section>

      {/* タブコンテンツ */}
      <section className="py-16 bg-jp-black">
        <div className="premium-container">
          {activeTab === "specs" && (
            <VehicleSpecifications 
              vehicle={vehicle} 
              features={vehicle.detailedFeatures} 
              specs={vehicle.specs} 
              floorPlan={vehicle.floorPlan}
            />
          )}
          
          {activeTab === "equipment" && (
            <VehicleEquipment equipment={vehicle.equipment} />
          )}
          
          {activeTab === "recommended" && (
            <VehicleRecommendedUse recommendedUse={vehicle.recommendedUse} />
          )}
        </div>
      </section>

      {/* 予約セクション */}
      <section id="booking" className="py-16 bg-jp-darkgray/30">
        <div className="premium-container">
          <h2 className="text-2xl md:text-3xl font-noto-serif-jp font-bold text-white mb-8">
            空き状況・予約
          </h2>
          <VehicleBooking vehicle={vehicle} />
        </div>
      </section>
    </>
  );
};

export default VehicleDetail;
