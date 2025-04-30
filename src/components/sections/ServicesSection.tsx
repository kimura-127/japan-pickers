"use client";

import { Calendar, Train } from "lucide-react";
import { useEffect, useRef } from "react";
import ServiceCard from "../ui/ServiceCard";

const services = [
  {
    icon: Calendar,
    title: "手ぶらでキャンピングカー宿泊体験",
    price: "12,800円〜",
    priceDetail: "平日（税込）・週末+4,400円",
    location: "道の駅まえばし赤城",
    vehicle: "車両：ベガ",
    time: "15時〜翌朝11時",
    capacity: "最大5人",
    description:
      "次回レンタル割引券付き！高崎・前橋駅まで送迎可能なキャンピングカー宿泊体験です。道の駅まえばし赤城にて宿泊体験可能です。",
    notes: "※ハイシーズン期間中はご利用いただけません",
  },
  {
    icon: Train,
    title: "高崎駅キャンピングカー受け渡しサービス",
    price: "16,500円",
    priceDetail: "税込",
    location: "高崎駅",
    vehicle: "全車種対応",
    time: "予約時間に応じて",
    capacity: "予約車両による",
    description: "電車でお越しの方に便利な高崎駅でのキャンピングカー受け渡しサービスです。",
    notes: "※事前予約が必要です",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    const cards = Object.values(serviceRefs.current).filter(Boolean);

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
      id="services"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #1A1A1A, #121212)",
      }}
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(18, 18, 18, 0) 70%)",
            top: "-200px",
            right: "-200px",
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(18, 18, 18, 0) 70%)",
            bottom: "-300px",
            left: "-200px",
          }}
        />
      </div>

      <div className="premium-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-jp-gold/30 bg-jp-darkgray/50 backdrop-blur-sm text-jp-gold text-sm mb-4">
            サービス一覧
          </span>
          <h2 className="section-title">特別なキャンピングカー体験</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            ジャパンピッカーズでは、手ぶらで楽しめる宿泊体験から、
            便利な駅での受け渡しまで、お客様の旅をより快適にするサービスをご用意しています。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const key = `service-${index}`;

            return (
              <div
                key={key}
                ref={(el) => {
                  serviceRefs.current[key] = el;
                }}
                className={`reveal reveal-delay-${index + 1}`}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  price={service.price}
                  priceDetail={service.priceDetail}
                  location={service.location}
                  vehicle={service.vehicle}
                  time={service.time}
                  capacity={service.capacity}
                  description={service.description}
                  notes={service.notes}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
