import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";

export async function POST(req: Request) {
  try {
    // fetching the user
    const session = await getServerSession(authOptions);
    const mail = session?.user.email as string;
    const body = await req.json();
    const { firstName, lastName, email, message } = body;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized not valid email", { status: 401 });
    }
    if (!firstName || !email || !message) {
      return new NextResponse("Properties missing", { status: 400 });
    }

    const prismaQuestion = await prisma.user_message.create({
      data: {
        name: firstName,
        surname: lastName,
        regEmail: mail,
        email,
        message,
      },
    });
    return NextResponse.json(prismaQuestion);
  } catch (e) {
    console.log("[EMAIL_POST] ", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}
