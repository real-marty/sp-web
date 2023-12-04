import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { specificationId: string } },
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
    if (!params.specificationId) {
      return new NextResponse("Missing specificationId", { status: 400 });
    }

    const specification = await prisma.specification.updateMany({
      where: {
        id: params.specificationId,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(specification);
  } catch (error) {
    console.log("[SPECIFICATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { specificationId: string } },
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

    if (!params.specificationId) {
      return new NextResponse("specificationId is required", { status: 400 });
    }

    const specification = await prisma.specification.deleteMany({
      where: {
        id: params.specificationId,
      },
    });

    return NextResponse.json(specification);
  } catch (error) {
    console.log("[SPECIFICATION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
