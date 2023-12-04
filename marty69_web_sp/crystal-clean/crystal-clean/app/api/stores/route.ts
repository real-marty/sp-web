import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;

    if (!session || !role) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    if (role !== "SUPER_ADMIN") {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse(JSON.stringify({ error: "Name is required" }), {
        status: 400,
      });
    }
    const userEmail = session.user?.email;

    if (userEmail === null || userEmail === undefined) {
      return new NextResponse(
        JSON.stringify({ error: "Not valid email, or user email is null" }),
        {
          status: 400,
        },
      );
    } else {
      const usr = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      });
      if (!usr || usr.id === null) {
        return new NextResponse(JSON.stringify({ error: "User not found" }), {
          status: 403,
        });
      }

      const store = await prisma.store.create({
        data: {
          name,
          userId: usr.id,
        },
      });
      return NextResponse.json(store);
    }

    // Now userEmail is guaranteed to be either string or undefined, but not null
  } catch (error) {
    console.error("[STORES_POST]", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 },
    );
  }
}
