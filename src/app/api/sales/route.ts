import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const products = await db.sale.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        purchase: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                note: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error fetching sales", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const sale = await db.sale.create({
      data: body,
    });
    return NextResponse.json(sale);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error creating sale", { status: 500 });
  }
}
