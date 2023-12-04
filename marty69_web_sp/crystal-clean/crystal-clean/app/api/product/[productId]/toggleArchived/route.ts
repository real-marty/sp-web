import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();
    const { isArchived } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!params.productId) {
      return new NextResponse("Missing product id", { status: 400 });
    }

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        isArchived: {
          set: isArchived,
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[ARCHIVED_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
