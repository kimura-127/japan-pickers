import { PrismaClient } from "@prisma/client";

// PrismaClientのグローバルインスタンスを宣言
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// 開発環境でのホットリロード時に複数のPrismaClientインスタンスが作成されるのを防ぐ
const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaClient;

export const prisma = prismaClient;
export default prismaClient;
