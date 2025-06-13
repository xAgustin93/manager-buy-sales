import { db } from "@/lib";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  res: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const params = await res.params;

    const purchase = await db.purchase.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json(purchase);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error update purchase", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  res: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const params = await res.params;
    await db.purchase.deleteMany({ where: { id: params.id } });
    return NextResponse.json("Ok");
  } catch (error) {
    console.error(error);
    return new NextResponse("Error delete purchase");
  }
}
