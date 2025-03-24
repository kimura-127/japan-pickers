import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

interface FeatureCardProps {
  className?: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

const FeatureCard = ({ className, icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:shadow-gold-lg group",
        className,
      )}
    >
      <div className="rounded-full bg-jp-darkgray p-3 inline-flex items-center justify-center mb-4 border border-jp-gold/20 group-hover:border-jp-gold/50 transition-all duration-300">
        <Icon className="h-8 w-8 text-jp-gold" />
      </div>

      <h3 className="text-xl font-noto-serif-jp font-medium text-white mb-2 group-hover:text-jp-gold transition-colors duration-300">
        {title}
      </h3>

      <p className="text-jp-silver">{description}</p>
    </div>
  );
};

export default FeatureCard;
