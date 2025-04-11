"use client";

import { cn } from "@/lib/utils";
import { Calendar, Check, ChevronDown, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PremiumButton from "../ui/PremiumButton";
import { Button } from "../ui/button";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ title, children, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-jp-gold/20">
      <Button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="text-white font-medium">{title}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-jp-gold transition-transform duration-300",
            isOpen ? "transform rotate-180" : "",
          )}
        />
      </Button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 mb-4" : "max-h-0",
        )}
      >
        <div className="text-jp-silver">{children}</div>
      </div>
    </div>
  );
};

const BookingProcess = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {[
        {
          icon: Calendar,
          title: "日程と車両を選択",
          description: "希望の日程と車両タイプを選んで、空き状況をリアルタイムでチェック。",
        },
        {
          icon: Settings,
          title: "パーソナライズオプション",
          description: "アメニティやツアーオプションなど、あなたの旅をカスタマイズ。",
        },
        {
          icon: Check,
          title: "確認・決済",
          description: "安全な決済システムで簡単予約。専任スタッフが丁寧にサポート。",
        },
      ].map((step, index) => {
        const Icon = step.icon;
        const key = `booking-step-${index}`;

        return (
          <div key={key} className="glass-card p-6 text-center">
            <div className="rounded-full bg-jp-gold/10 p-4 inline-flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-jp-gold" />
            </div>
            <h3 className="text-xl text-white font-noto-serif-jp font-medium mb-2">{step.title}</h3>
            <p className="text-jp-silver">{step.description}</p>
          </div>
        );
      })}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "予約はどのくらい前から可能ですか？",
      answer:
        "ご予約は最大6ヶ月前から承っております。特に繁忙期（ゴールデンウィーク、夏季休暇、年末年始）は早めのご予約をおすすめいたします。",
    },
    {
      question: "普通免許しか持っていませんが運転できますか？",
      answer:
        "カムロードZilは普通免許で運転できます。ただし、ランドホームグランデとコースターベガは2017年3月12日以降に普通免許を取得した方は準中型免許が必要です。",
    },
    {
      question: "キャンセルポリシーを教えてください",
      answer:
        "ご出発の30日前までのキャンセルは全額返金、14日前までは50%の返金となります。それ以降のキャンセルについては返金がございませんので、旅行保険へのご加入をおすすめいたします。",
    },
    {
      question: "ペットの同伴は可能ですか？",
      answer:
        "一部の車両ではペット同伴可能です（追加クリーニング料金がかかります）。ペットフレンドリーな車両は予約時にお選びいただけます。",
    },
    {
      question: "初めてでも運転できますか？",
      answer:
        "はい。ご出発前に丁寧な説明と操作レクチャーを行いますので、初めての方でも安心してご利用いただけます。また、24時間サポートデスクもご用意しております。",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl text-white font-noto-serif-jp font-medium mb-6 text-center">
        よくある質問
      </h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const key = `faq-${index}`;
          return (
            <AccordionItem
              key={key}
              title={faq.question}
              isOpen={openIndex === index}
              onClick={() => toggleAccordion(index)}
            >
              {faq.answer}
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
};

const BookingSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const process = useRef<HTMLDivElement>(null);
  const faq = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);

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
    const elements = [process.current, faq.current, cta.current].filter(Boolean);

    if (section) {
      observer.observe(section);
    }

    for (const el of elements) {
      if (el) {
        el.classList.add("reveal");
        observer.observe(el);
      }
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      for (const el of elements) {
        if (el) {
          observer.unobserve(el);
        }
      }
    };
  }, []);

  return (
    <section
      id="booking"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #1A1A1A, #121212)",
      }}
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 1) 0%, rgba(18, 18, 18, 0) 70%)",
            top: "10%",
            right: "-200px",
          }}
        />
      </div>

      <div className="premium-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-jp-gold/30 bg-jp-darkgray/50 backdrop-blur-sm text-jp-gold text-sm mb-4">
            ご予約
          </span>
          <h2 className="section-title">シンプルな予約システム</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            煩わしい手続きなく、スムーズにご予約いただけます。
            専任コンシェルジュが、あなたの特別な旅をサポートします。
          </p>
        </div>

        <div ref={process} className="reveal">
          <BookingProcess />
        </div>

        <div ref={faq} className="reveal reveal-delay-2">
          <FAQ />
        </div>

        <div className="text-center mt-16">
          <div ref={cta} className="reveal reveal-delay-3">
            <div className="inline-block p-px bg-gold-gradient rounded-lg mb-8">
              <div className="bg-jp-black rounded-lg p-8">
                <h3 className="text-2xl text-white font-noto-serif-jp font-medium mb-4">
                  あなただけの特別な旅へ
                </h3>
                <p className="text-jp-silver mb-6 max-w-2xl mx-auto">
                  最高のキャンピングカーで、最高の思い出を。
                  ご不明な点があれば、お気軽にお問い合わせください。
                </p>
                <PremiumButton size="lg" withShimmer onClick={() => router.push("#contact")}>
                  今すぐ予約
                </PremiumButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
