import { format } from "date-fns";

import prisma from "@/app/api/auth/prisma";

import { OrderColumn } from "./components/columns";
import { OrderClient } from "./components/client";
import { formatterCZ } from "@/lib/utils";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: { include: { product: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderedItem) => orderedItem.product.name)
      .join(", "),
    total: formatterCZ.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.priceCZK);
      }, 0),
    ),
    createdAt: format(item.createdAt, "dd. MM. yyyy"),
  }));

  return (
    <main>
      {/* Settings forms */}
      <div className="divide-y divide-white/5">
        <div className=" max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <OrderClient data={formattedOrders} />
        </div>
      </div>
    </main>
  );
}
