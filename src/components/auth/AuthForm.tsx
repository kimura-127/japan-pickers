"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PremiumButton from "../ui/PremiumButton";

export type AuthFormProps = {
  mode: "login" | "register";
  onSubmit: (data: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<{ success: boolean; message?: string }>;
};

const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await onSubmit({
        email,
        password,
        ...(mode === "register" ? { name } : {}),
      });

      if (result.success) {
        setSuccess(
          mode === "login"
            ? "ログインに成功しました。リダイレクトします..."
            : "登録が完了しました。確認メールをご確認ください。",
        );

        // ログイン成功時にはホームページへリダイレクト
        if (mode === "login") {
          setTimeout(() => {
            router.push("/");
          }, 1500);
        }
      } else {
        setError(result.message || "エラーが発生しました。もう一度お試しください。");
      }
    } catch (err) {
      console.error("認証エラー:", err);
      setError("予期せぬエラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-jp-black/95 border border-jp-gold/20 rounded-lg shadow-gold-sm backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-center mb-6 gold-gradient-text">
        {mode === "login" ? "ログイン" : "会員登録"}
      </h2>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900/20 border border-green-500/30 text-green-300 px-4 py-3 rounded mb-4 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-jp-silver">
              お名前
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-jp-silver/50" />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-jp-darkgray/50 border border-jp-gold/20 text-jp-silver rounded-lg focus:ring-jp-gold focus:border-jp-gold block w-full pl-10 p-2.5"
                placeholder="山田 太郎"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-jp-silver">
            メールアドレス
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-jp-silver/50" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-jp-darkgray/50 border border-jp-gold/20 text-jp-silver rounded-lg focus:ring-jp-gold focus:border-jp-gold block w-full pl-10 p-2.5"
              placeholder="example@mail.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-jp-silver">
            パスワード
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-jp-silver/50" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-jp-darkgray/50 border border-jp-gold/20 text-jp-silver rounded-lg focus:ring-jp-gold focus:border-jp-gold block w-full pl-10 pr-10 p-2.5"
              placeholder="••••••••"
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-jp-silver/50" />
              ) : (
                <Eye className="h-5 w-5 text-jp-silver/50" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <PremiumButton type="submit" disabled={loading} withShimmer className="w-full">
            {loading ? "処理中..." : mode === "login" ? "ログイン" : "会員登録"}
          </PremiumButton>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-jp-silver">
            {mode === "login" ? (
              <>
                アカウントをお持ちでない方は{" "}
                <Link href="/auth/register" className="text-jp-gold hover:text-jp-gold-light">
                  こちら
                </Link>
              </>
            ) : (
              <>
                すでにアカウントをお持ちの方は{" "}
                <Link href="/auth/login" className="text-jp-gold hover:text-jp-gold-light">
                  こちら
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
