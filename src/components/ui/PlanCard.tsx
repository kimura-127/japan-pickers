import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import PremiumButton from "./PremiumButton";
import Image from "next/image";

interface PlanCardProps {
  className?: string;
  image: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  onClick?: () => void;
}

const PlanCard = ({
  className,
  image,
  title,
  duration,
  description,
  highlights,
  onClick,
}: PlanCardProps) => {
  return (
    <div className={cn(
      "premium-card group hover:shadow-gold-lg transition-all duration-500",
      className
    )}>
      <div className="relative overflow-hidden h-56">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jp-black/90 via-jp-black/50 to-transparent" />
        
        <div className="absolute bottom-4 left-4 flex items-center text-white bg-jp-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-jp-gold/30">
          <CalendarDays className="h-4 w-4 text-jp-gold mr-2" />
          <span className="text-sm">{duration}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-noto-serif-jp font-medium text-white mb-2 group-hover:text-jp-gold transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-jp-silver mb-4 text-sm">
          {description}
        </p>
        
        <div className="space-y-2 mb-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start">
              <span className="text-jp-gold mr-2 text-lg">•</span>
              <span className="text-sm text-jp-silver">{highlight}</span>
            </div>
          ))}
        </div>
        
        <PremiumButton
          onClick={onClick}
          size="sm"
          className="w-full"
        >
          このプランで予約
        </PremiumButton>
      </div>
    </div>
  );
};

export default PlanCard;
