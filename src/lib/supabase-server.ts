import { type CookieOptions, createServerClient as createServerSsrClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabaseの環境変数が設定されていません。");
  }

  return createServerSsrClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async get(name: string) {
        const cookie = cookieStore.get(name);
        return cookie?.value;
      },
      async set(name: string, value: string, options: CookieOptions) {
        try {
          await cookieStore.set({ name, value, ...options });
        } catch (error) {
          // エラーハンドリング
          console.error("Cookieの設定中にエラーが発生しました:", error);
        }
      },
      async remove(name: string, options: CookieOptions) {
        try {
          await cookieStore.set({ name, value: "", ...options });
        } catch (error) {
          // エラーハンドリング
          console.error("Cookieの削除中にエラーが発生しました:", error);
        }
      },
    },
  });
}

// 下位互換性のため、既存の関数も維持
export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabaseの環境変数が設定されていません。");
  }

  return await createServerSupabaseClient();
}
