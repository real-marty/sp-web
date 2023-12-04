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
      return new NextResponse("Feature is required", { status: 400 });
    }

    const newFeature = await prisma.feature.create({
      data: {
        name, // use the name from the request body
      },
    });

    return NextResponse.json(newFeature);
  } catch (error) {
    console.log("[FEATURE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const feature = await prisma.feature.findMany();

    return NextResponse.json(feature);
  } catch (error) {
    console.log("[FEATURE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
