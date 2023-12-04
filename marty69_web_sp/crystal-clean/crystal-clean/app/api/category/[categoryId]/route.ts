import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();

    const { name } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Missing category id", { status: 400 });
    }

    const category = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (role !== "SUPER_ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const category = await prisma.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
