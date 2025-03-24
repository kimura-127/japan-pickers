import type { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { supabase } from "./supabase";

// Prismaを使用した車両データのCRUD操作

/**
 * すべての車両を取得する
 */
export async function getVehicles() {
  try {
    return await prisma.vehicle.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (error) {
    console.error("車両データの取得に失敗しました", error);
    return [];
  }
}

/**
 * スラグに基づいて特定の車両を取得する
 */
export async function getVehicleBySlug(slug: string) {
  try {
    return await prisma.vehicle.findUnique({
      where: { slug },
      include: {
        bookings: true,
      },
    });
  } catch (error) {
    console.error(`${slug}の車両データの取得に失敗しました`, error);
    return null;
  }
}

/**
 * 新しい車両を作成する
 */
export async function createVehicle(vehicleData: Prisma.VehicleCreateInput) {
  try {
    return await prisma.vehicle.create({
      data: vehicleData,
    });
  } catch (error) {
    console.error("車両データの作成に失敗しました", error);
    return null;
  }
}

/**
 * 車両情報を更新する
 */
export async function updateVehicle(id: string, vehicleData: Prisma.VehicleUpdateInput) {
  try {
    return await prisma.vehicle.update({
      where: { id },
      data: vehicleData,
    });
  } catch (error) {
    console.error("車両データの更新に失敗しました", error);
    return null;
  }
}

/**
 * 車両を削除する
 */
export async function deleteVehicle(id: string) {
  try {
    await prisma.booking.deleteMany({
      where: { vehicleId: id },
    });

    return await prisma.vehicle.delete({
      where: { id },
    });
  } catch (error) {
    console.error("車両データの削除に失敗しました", error);
    return null;
  }
}

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
