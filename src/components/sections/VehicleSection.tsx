"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import VehicleCard from "../ui/VehicleCard";

const vehicles = [
  {
    id: 1,
    name: "ランドホームグランデ",
    slug: "land-home-grande",
    image: "/images/IMG_8936.JPG",
    capacity: 4,
    features: ["フルキッチン", "シャワー/トイレ", "エアコン/暖房", "ソーラーパネル"],
    pricePerNight: 38000,
  },
  {
    id: 2,
    name: "カムロードZiL",
    slug: "camroad-zil",
    image: "/images/IMG_8936.JPG",
    capacity: 6,
    features: [
      "キングサイズベッド",
      "プレミアムサウンドシステム",
      "Bose®スピーカー",
      "広々リビングスペース",
    ],
    pricePerNight: 45000,
  },
  {
    id: 3,
    name: "コースター ベガ",
    slug: "coaster-vega",
    image: "/images/IMG_8936.JPG",
    capacity: 5,
    features: ["革張りインテリア", "ガラスルーフ", "ワークステーション", "ワインセラー"],
    pricePerNight: 40000,
  },
];

const VehicleSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const vehicleRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    const cards = Object.values(vehicleRefs.current).filter(Boolean);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => {
            const key = `vehicle-${vehicle.id}`;

            return (
              <div
                key={key}
                ref={(el) => {
                  vehicleRefs.current[key] = el;
                }}
                className={`reveal reveal-delay-${index + 1}`}
              >
                <VehicleCard
                  image={vehicle.image}
                  name={vehicle.name}
                  capacity={vehicle.capacity}
                  features={vehicle.features}
                  pricePerNight={vehicle.pricePerNight}
                  onClick={() => {
                    router.push(`/vehicles/${vehicle.slug}`);
                  }}
                  onBookingClick={() => {
                    router.push(`/vehicles/${vehicle.slug}#booking`);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VehicleSection;
