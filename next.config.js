/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 開発環境での警告を抑制
  onDemandEntries: {
    // 開発サーバーがページをメモリに保持する時間
    maxInactiveAge: 25 * 1000,
    // 同時にメモリに保持するページの数
    pagesBufferLength: 2,
  },
  // 不要な警告を抑制
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
