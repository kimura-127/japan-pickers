import { getAllVehicleSlugs } from "@/lib/vehicles";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // ベースURL
  const baseUrl = "https://japan-pickers.com";

  // 現在の日付
  const currentDate = new Date();

  // 静的ページの定義
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/vehicles`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
    },
  ];

  // 車両詳細ページのURLを動的に生成
  const vehicleSlugs = getAllVehicleSlugs();
  const vehiclePages = vehicleSlugs.map((slug) => ({
    url: `${baseUrl}/vehicles/${slug}`,
    lastModified: currentDate,
  }));

  // 全てのURLを結合して返す
  return [...staticPages, ...vehiclePages];
}
