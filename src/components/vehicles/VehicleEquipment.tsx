"use client";

import type { VehicleEquipment as EquipmentType } from "@/lib/vehicles";
import { motion } from "framer-motion";
import { Bed, Check, Tent, Thermometer, Tv, UtensilsCrossed } from "lucide-react";

interface VehicleEquipmentProps {
  equipment: EquipmentType;
}

const VehicleEquipment = ({ equipment }: VehicleEquipmentProps) => {
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

  const categories = [
    { key: "kitchen", name: "キッチン設備", icon: <UtensilsCrossed className="w-6 h-6" /> },
    { key: "bathroom", name: "バス・トイレ", icon: <Bed className="w-6 h-6" /> },
    { key: "bedroom", name: "寝室・ベッド", icon: <Bed className="w-6 h-6" /> },
    { key: "climate", name: "空調・暖房", icon: <Thermometer className="w-6 h-6" /> },
    { key: "entertainment", name: "エンターテイメント", icon: <Tv className="w-6 h-6" /> },
    { key: "outdoor", name: "アウトドア装備", icon: <Tent className="w-6 h-6" /> },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-noto-serif-jp font-bold text-white mb-8">
        設備・内装
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const key = category.key as keyof EquipmentType;
          const items = equipment[key];

          return (
            <motion.div
              key={category.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={index}
              className="bg-jp-darkgray/30 rounded-xl p-6 border border-jp-darkgray/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="gold-icon p-3 bg-jp-black/50 rounded-full">{category.icon}</div>
                <h3 className="text-xl font-medium text-white">{category.name}</h3>
              </div>

              <ul className="space-y-3">
                {items?.map((item, itemIndex) => {
                  const key = `${category.key}-${itemIndex}`;

                  return (
                    <li key={key} className="flex items-start gap-2 text-jp-silver">
                      <Check className="gold-icon w-5 h-5 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleEquipment;
