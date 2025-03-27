"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import PlanCard from "../ui/PlanCard";

const seasonalRates = [
  {
    id: 1,
    title: "通常シーズン",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "レギュラー料金",
    description:
      "通常期間のレンタル料金です。表示のレンタル料金は税込の２４時間ごとの金額となります。レンタル料金は対人賠償保険料込みです！",
    highlights: [
      "ランドホームグランデ：35,200円～/1日",
      "カムロードZiL：15,000円～/1日",
      "コースター ベガ：35,200円～/1日",
    ],
  },
  {
    id: 2,
    title: "ハイシーズン",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "春休み・夏休み・年末",
    description: "春休み(3/20-4/15)、夏休み(7/1-8/7、8/17-8/31)、年末(12/1-12/25)の特別料金です。",
    highlights: [
      "ランドホームグランデ：要問合せ",
      "カムロードZiL：要問合せ",
      "コースター ベガ：要問合せ",
    ],
  },
  {
    id: 3,
    title: "プレミアムシーズン",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "GW・お盆・年末年始",
    description:
      "GW(4/29-5/6)、お盆(8/8-8/16)、年末年始(12/26-1/5)の特別料金です。※プレミアムシーズンのご予約は、最低3日（72時間）以上のご利用が必要となります。",
    highlights: [
      "ランドホームグランデ：要問合せ",
      "カムロードZiL：要問合せ",
      "コースター ベガ：要問合せ",
    ],
  },
  {
    id: 4,
    title: "オプション",
    image:
      "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    duration: "快適な旅のために",
    description:
      "より快適な旅行のための各種オプションをご用意しています。ご予約時にお申し付けください。",
    highlights: [
      "寝具セット（布団・シーツ・枕）",
      "キャンプ用品（テーブル・チェア）",
      "調理器具セット",
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
            料金・オプション
          </span>
          <h2 className="section-title">レンタル料金と特別シーズン</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            表示のレンタル料金は税込の２４時間ごとの金額となります。
            レンタル料金は対人賠償保険料込みです！
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
