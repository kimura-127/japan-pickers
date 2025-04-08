import { cn } from "@/lib/utils";
import Image from "next/image";

interface PlanCardProps {
  className?: string;
  image: string;
  title: string;
  duration: string;
  description: string;
}

const PlanCard = ({ className, image, title, duration, description }: PlanCardProps) => {
  return (
    <div
      className={cn(
        "premium-card group hover:shadow-gold-lg transition-all duration-500",
        className,
      )}
    >
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
          <span className="text-sm">{duration}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-noto-serif-jp font-medium text-white mb-2 group-hover:text-jp-gold transition-colors duration-300">
          {title}
        </h3>

        <p className="text-jp-silver mb-4 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PlanCard;
