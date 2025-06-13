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
    await db.product.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error updating product", { status: 500 });
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
    await db.product.deleteMany({ where: { id: params.id } });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error deleting product", { status: 500 });
  }
}
