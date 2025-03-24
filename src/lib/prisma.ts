import { PrismaClient } from "@prisma/client";

// グローバルスコープでPrismaClientのインスタンスを保持するための型宣言
declare global {
  var prisma: PrismaClient | undefined;
}

// 開発環境でのホットリロード時に複数のPrismaClientインスタンスが作成されるのを防ぐ
const prismaClient =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prismaClient;
