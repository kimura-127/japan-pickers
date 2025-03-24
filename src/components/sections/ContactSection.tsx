"use client";

import { cn } from "@/lib/utils";
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PremiumButton from "../ui/PremiumButton";

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  name: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInput = ({
  label,
  type,
  placeholder,
  id,
  name,
  required = false,
  as = "input",
  rows = 4,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="premium-label">
        {label} {required && <span className="text-jp-gold">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          rows={rows}
          className="premium-input w-full"
          required={required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className="premium-input w-full"
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Simulating form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      // Reset the submission status after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

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
    const form = formRef.current;
    const info = infoRef.current;

    if (section) observer.observe(section);
    if (form) {
      form.classList.add("reveal");
      observer.observe(form);
    }
    if (info) {
      info.classList.add("reveal", "reveal-delay-2");
      observer.observe(info);
    }

    return () => {
      if (section) observer.unobserve(section);
      if (form) observer.unobserve(form);
      if (info) observer.unobserve(info);
    };
  }, []);

  return (
    <section id="contact" className="py-24 bg-jp-black" ref={sectionRef}>
      <div className="premium-container">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-jp-gold/30 bg-jp-darkgray/50 backdrop-blur-sm text-jp-gold text-sm mb-4">
            お問い合わせ
          </span>
          <h2 className="section-title">コンシェルジュデスク</h2>
          <p className="text-jp-silver max-w-2xl mx-auto mt-4">
            専任コンシェルジュが、あなたのご要望やご質問に丁寧にお答えします。
            お気軽にお問い合わせください。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="glass-card p-8 relative">
              <FormInput
                label="お名前"
                type="text"
                placeholder="山田 太郎"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <FormInput
                label="メールアドレス"
                type="email"
                placeholder="yamada@example.com"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                label="電話番号"
                type="tel"
                placeholder="090-1234-5678"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <FormInput
                label="お問い合わせ内容"
                type="text"
                placeholder="ご質問やご要望をお書きください"
                id="message"
                name="message"
                required
                as="textarea"
                rows={5}
                value={formData.message}
                onChange={handleChange}
              />

              <div className="text-right">
                <PremiumButton
                  type="submit"
                  className="flex items-center justify-center gap-2"
                  disabled={isSubmitted}
                >
                  <span>送信する</span>
                  <Send className="h-4 w-4" />
                </PremiumButton>
              </div>

              {/* Success message */}
              <div
                className={cn(
                  "absolute inset-0 bg-jp-black/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-500 rounded-lg",
                  isSubmitted ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              >
                <div className="text-center p-6">
                  <div className="inline-block p-3 bg-jp-gold/10 rounded-full mb-4">
                    <Check className="h-8 w-8 text-jp-gold" />
                  </div>
                  <h3 className="text-xl text-white font-medium mb-2">送信完了</h3>
                  <p className="text-jp-silver">
                    お問い合わせありがとうございます。コンシェルジュスタッフより営業時間内に折り返しご連絡いたします。
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl text-white font-noto-serif-jp font-medium mb-6">
                コンタクト情報
              </h3>

              <div className="space-y-6">
                <div className="flex">
                  <div className="bg-jp-darkgray p-3 rounded-full border border-jp-gold/20 mr-4">
                    <Phone className="h-5 w-5 text-jp-gold" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">お電話</h4>
                    <p className="text-jp-gold text-lg font-medium">0120-000-000</p>
                    <p className="text-jp-silver text-sm">受付時間: 9:00〜18:00（年中無休）</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-jp-darkgray p-3 rounded-full border border-jp-gold/20 mr-4">
                    <Mail className="h-5 w-5 text-jp-gold" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">メール</h4>
                    <p className="text-jp-gold text-lg font-medium">info@japan-pickers.com</p>
                    <p className="text-jp-silver text-sm">24時間受付中</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-jp-darkgray p-3 rounded-full border border-jp-gold/20 mr-4">
                    <MapPin className="h-5 w-5 text-jp-gold" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">所在地</h4>
                    <p className="text-jp-gold text-lg font-medium">群馬県高崎市</p>
                    <p className="text-jp-silver text-sm">〒370-0001 群馬県高崎市XXX-XXX</p>
                    <p className="text-jp-silver text-sm">営業時間: 9:00〜18:00（年中無休）</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="glass-card p-4">
              <div className="bg-jp-darkgray/50 h-72 flex items-center justify-center">
                <p className="text-jp-silver">Google Maps地図が表示されます</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
