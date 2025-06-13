import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

declare global {
  let prisma: PrismaClient | undefined;
}

export const db = new PrismaClient();
// export const db = new PrismaClient().$extends(withAccelerate());
