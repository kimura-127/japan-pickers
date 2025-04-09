/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://japan-pickers.com",
  generateRobotsTxt: true,
  // 除外したいページがあればここに記載
  exclude: ["/404", "/500"],
  // 静的ページの優先度設定
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  // 変更頻度の設定
  changefreq: "daily",
  // 優先度の設定
  priority: 0.7,
};
