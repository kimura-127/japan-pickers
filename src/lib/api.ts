import { supabase } from "./supabase";

export type Vehicle = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  slug: string;
  created_at: string;
};

// 全ての車両を取得する
export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("車両データの取得に失敗しました", error);
    return [];
  }

  return data || [];
}

// slugに基づいて特定の車両を取得する
export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const { data, error } = await supabase.from("vehicles").select("*").eq("slug", slug).single();

  if (error) {
    console.error(`${slug}の車両データの取得に失敗しました`, error);
    return null;
  }

  return data;
}

// 車両を作成する（管理者機能用）
export async function createVehicle(
  vehicle: Omit<Vehicle, "id" | "created_at">,
): Promise<Vehicle | null> {
  const { data, error } = await supabase.from("vehicles").insert([vehicle]).select().single();

  if (error) {
    console.error("車両データの作成に失敗しました", error);
    return null;
  }

  return data;
}

// 車両情報を更新する（管理者機能用）
export async function updateVehicle(
  id: string,
  vehicle: Partial<Vehicle>,
): Promise<Vehicle | null> {
  const { data, error } = await supabase
    .from("vehicles")
    .update(vehicle)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("車両データの更新に失敗しました", error);
    return null;
  }

  return data;
}

// 車両を削除する（管理者機能用）
export async function deleteVehicle(id: string): Promise<boolean> {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    console.error("車両データの削除に失敗しました", error);
    return false;
  }

  return true;
}
