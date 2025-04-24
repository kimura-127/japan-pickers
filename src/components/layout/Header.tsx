"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { LogOut, Menu, PhoneCall, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PremiumButton from "../ui/PremiumButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, signOut } = useAuth();

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
    { name: "保険・補償制度", href: "/insurance-policy" },
  ];

  const handleSignOut = async () => {
    await signOut();
    // 必要に応じてここにリダイレクト処理を追加
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-2",
        scrolled ? "bg-jp-black/95 backdrop-blur-md shadow-gold-md" : "bg-transparent",
      )}
    >
      <div className="premium-container flex items-center justify-between">
        <Link href="/">
          <Image
            width={1200}
            height={1200}
            src="/images/top_img.JPG"
            alt="トップのイメージ"
            className="rounded-full w-12 h-12 object-cover z-0 sm:hidden"
          />
        </Link>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <span className="font-playfair text-2xl font-bold gold-gradient-text">
              ピッカーズレンタカー
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
          {/* 認証状態によって表示切り替え */}
          {/* {user ? (
            <div className="relative group">
              <button
                type="button"
                className="flex items-center space-x-1 text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm font-medium"
              >
                <User size={18} />
                <span>マイページ</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-jp-black border border-jp-gold/20 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-jp-silver hover:bg-jp-darkgray/50 hover:text-jp-gold"
                >
                  プロフィール
                </Link>
                <Link
                  href="/bookings"
                  className="block px-4 py-2 text-sm text-jp-silver hover:bg-jp-darkgray/50 hover:text-jp-gold"
                >
                  予約履歴
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-jp-silver hover:bg-jp-darkgray/50 hover:text-jp-gold"
                >
                  <LogOut size={16} className="mr-2" />
                  ログアウト
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm font-medium"
              >
                ログイン
              </Link>
              <Link
                href="/auth/register"
                className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm font-medium"
              >
                会員登録
              </Link>
            </>
          )} */}
          <PremiumButton withShimmer onClick={() => router.push("#booking")}>
            ご予約はこちら
          </PremiumButton>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="tel:+0120-000-000"
            className="flex items-center text-jp-gold hover:text-jp-gold-light transition-colors duration-300"
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            <span className="text-sm">027-386-9948</span>
          </a>
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
            {/* モバイル用認証メニュー */}
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-lg font-medium"
                >
                  プロフィール
                </Link>
                <Link
                  href="/bookings"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-lg font-medium"
                >
                  予約履歴
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-lg font-medium flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-lg font-medium"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-lg font-medium"
                >
                  会員登録
                </Link>
              </>
            )}
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
