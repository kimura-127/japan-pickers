import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabaseの環境変数が設定されていません。");
}

// クライアントサイドでのSupabaseクライアント（ブラウザ環境用）
export const createClient_ = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

// 下位互換性のため元のクライアントも維持
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
