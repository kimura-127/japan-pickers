import { supabase } from "./supabase";

// Supabaseを使用した画像ストレージ操作

/**
 * 車両画像をアップロードする
 */
export async function uploadVehicleImage(file: File, path: string) {
  try {
    const { data, error } = await supabase.storage.from("vehicles").upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (error) throw error;

    // 公開URLを取得
    const { data: urlData } = supabase.storage.from("vehicles").getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error("画像のアップロードに失敗しました", error);
    return null;
  }
}

/**
 * 車両画像を削除する
 */
export async function deleteVehicleImage(path: string) {
  try {
    const { error } = await supabase.storage.from("vehicles").remove([path]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("画像の削除に失敗しました", error);
    return false;
  }
}
