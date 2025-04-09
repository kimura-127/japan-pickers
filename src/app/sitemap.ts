import { getAllVehicleSlugs } from "@/lib/vehicles";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // ベースURL
  const baseUrl = "https://japan-pickers.com";

  // 現在の日付
  const currentDate = new Date().toISOString();

  // 静的ページの定義
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vehicles`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ] as const;

  // 車両詳細ページのURLを動的に生成
  const vehicleSlugs = getAllVehicleSlugs();
  const vehiclePages = vehicleSlugs.map((slug) => ({
    url: `${baseUrl}/vehicles/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 全てのURLを結合して返す
  return [...staticPages, ...vehiclePages];
}
