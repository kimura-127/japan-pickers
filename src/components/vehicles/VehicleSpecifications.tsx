"use client";

import { motion } from "framer-motion";
// import Image from "next/image";
import {
  Ruler,
  Fuel,
  Calendar,
  Car,
  Gauge,
  Users,
  Bed,
  Info
} from "lucide-react";
import { VehicleFeature, VehicleSpec } from "@/lib/vehicles";
import { JSX } from "react";

interface VehicleSpecificationsProps {
  // vehicle: Vehicle;
  features: VehicleFeature[];
  specs: VehicleSpec;
  // floorPlan?: string;
}

const VehicleSpecifications = ({
  // vehicle, 
  features,
  specs,
  // floorPlan 
}: VehicleSpecificationsProps) => {
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

  // アイコンを取得する関数
  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      "chef-hat": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chef-hat"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" /><line x1="6" x2="18" y1="17" y2="17" /></svg>,
      "shower-head": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shower-head"><path d="m4 4 2.5 2.5" /><path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" /><path d="M15 5 5 15" /><path d="M14 17v.01" /><path d="M10 16v.01" /><path d="M13 13v.01" /><path d="M16 10v.01" /><path d="M11 20v.01" /><path d="M17 14v.01" /><path d="M20 11v.01" /></svg>,
      "thermometer": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thermometer"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" /></svg>,
      "sun": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>,
      "bed": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bed"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>,
      "music": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
      "speaker": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-speaker"><rect width="16" height="20" x="4" y="2" rx="2" /><circle cx="12" cy="14" r="4" /><circle cx="12" cy="7" r="1" /></svg>,
      "maximize": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg>,
      "sofa": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sofa"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" /></svg>,
      "laptop": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-laptop"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></svg>,
      "wine": <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wine"><path d="M8 22h8" /><path d="M7 10h10" /><path d="M12 15v7" /><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" /></svg>,
    };

    return icons[iconName] || <Info className="w-6 h-6" />;
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-noto-serif-jp font-bold text-white mb-8">
        基本情報・特徴
      </h2>

      {/* 特徴セクション */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={index}
            className="bg-jp-darkgray/30 rounded-xl p-6 border border-jp-darkgray/50"
          >
            <div className="flex items-start gap-4">
              <div className="gold-icon p-3 bg-jp-black/50 rounded-full">
                {getIcon(feature.icon)}
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">{feature.name}</h3>
                <p className="text-jp-silver">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 仕様セクション */}
      <div className="mb-16">
        <h3 className="text-xl font-noto-serif-jp font-bold text-white mb-6">
          車両スペック
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50">
            <div className="flex items-center gap-3 mb-2">
              <Ruler className="gold-icon w-5 h-5" />
              <h4 className="text-white">寸法</h4>
            </div>
            <p className="text-jp-silver">{specs.length} × {specs.width} × {specs.height}</p>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50">
            <div className="flex items-center gap-3 mb-2">
              <Fuel className="gold-icon w-5 h-5" />
              <h4 className="text-white">エンジン</h4>
            </div>
            <p className="text-jp-silver">{specs.engine}</p>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="gold-icon w-5 h-5" />
              <h4 className="text-white">燃費</h4>
            </div>
            <p className="text-jp-silver">{specs.fuelEfficiency}</p>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="gold-icon w-5 h-5" />
              <h4 className="text-white">年式・走行距離</h4>
            </div>
            <p className="text-jp-silver">{specs.year}年式 / {specs.mileage}</p>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50">
            <div className="flex items-center gap-3 mb-2">
              <Car className="gold-icon w-5 h-5" />
              <h4 className="text-white">駆動方式</h4>
            </div>
            <p className="text-jp-silver">{specs.driveType}</p>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50">
            <div className="flex items-center gap-3 mb-2">
              <Users className="gold-icon w-5 h-5" />
              <h4 className="text-white">定員</h4>
            </div>
            <p className="text-jp-silver">{specs.capacity}名</p>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50">
            <div className="flex items-center gap-3 mb-2">
              <Bed className="gold-icon w-5 h-5" />
              <h4 className="text-white">就寝人数</h4>
            </div>
            <p className="text-jp-silver">{specs.sleepingCapacity}名</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecifications;
