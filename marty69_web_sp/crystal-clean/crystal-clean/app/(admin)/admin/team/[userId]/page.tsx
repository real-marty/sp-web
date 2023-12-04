import prisma from "@/app/api/auth/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserForm } from "./components/user-form";

const UserPage = async ({ params }: { params: { userId: string } }) => {
  const session = await getServerSession(authOptions);
  const usr = session?.user;
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} user={usr} />
      </div>
    </div>
  );
};

export default UserPage;
