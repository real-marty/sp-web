import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();
    const { name } = body;

    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    const specification = await prisma.specification.create({
      data: {
        name,
      },
    });

    return NextResponse.json(specification);
  } catch (error) {
    console.log("[SPECIFICATION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const specifications = await prisma.specification.findMany();

    return NextResponse.json(specifications);
  } catch (error) {
    console.log("[SPECIFICATION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
