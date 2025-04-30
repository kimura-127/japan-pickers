"use client";

import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

const campingSpots = [
  {
    name: "道の駅 まえばし赤城",
    location: "群馬県前橋市苗ケ島町2143-7",
    description: "xxxxxxxxxxxxxxxxxxxxxx",
    image: "/images/spots/akagi.jpg",
  },
  {
    name: "赤城山オートキャンプ場",
    location: "群馬県前橋市苗ケ島町2331-7",
    description: "xxxxxxxxxxxxxxxxxxxxxx",
    image: "/images/spots/akagi-camp.jpg",
  },
  {
    name: "伊香保グリーン牧場",
    location: "群馬県渋川市金井2844-1",
    description: "xxxxxxxxxxxxxxxxxxxxxx",
    image: "/images/spots/ikaho.jpg",
  },
  {
    name: "尾瀬戸倉駐車場",
    location: "群馬県片品村戸倉761-79",
    description: "xxxxxxxxxxxxxxxxxxxxxx",
    image: "/images/spots/oze.jpg",
  },
];

const CampingSpotsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const mapRef = useRef<HTMLDivElement>(null);

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
    const spots = Object.values(spotRefs.current).filter(Boolean);
    const map = mapRef.current;

    if (section) {
      observer.observe(section);
    }

    if (map) {
      map.classList.add("reveal");
      observer.observe(map);
    }

    for (const spot of spots) {
      if (spot) {
        spot.classList.add("reveal");
        observer.observe(spot);
      }
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      if (map) {
        observer.unobserve(map);
      }
      for (const spot of spots) {
        if (spot) {
          observer.unobserve(spot);
        }
      }
    };
  }, []);

  return (
    <section
      id="camping-spots"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-jp-darkgray to-jp-black"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(30, 144, 255, 0.3) 0%, rgba(18, 18, 18, 0) 70%)",
            top: "-200px",
            left: "-200px",
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(30, 144, 255, 0.4) 0%, rgba(18, 18, 18, 0) 70%)",
            bottom: "-300px",
            right: "-200px",
          }}
        />
      </div>

      <div className="premium-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border text-sm mb-4">
            車中泊スポット
          </span>
          <h2 className="section-title">おすすめの車中泊スポット</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            群馬県内にある人気の車中泊スポットをご紹介します。当社のキャンピングカーで訪れるのにおすすめのスポットばかりです。
          </p>
        </div>

        <div ref={mapRef} className="reveal mb-16 overflow-hidden rounded-lg shadow-xl">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1r7QjaPho9jguNvgRCUA9giOaMnWO9VY&ehbc=2E312F"
            width="100%"
            height="480"
            className="border-0"
            title="おすすめ車中泊スポットマップ"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {campingSpots.map((spot, index) => {
            const key = `spot-${index}`;

            return (
              <div
                key={key}
                ref={(el) => {
                  spotRefs.current[key] = el;
                }}
                className={`reveal reveal-delay-${index + 1} bg-jp-darkergray/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-jp-gray/20`}
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-bold text-white">{spot.name}</h3>
                    <div className="flex items-center text-jp-silver text-sm mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{spot.location}</span>
                    </div>
                  </div>
                  {/* プレースホルダー画像 - 実際の画像に差し替えが必要 */}
                  <div className="absolute inset-0 bg-jp-darkgray flex items-center justify-center">
                    <span className="text-jp-silver text-opacity-50">画像準備中</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-jp-silver">{spot.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampingSpotsSection;
