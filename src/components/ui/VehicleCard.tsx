import { PRICE_TABLE } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { CAMPAIGN_DISCOUNT_RATE } from "@/lib/vehicles";
import { Cpu, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PremiumButton from "./PremiumButton";

interface VehicleCardProps {
  className?: string;
  image: string;
  name: string;
  capacity: string | number;
  features: string[];
  subText?: string;
  vehicleType?: "vega" | "landHome" | "camroad";
  onClick?: () => void;
  onBookingClick?: () => void;
  isHidden?: boolean;
}

const VehicleCard = ({
  className,
  image,
  name,
  capacity,
  features,
  subText,
  vehicleType,
  onClick,
  onBookingClick,
  isHidden = false,
}: VehicleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "premium-card group h-full transition-all duration-500",
        isHovered ? "scale-[1.02] shadow-gold-lg" : "scale-100",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-700",
            isHovered ? "scale-110" : "scale-100",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jp-black/90 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-noto-serif-jp font-medium text-white mb-2">{name}</h3>
        {subText && <p className="text-jp-silver mb-4 text-sm ml-2">{subText}</p>}

        <div className="flex items-center text-jp-silver mb-4">
          <Users className="gold-icon mr-2 h-4 w-4" />
          <span className="text-sm">{capacity}</span>
        </div>

        <div className="space-y-2 mb-4">
          {features.map((feature, index) => {
            const key = `feature-${index}`;

            return (
              <div
                key={key}
                className={`flex items-center text-jp-silver ${index === 0 && "hidden"}`}
              >
                <Cpu className="gold-icon mr-2 h-4 w-4" />
                <span className="text-sm">{feature}</span>
              </div>
            );
          })}
        </div>

        {!isHidden && vehicleType && (
          <div className="flex items-center justify-between my-4">
            <div>
              <p className="text-sm text-jp-silver">24h</p>
              {CAMPAIGN_DISCOUNT_RATE && CAMPAIGN_DISCOUNT_RATE < 1 ? (
                <>
                  <div className="flex justify-between items-center text-lg font-medium mb-1">
                    <p className="text-white line-through">
                      ¥{PRICE_TABLE[vehicleType].weekday.initial24h.toLocaleString()}~
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-red-500 font-bold text-xl">
                      ¥
                      {Math.round(
                        PRICE_TABLE[vehicleType].weekday.initial24h * CAMPAIGN_DISCOUNT_RATE,
                      ).toLocaleString()}
                      ~
                    </span>
                    <span className="text-jp-silver flex items-center">
                      <span className="text-white bg-red-600 text-xs px-2 py-0.5 rounded mr-2">
                        キャンペーン
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-xl font-medium text-jp-gold">
                  ¥{PRICE_TABLE[vehicleType].weekday.initial24h.toLocaleString()}~
                </p>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-center gap-6">
          {!isHidden && (
            <PremiumButton
              variant="black"
              size="sm"
              onClick={onBookingClick}
              className="transform transition-transform duration-300 group-hover:scale-105"
            >
              予約する
            </PremiumButton>
          )}

          <PremiumButton
            variant="black"
            size="sm"
            onClick={onClick}
            className="transform transition-transform duration-300 group-hover:scale-105"
          >
            詳細を見る
          </PremiumButton>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
