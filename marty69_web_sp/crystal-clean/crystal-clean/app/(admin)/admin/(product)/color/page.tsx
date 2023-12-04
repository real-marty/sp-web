import { format } from "date-fns";

import prisma from "@/app/api/auth/prisma";

import { ColorColumn } from "./components/columns";
import { ColorClient } from "./components/client";

export default async function ColorPage() {
  const color = await prisma.color.findMany({
    select: {
      id: true,
      name: true,
      value: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColor: ColorColumn[] = color.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    updatedAt: format(item.updatedAt, "dd. MM. yyyy"),
    createdAt: format(item.createdAt, "dd. MM. yyyy"),
  }));

  return (
    <main>
      {/* Settings forms */}
      <div className="divide-y divide-white/5">
        <div className=" max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <ColorClient data={formattedColor} />
        </div>
      </div>
    </main>
  );
}
