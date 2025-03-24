"use client";

import AuthForm from "@/components/auth/AuthForm";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          message: error.message,
        };
      }

      // ログイン成功
      return {
        success: true,
      };
    } catch (error) {
      console.error("ログインエラー:", error);
      return {
        success: false,
        message: "ログイン中にエラーが発生しました。もう一度お試しください。",
      };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-jp-black to-jp-darkgray">
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <Link href="/" className="mb-8">
          <span className="font-playfair text-3xl font-bold gold-gradient-text">
            ジャパンピッカーズ
          </span>
        </Link>

        <AuthForm mode="login" onSubmit={handleLogin} />

        <div className="mt-8 text-center text-jp-silver text-sm">
          <p>ご不明な点がございましたら、お問い合わせください</p>
          <Link href="/contact" className="text-jp-gold hover:text-jp-gold-light">
            お問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
}
