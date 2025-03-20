"use client";

import { useEffect, useRef } from "react";
import VehicleCard from "../ui/VehicleCard";

const vehicles = [
  {
    id: 1,
    name: "グランドクルーザー EX",
    image: "https://images.unsplash.com/photo-1591127241866-5207169c7097?q=80&w=1000&auto=format&fit=crop",
    capacity: 4,
    features: ["フルキッチン", "シャワー/トイレ", "エアコン/暖房", "ソーラーパネル"],
    pricePerNight: 38000,
  },
  {
    id: 2,
    name: "ラグジュアリーライナー プレミアム",
    image: "https://images.unsplash.com/photo-1565775449245-5b58b4636107?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    capacity: 6,
    features: ["キングサイズベッド", "プレミアムサウンドシステム", "Bose®スピーカー", "広々リビングスペース"],
    pricePerNight: 45000,
  },
  {
    id: 3,
    name: "エレガントトラベラー スイート",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    capacity: 5,
    features: ["革張りインテリア", "ガラスルーフ", "ワークステーション", "ワインセラー"],
    pricePerNight: 40000,
  },
  {
    id: 4,
    name: "エグゼクティブモービル VIP",
    image: "https://images.unsplash.com/photo-1504280530523-5b5d5bfb3b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    capacity: 4,
    features: ["プライベートラウンジ", "ジャグジー", "スマートホームシステム", "サテライトTV"],
    pricePerNight: 52000,
  },
];

const VehicleSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (section) {
      observer.observe(section);
    }

    cards.forEach((card) => {
      if (card) {
        card.classList.add("reveal");
        observer.observe(card);
      }
    });

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      cards.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <section id="vehicles" className="py-24 bg-jp-black" ref={sectionRef}>
      <div className="premium-container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-jp-gold/30 bg-jp-darkgray/50 backdrop-blur-sm text-jp-gold text-sm mb-4">
            ラインナップ
          </span>
          <h2 className="section-title">厳選されたプレミアムラインナップ</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            最高級の素材と快適さを追求した、厳選されたキャンピングカーコレクション。
            あなただけの特別な旅をサポートします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`reveal reveal-delay-${index + 1}`}
            >
              <VehicleCard
                image={vehicle.image}
                name={vehicle.name}
                capacity={vehicle.capacity}
                features={vehicle.features}
                pricePerNight={vehicle.pricePerNight}
                onClick={() => {
                  console.log(`Vehicle ${vehicle.id} clicked`);
                  // In a real app, this would navigate to a detailed view
                  window.location.href = "#booking";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleSection;
