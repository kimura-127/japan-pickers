"use client";

import { PRICE_TABLE } from "@/lib/pricing";
import type { Vehicle } from "@/lib/vehicles";
import { CAMPAIGN_DISCOUNT_RATE } from "@/lib/vehicles";
import { motion } from "framer-motion";
import { Maximize, Users } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
// import VehicleBooking from "./VehicleBooking";
import VehicleEquipment from "./VehicleEquipment";
import VehicleGallery from "./VehicleGallery";
import { VehiclePricing } from "./VehiclePricing";
import VehicleSpecifications from "./VehicleSpecifications";

interface VehicleDetailProps {
  vehicle: Vehicle;
}

const VehicleDetail = ({ vehicle }: VehicleDetailProps) => {
  // 現在は使用していませんが、将来的に使用する予定の状態
  // const [activeTab, setActiveTab] = useState<string>("specs");
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
      <section className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] min-h-[500px] bg-jp-black">
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

        <div className="relative z-10 h-full flex flex-col justify-center pb-8 md:pb-12">
          <div className="premium-container mt-10 px-4 sm:px-6 md:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={0}
              className="mb-2 sm:mb-3 md:mb-4"
            >
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-noto-serif-jp font-bold text-white mb-2 sm:mb-3">
                {vehicle.name}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-jp-silver max-w-3xl">
                {vehicle.description}
              </p>

              {vehicle.isHidden && (
                <p className="text-xs sm:text-sm md:text-base text-jp-silver max-w-3xl">
                  {vehicle.shortDescription}
                </p>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={1}
              className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 lg:gap-10 mb-4 sm:mb-5 md:mb-6"
            >
              <div className="flex items-center gap-2 text-jp-silver">
                <Users className="gold-icon w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{vehicle.capacity}名様</span>
              </div>
              {vehicle.specs.length && vehicle.specs.width && vehicle.specs.height && (
                <div className="flex items-center gap-2 text-jp-silver">
                  <Maximize className="gold-icon w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">
                    {vehicle.specs.length} × {vehicle.specs.width} × H{vehicle.specs.height}cm
                  </span>
                </div>
              )}
            </motion.div>

            {!vehicle.isHidden && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={2}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div>
                  <p className="text-xs sm:text-sm text-jp-silver">24h</p>
                  {CAMPAIGN_DISCOUNT_RATE ? (
                    <>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white line-through mb-1">
                        ¥{PRICE_TABLE[vehicle.vehicleType].weekday.initial24h.toLocaleString()}~
                      </p>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500">
                          ¥
                          {Math.round(
                            PRICE_TABLE[vehicle.vehicleType].weekday.initial24h *
                              CAMPAIGN_DISCOUNT_RATE,
                          ).toLocaleString()}
                          ~
                        </p>
                        <span className="text-jp-silver flex items-center">
                          <span className="text-white bg-red-600 text-xs px-2 py-0.5 rounded mr-2">
                            キャンペーン
                          </span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-jp-gold">
                      ¥{PRICE_TABLE[vehicle.vehicleType].weekday.initial24h.toLocaleString()}~
                    </p>
                  )}
                </div>
                <a
                  href="#booking"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-jp-gold text-jp-black font-bold rounded-full hover:bg-jp-gold/90 transition-colors text-sm sm:text-base"
                >
                  予約する
                </a>
              </motion.div>
            )}
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
          <VehicleSpecifications
            features={vehicle.detailedFeatures}
            specs={vehicle.specs}
            isHidden={vehicle.isHidden}
          />

          <VehicleEquipment equipment={vehicle.equipment} isHidden={vehicle.isHidden} />
        </div>
      </section>

      {/* 予約セクション */}
      {/* <section id="booking" className="py-16 bg-jp-darkgray/30">
        <div className="premium-container">
          <h2 className="text-2xl md:text-3xl font-noto-serif-jp font-bold text-white mb-8">
            空き状況・予約
          </h2>
          <VehicleBooking vehicle={vehicle} />
        </div>
      </section> */}

      {/* 料金テーブルセクション */}
      {!vehicle.isHidden && (
        <section className="py-16 bg-jp-black">
          <div className="premium-container">
            <h2 className="text-2xl md:text-3xl font-noto-serif-jp font-bold text-white mb-8">
              料金システム
            </h2>
            <VehiclePricing pricingPlan={vehicle.pricingPlan} />
          </div>
        </section>
      )}
    </>
  );
};

export default VehicleDetail;
