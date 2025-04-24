"use client";

import { vehicles } from "@/lib/vehicles";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import VehicleCard from "../ui/VehicleCard";

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
            車両紹介
          </span>
          <h2 className="section-title">厳選されたキャンピングカー</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            ジャパンピッカーズが誇る高品質なキャンピングカーをご紹介。
            あなたの冒険をサポートする特別な一台をお選びください。
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
                  isHidden={vehicle.isHidden}
                  image={vehicle.images[0].src}
                  name={vehicle.name}
                  capacity={vehicle.features[0]}
                  features={vehicle.features}
                  subText={vehicle.subText}
                  vehicleType={vehicle.vehicleType}
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
