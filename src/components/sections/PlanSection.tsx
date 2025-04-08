"use client";

import { useEffect, useRef } from "react";
import PlanCard from "../ui/PlanCard";

const seasonalRates = [
  {
    id: 1,
    title: "五右衛門風呂 温泉号",
    image: "/images/options/bathtub2.JPG",
    duration: "要相談",
    description:
      "※ 一般利用客へのレンタルは現在行っておりません。ロケや撮影(映画・TV番組・Youtube撮影)等の使用のみとなります。",
  },
  {
    id: 2,
    title: "貨物トレーラー",
    image: "/images/options/cat1.JPG",
    duration: "27,500円/泊",
    description: "要牽引免許",
  },
  {
    id: 3,
    title: "車載トレーラー",
    image: "/images/options/carCarrier8.JPG",
    duration: "38,500円/泊",
    description: "要牽引免許",
  },
  {
    id: 4,
    title: "バイクトレーラー",
    image: "/images/options/trailer4.JPG",
    duration: "11,000円/泊",
    description: "最大３台積載可能。",
  },
];

const PlanSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    const cards = Object.values(planRefs.current).filter(Boolean);

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
    <section id="plans" className="py-24 bg-jp-black" ref={sectionRef}>
      <div className="premium-container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-jp-gold/30 bg-jp-darkgray/50 backdrop-blur-sm text-jp-gold text-sm mb-4">
            オプション
          </span>
          <h2 className="section-title">おすすめオプション</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            より快適な旅行のための様々なオプションをご用意しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {seasonalRates.map((plan, index) => {
            const key = `plan-${plan.id}`;

            return (
              <div
                key={key}
                ref={(el) => {
                  planRefs.current[key] = el;
                }}
                className={`reveal reveal-delay-${index + 1}`}
              >
                <PlanCard
                  image={plan.image}
                  title={plan.title}
                  duration={plan.duration}
                  description={plan.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
