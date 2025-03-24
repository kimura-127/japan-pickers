"use client";

import { cn } from "@/lib/utils";
import { Menu, PhoneCall, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PremiumButton from "../ui/PremiumButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "車両ラインナップ", href: "#vehicles" },
    { name: "予約システム", href: "#booking" },
    { name: "よくある質問", href: "#faq" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8",
        scrolled ? "bg-jp-black/95 backdrop-blur-md shadow-gold-md" : "bg-transparent",
      )}
    >
      <div className="premium-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <span className="font-playfair text-2xl font-bold gold-gradient-text">
              ジャパンピッカーズ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="tel:+0120-000-000"
            className="flex items-center text-jp-gold hover:text-jp-gold-light transition-colors duration-300"
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            <span className="text-sm">0120-000-000</span>
          </a>
          <PremiumButton withShimmer onClick={() => router.push("#booking")}>
            ご予約はこちら
          </PremiumButton>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-jp-silver hover:text-jp-gold transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-jp-black/95 backdrop-blur-md z-40 transition-transform duration-300 transform md:hidden pt-20",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-6 space-y-4 w-full px-8">
              <a
                href="tel:+0120-000-000"
                className="flex items-center justify-center text-jp-gold hover:text-jp-gold-light transition-colors duration-300"
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                <span>0120-000-000</span>
              </a>
              <PremiumButton
                withShimmer
                className="w-full"
                onClick={() => {
                  router.push("#booking");
                  setIsMenuOpen(false);
                }}
              >
                ご予約はこちら
              </PremiumButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
