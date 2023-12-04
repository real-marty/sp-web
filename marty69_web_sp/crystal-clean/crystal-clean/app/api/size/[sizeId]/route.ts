import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();

    const { name, value } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!params.sizeId) {
      return new NextResponse("Missing sizeId", { status: 400 });
    }

    const size = await prisma.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }

    const size = await prisma.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
