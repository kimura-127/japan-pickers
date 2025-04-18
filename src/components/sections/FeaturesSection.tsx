"use client";

import { Award, Compass, Settings } from "lucide-react";
import { useEffect, useRef } from "react";
import FeatureCard from "../ui/FeatureCard";

const features = [
  {
    icon: Award,
    title: "最高級の装備",
    description:
      "プレミアムインテリア、最高品質の寝具、最新の冷暖房システム完備。あらゆる季節で最高の快適さを提供します。",
  },
  {
    icon: Compass,
    title: "コンシェルジュサービス",
    description:
      "専任スタッフによる丁寧なサポートと現地案内。あなたの旅をより豊かに、より安心して楽しんでいただくためのパーソナルサービスを提供します。",
  },
  {
    icon: Settings,
    title: "カスタマイズオプション",
    description:
      "あなたの旅に合わせた柔軟なプランニングとオプション。特別な記念日や家族旅行など、目的に合わせてカスタマイズ可能です。",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    const section = sectionRef.current;
    const cards = Object.values(featureRefs.current).filter(Boolean);

    if (section) {
      observer.observe(section);
    }

    for (const card of cards) {
      if (card) {
        card.classList.add("reveal");
        observer.observe(card);
      }
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      for (const card of cards) {
        if (card) {
          observer.unobserve(card);
        }
      }
    };
  }, []);

  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #121212, #1A1A1A)",
      }}
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(18, 18, 18, 0) 70%)",
            top: "-400px",
            left: "-200px",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(18, 18, 18, 0) 70%)",
            bottom: "-300px",
            right: "-200px",
          }}
        />
      </div>

      <div className="premium-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-jp-gold/30 bg-jp-darkgray/50 backdrop-blur-sm text-jp-gold text-sm mb-4">
            サービス
          </span>
          <h2 className="section-title">ラグジュアリーな旅の理由</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            単なる移動手段ではなく、旅そのものを贅沢な時間に変える、
            プレミアムなサービスと設備をご用意しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const key = `feature-${index}`;

            return (
              <div
                key={key}
                ref={(el) => {
                  featureRefs.current[key] = el;
                }}
                className={`reveal reveal-delay-${index + 1}`}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
