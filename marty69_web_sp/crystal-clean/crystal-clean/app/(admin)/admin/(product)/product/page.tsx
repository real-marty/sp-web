import prisma from "@/app/api/auth/prisma";
import { ProductColumn } from "./components/columns";
import { ProductClient } from "./components/client";
import { formatterCZ, formatterSK } from "@/lib/utils";
import format from "date-fns/format";

export default async function ProductPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      size: true,
      color: true,
      specification: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    priceCZK: formatterCZ.format(item.priceCZK.toNumber()),
    priceEUR: formatterSK.format(item.priceEUR.toNumber()),
    category: item.category?.name,
    size: item.size?.name,
    color: item.color?.value,
    specification: item.specification?.name,
    updatedAt: format(item.updatedAt, "dd. MM. yyyy"),
    createdAt: format(item.createdAt, "dd. MM. yyyy"),
  }));

  return (
    <main>
      {/* Settings forms */}
      <div className="divide-y divide-white/5">
        <div className=" max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <ProductClient data={formattedProducts} />
        </div>
      </div>
    </main>
  );
}
