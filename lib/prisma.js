import { PrismaClient } from "@prisma/client";

// Global pointer declaration to survive Next.js dev hot-reloads
const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
