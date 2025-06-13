import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  getPurchasesAll,
  getPurchasesNoStock,
  getPurchasesStock,
} from "./functions";
import { db } from "@/lib";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const hiddeNoStock = searchParams.get("hiddeNoStock");
  let purchases = null;

  try {
    if (!hiddeNoStock || hiddeNoStock === "undefined") {
      purchases = await getPurchasesAll();
    }
    if (hiddeNoStock === "true") {
      purchases = await getPurchasesStock();
    }
    if (hiddeNoStock === "false") {
      purchases = await getPurchasesNoStock();
    }

    return NextResponse.json(purchases);
  } catch (error) {
    console.error(error);
    return new NextResponse("Get purchases error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const purchase = await db.purchase.create({
      data: { ...body, stock: body.quantity },
    });
    return NextResponse.json(purchase);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error create purchase", { status: 500 });
  }
}
