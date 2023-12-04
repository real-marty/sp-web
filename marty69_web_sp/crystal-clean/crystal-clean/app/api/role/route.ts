import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function POST(req: Request) {
  try {
    // fetching the user
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();
    const { email } = body;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized not valid email", { status: 401 });
    }
    if (!email) {
      return new NextResponse("Properties missing", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (
      user?.role === "SUPER_ADMIN" ||
      user?.role === "ADMIN" ||
      user?.role === "MODERATOR"
    ) {
      return new NextResponse(
        "Wrong request, cannot update user that is already superuser",
        { status: 401 },
      );
    }
    const prismaQuestion = await prisma.user.update({
      where: {
        email,
      },
      data: {
        role: "MODERATOR",
      },
    });
    return NextResponse.json(prismaQuestion);
  } catch (e) {
    console.log("[MODERATOR_POST] ", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
