"use client";

import { DataTable } from "@/components/ui/data-table";
import { colums, OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <div className="border-b border-gray-700 pb-5 flex items-center justify-between ">
        <div>
          <h2 className="text-base font-semibold leading-7 text-white">
            Seznam všech objednávek - ({data.length})
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Nastavení objednávek v obchodu
          </p>
        </div>
      </div>
      <DataTable
        searchKey="phone"
        searchPlaceholder="Hledat pomocí telefonu"
        columns={colums}
        data={data}
      />
    </>
  );
};
