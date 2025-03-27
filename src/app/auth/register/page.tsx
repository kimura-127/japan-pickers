"use client";

import AuthForm from "@/components/auth/AuthForm";
import { createClient_ as createSupabaseClient } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name?: string;
  }) => {
    try {
      // Supabaseクライアントの作成
      const supabase = createSupabaseClient();

      // アプリのURLを取得（本番環境とローカル環境で分岐）
      const siteUrl =
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_SITE_URL || "https://japan-pickers.vercel.app"
          : "http://localhost:3000";

      const redirectUrl = `${siteUrl}/auth/confirm`;

      // Supabaseでユーザー登録
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name || "",
          },
        },
      });

      if (error) {
        console.error("登録エラー詳細:", error);
        return {
          success: false,
          message: error.message,
        };
      }

      // 登録成功
      return {
        success: true,
        message: "登録が完了しました。メールを確認してアカウントを有効化してください。",
      };
    } catch (error) {
      console.error("登録エラー:", error);
      return {
        success: false,
        message: "登録中にエラーが発生しました。もう一度お試しください。",
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

        <AuthForm mode="register" onSubmit={handleRegister} />

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
