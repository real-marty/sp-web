import prisma from "@/app/api/auth/prisma";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import { UserColumn } from "./components/columns";
import { TeamClient } from "./components/client";
import AddModeratorForm from "./components/add-moderator-form";

export default async function TeamsPage() {
  const session = await getServerSession(authOptions);
  const usr = session?.user;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    where: {
      role: {
        in: [Role.MODERATOR, Role.ADMIN, Role.SUPER_ADMIN],
      },
    },
  });

  const formattedUsers: UserColumn[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <main>
      <div className="divide-y divide-white/5">
        <div className=" max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <TeamClient data={formattedUsers} user={usr} />
        </div>
        {(usr?.role === "SUPER_ADMIN" || usr?.role === "ADMIN") && (
          <div>
            <div className=" lg:w-3/5  py-5 text-white">
              <AddModeratorForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
