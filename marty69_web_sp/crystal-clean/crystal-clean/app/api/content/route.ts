import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
  // fetching the user
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  } else return session;
}
