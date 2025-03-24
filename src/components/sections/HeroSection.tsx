"use client";

import { useEffect, useState, useRef } from "react";
import PremiumButton from "../ui/PremiumButton";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Handle scroll events
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);
  
  // Parallax effect for background
  const calculateParallax = (baseValue: number, intensity = 0.15) => {
    if (!isClient) return baseValue;
    return baseValue - scrollY * intensity;
  };
  
  // Scroll to next section
  const scrollToNextSection = () => {
    if (!isClient || !sectionRef.current) return;
    
    const nextSection = sectionRef.current.nextElementSibling as HTMLElement;
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth"
      });
    }
  };
  
  // Create floating particles
  useEffect(() => {
    if (!isClient || !particlesRef.current) return;
    
    // Clear any existing particles
    particlesRef.current.innerHTML = '';
    
    // Save a reference to particlesRef.current to use in cleanup function
    const particlesElement = particlesRef.current;
    
    // Create new particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute bg-white rounded-full opacity-20";
      const size = Number(Math.random() * 5 + 1);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Convert number to string for animation duration
      const animationDuration = `${Math.random() * 10 + 10}s`;
      particle.style.animation = `float ${animationDuration} linear infinite`;
      
      particlesElement.appendChild(particle);
    }
    
    return () => {
      if (particlesElement) {
        particlesElement.innerHTML = '';
      }
    };
  }, [isClient]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{
        background: "linear-gradient(to bottom, #121212, #1A1A1A)",
      }}
    >
      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && [1, 2, 3, 4, 5].map((_, index) => {
          // Generate unique key using a more meaningful identifier
          const uniqueKey = `bg-circle-${index}`;
          const size = 300 + index * 100;
          const posX = 50 + (index % 2 === 0 ? -30 : 30) * (index + 1);
          const posY = 50 + (index % 3 === 0 ? -20 : 20) * (index + 1);
          const opacity = 0.03 - index * 0.005;
          
          return (
            <div
              key={uniqueKey}
              className="absolute rounded-full border border-jp-gold opacity-5"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `calc(${posX}% - ${size / 2}px)`,
                top: `calc(${posY}% - ${size / 2}px)`,
                transform: `translateY(${calculateParallax(0, 0.05 * (index + 1))}px)`,
                opacity: `${opacity}`
              }}
            />
          );
        })}
      </div>
      
      {/* Content */}
      <div className="premium-container relative z-10 text-center px-4">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 gold-gradient-text"
          style={{
            transform: isClient ? `translateY(${calculateParallax(0, 0.2)}px)` : 'none',
          }}
        >
          群馬県 プレミアムキャンピングカーレンタル
        </h1>
        
        <p 
          className="text-jp-silver text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
          style={{
            transform: isClient ? `translateY(${calculateParallax(0, 0.15)}px)` : 'none',
          }}
        >
          群馬県で高品質なキャンピングカー・レンタカーサービスを提供。
          最高級の装備と快適な車内空間で、忘れられない自然の旅をお楽しみいただけます。
        </p>
        
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          style={{
            transform: isClient ? `translateY(${calculateParallax(0, 0.1)}px)` : 'none',
          }}
        >
          <PremiumButton 
            withShimmer
            onClick={() => {
              if (!isClient) return;
              const vehiclesSection = document.getElementById("vehicles");
              if (vehiclesSection) {
                vehiclesSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            今すぐ予約する
          </PremiumButton>
          
          <PremiumButton 
            variant="black"
            onClick={() => {
              if (!isClient) return;
              const plansSection = document.getElementById("plans");
              if (plansSection) {
                plansSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            プランを見る
          </PremiumButton>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        type="button"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce bg-transparent border-none"
        onClick={scrollToNextSection}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            scrollToNextSection();
          }
        }}
        aria-label="次のセクションへスクロール"
      >
        <ChevronDown className="h-8 w-8 text-jp-gold" />
      </button>
    </section>
  );
};

export default HeroSection;
