"use client";

import type { RecommendedUse } from "@/lib/vehicles";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, MapPin, Users } from "lucide-react";
import Image from "next/image";

interface VehicleRecommendedUseProps {
  recommendedUse: RecommendedUse;
}

const VehicleRecommendedUse = ({ recommendedUse }: VehicleRecommendedUseProps) => {
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

  const seasons = [
    { name: "春", items: recommendedUse.seasonalAdvice.filter((a) => a.startsWith("春：")) },
    { name: "夏", items: recommendedUse.seasonalAdvice.filter((a) => a.startsWith("夏：")) },
    { name: "秋", items: recommendedUse.seasonalAdvice.filter((a) => a.startsWith("秋：")) },
    { name: "冬", items: recommendedUse.seasonalAdvice.filter((a) => a.startsWith("冬：")) },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-noto-serif-jp font-bold text-white mb-8">
        利用シーン
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* 推奨グループサイズ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="bg-jp-darkgray/30 rounded-xl p-6 border border-jp-darkgray/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-icon p-3 bg-jp-black/50 rounded-full">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-white">おすすめ利用人数</h3>
          </div>

          <p className="text-jp-silver text-lg">{recommendedUse.idealGroupSize}</p>
        </motion.div>

        {/* おすすめ旅行コース */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={1}
          className="bg-jp-darkgray/30 rounded-xl p-6 border border-jp-darkgray/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="gold-icon p-3 bg-jp-black/50 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-white">おすすめ旅行コース</h3>
          </div>

          <ul className="space-y-2">
            {recommendedUse.recommendedTrips.map((trip, index) => (
              <li key={index} className="flex items-start gap-2 text-jp-silver">
                <CheckCircle className="gold-icon w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{trip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* 季節別アドバイス */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        custom={2}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="gold-icon p-3 bg-jp-black/50 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-medium text-white">季節別利用アドバイス</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasons.map((season) => (
            <div
              key={season.name}
              className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50"
            >
              <h4 className="text-lg font-medium text-white mb-3">{season.name}</h4>
              <ul className="space-y-2">
                {season.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-jp-silver text-sm">
                    {item.replace(`${season.name}：`, "")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 利用イメージ写真 */}
      {recommendedUse.images.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={3}
        >
          <h3 className="text-xl font-medium text-white mb-6">利用イメージ</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedUse.images.map((image, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-jp-black/80 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-white font-medium">
                  {image.alt}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VehicleRecommendedUse;
