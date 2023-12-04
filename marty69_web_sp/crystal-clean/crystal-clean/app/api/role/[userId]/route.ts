import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const updaterRole = session?.user.role as string;
    const updaterEmail = session?.user.email as string;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (updaterRole !== "SUPER_ADMIN" && updaterRole !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userToBeUpdated = await prisma.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    if (!userToBeUpdated) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (
      updaterRole === "ADMIN" &&
      (userToBeUpdated.role === "SUPER_ADMIN" ||
        userToBeUpdated.role === "ADMIN")
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (userToBeUpdated.email === updaterEmail) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const prismaUpdate = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        role: "USER",
      },
    });
    return NextResponse.json(prismaUpdate);
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    // fetching the user
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();
    const { name, email, image, role: chagedRoleTo } = body;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!email || !name || !image || !chagedRoleTo) {
      return new NextResponse("Properties missing", { status: 400 });
    }

    const userToBeUpdated = await prisma.user.findFirst({
      where: {
        id: params.userId,
      },
    });
    if (!userToBeUpdated) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (
      (userToBeUpdated?.role === "SUPER_ADMIN" && role === "ADMIN") ||
      (userToBeUpdated?.role === "ADMIN" && role === "ADMIN")
    ) {
      return new NextResponse("No permission to update.", { status: 401 });
    }

    const prismaQuestion = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        email,
        image,
        role: chagedRoleTo,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(prismaQuestion);
  } catch (e) {
    console.log("[USER_UPDATE] ", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // fetching the user
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();
    const { name, email, image, role: creationRole } = body;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!email || !name || !image || !creationRole) {
      return new NextResponse("Properties missing", { status: 400 });
    }
    if (role === "ADMIN" && creationRole === "SUPER_ADMIN") {
      return new NextResponse("Cannot assign higher role", { status: 403 });
    }
    const prismaResponse = await prisma.user.create({
      data: {
        name,
        email,
        image,
        role: creationRole,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    });
    return NextResponse.json(prismaResponse);
  } catch (e) {
    console.log("[USER_CREATE] ", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
