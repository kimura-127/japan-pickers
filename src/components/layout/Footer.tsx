"use client";

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-jp-black border-t border-jp-gold/20 pt-16 pb-8">
      <div className="premium-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-playfair text-2xl font-bold gold-gradient-text">
                ジャパンピッカーズ
              </span>
            </div>
            <p className="text-jp-silver text-sm mt-2">
              群馬県のプレミアムキャンピングカーや特殊車両のレンタカーサービス。
              最高級の装備と丁寧なサポートで、特別な旅の体験をご提供いたします。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-jp-gold text-lg font-medium mb-4">サービス案内</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#vehicles"
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm"
                >
                  車両ラインナップ
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm"
                >
                  サービスの特徴
                </Link>
              </li>
              <li>
                <Link
                  href="#plans"
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm"
                >
                  旅のプラン
                </Link>
              </li>
              <li>
                <Link
                  href="#booking"
                  className="text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm"
                >
                  予約システム
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-jp-gold text-lg font-medium mb-4">コンタクト</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-jp-gold mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm">0120-000-000</p>
                  <p className="text-jp-silver text-xs">受付時間: 9:00〜18:00</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-jp-gold mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm">info@japan-pickers.com</p>
                  <p className="text-jp-silver text-xs">24時間受付中</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-jp-gold mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm">〒370-0001</p>
                  <p className="text-jp-silver text-xs">群馬県高崎市XXX-XXX</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="text-jp-gold text-lg font-medium mb-4">フォローする</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="bg-jp-darkgray text-jp-gold hover:text-jp-gold-light p-2 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-jp-darkgray text-jp-gold hover:text-jp-gold-light p-2 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-jp-darkgray text-jp-gold hover:text-jp-gold-light p-2 rounded-full transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-jp-darkgray text-jp-gold hover:text-jp-gold-light p-2 rounded-full transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>

            <div className="pt-4 space-y-2">
              <Link
                href="#"
                className="block text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="#"
                className="block text-jp-silver hover:text-jp-gold transition-colors duration-300 text-sm"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>

        <div className="section-divider" />

        <div className="text-center text-jp-silver text-sm">
          <p>&copy; {currentYear} ジャパンピッカーズ All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
