import { db } from "@/lib";

export async function getPurchasesAll() {
  return await db.purchase.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          note: true,
        },
      },
    },
  });
}

export async function getPurchasesNoStock() {
  return await db.purchase.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      stock: 0,
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          note: true,
        },
      },
    },
  });
}

export async function getPurchasesStock() {
  return await db.purchase.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      stock: {
        gt: 0,
      },
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          note: true,
        },
      },
    },
  });
}
