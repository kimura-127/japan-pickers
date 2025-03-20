"use client";

import { useEffect, useRef } from "react";
import PlanCard from "../ui/PlanCard";
import { useRouter } from "next/navigation";

const plans = [
  {
    id: 1,
    title: "群馬の名湯めぐり",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "2泊3日",
    description: "群馬県が誇る名湯を巡る贅沢な旅。草津温泉や伊香保温泉など、名だたる温泉地を巡ります。",
    highlights: [
      "厳選された名湯へのアクセス情報提供",
      "温泉施設での優先予約サービス",
      "地元の名産品とワインのウェルカムパッケージ",
    ],
  },
  {
    id: 2,
    title: "尾瀬・日光国立公園探訪",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "3泊4日",
    description: "雄大な自然が広がる尾瀬と日光国立公園。季節ごとに移り変わる美しい景色を堪能できます。",
    highlights: [
      "専門ガイドによるトレッキングツアー（オプション）",
      "自然写真家によるフォトスポット案内",
      "プライベートピクニックセット付き",
    ],
  },
  {
    id: 3,
    title: "赤城山・榛名山プライベートリトリート",
    image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "1泊2日",
    description: "忙しい日常から離れ、山々の静寂に身を任せるプライベートな時間。心と体をリフレッシュします。",
    highlights: [
      "プライベートビューポイントへのナビゲーション",
      "星空観測用の天体望遠鏡レンタル（オプション）",
      "地元食材を使った簡単調理レシピ付き",
    ],
  },
  {
    id: 4,
    title: "ガストロノミックジャーニー",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "2泊3日",
    description: "群馬の豊かな食文化を巡る旅。地元の名店や農場を訪れ、新鮮な食材と伝統料理を堪能します。",
    highlights: [
      "地元の名店予約代行サービス",
      "ワイナリー・酒蔵見学アレンジ",
      "シェフによるプライベートクッキングレッスン（オプション）",
    ],
  },
];

const PlanSection = () => {
  const router = useRouter();
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
      }
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
            旅のプラン
          </span>
          <h2 className="section-title">プレミアムエクスペリエンス</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            キャンピングカーならではの自由と、ラグジュアリーホテルのような快適さ。
            最高の旅のための厳選プランをご紹介します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => {
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
                  highlights={plan.highlights}
                  onClick={() => {
                    console.log(`Plan ${plan.id} clicked`);
                    // In a real app, this would pre-select this plan in the booking form
                    router.push("#booking");
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

export default PlanSection;
