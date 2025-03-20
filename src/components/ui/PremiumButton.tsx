"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "black";
  size?: "sm" | "md" | "lg";
  withShimmer?: boolean;
}

const PremiumButton = forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, variant = "gold", size = "md", withShimmer = false, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-jp-gold focus:ring-opacity-50";
    
    const variantClasses = {
      gold: "bg-jp-gold text-jp-black hover:bg-jp-gold-light shadow-gold-md hover:shadow-gold-lg",
      black: "bg-jp-darkgray text-jp-gold border border-jp-gold hover:bg-jp-darkgray/80 shadow-gold-md hover:shadow-gold-lg",
    };
    
    const sizeClasses = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          withShimmer && "gold-shimmer",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";

export default PremiumButton;
