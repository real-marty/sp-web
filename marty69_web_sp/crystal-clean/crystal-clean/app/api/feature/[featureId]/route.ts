import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { featureId: string } },
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

    if (!params.featureId) {
      return new NextResponse("Missing featureId", { status: 400 });
    }

    const feature = await prisma.feature.updateMany({
      where: {
        id: params.featureId,
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(feature);
  } catch (error) {
    console.log("[FEATURE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { featureId: string } },
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

    if (!params.featureId) {
      return new NextResponse("featureId is required", { status: 400 });
    }

    const feature = await prisma.feature.deleteMany({
      where: {
        id: params.featureId,
      },
    });

    return NextResponse.json(feature);
  } catch (error) {
    console.log("[FEATURE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
