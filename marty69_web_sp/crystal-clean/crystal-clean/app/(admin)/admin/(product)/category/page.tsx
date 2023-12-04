import { format } from "date-fns";

import prisma from "@/app/api/auth/prisma";

import { CategoryColumn } from "./components/columns";
import { CategoryClient } from "./components/client";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    updatedAt: format(item.updatedAt, "dd. MM. yyyy"),
    createdAt: format(item.createdAt, "dd. MM. yyyy"),
  }));

  return (
    <main>
      {/* Settings forms */}
      <div className="divide-y divide-white/5">
        <div className=" max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <CategoryClient data={formattedCategories} />
        </div>
      </div>
    </main>
  );
}
