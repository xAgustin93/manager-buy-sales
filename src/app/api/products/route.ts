import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const product = await db.product.create({
      data: body,
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error create product", { status: 500 });
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const products = await db.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error get products", { status: 500 });
  }
}
