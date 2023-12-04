"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { colums, ProductColumn } from "./columns";
import { PlusIcon } from "@heroicons/react/24/outline";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="border-b border-gray-700 pb-5 flex items-center justify-between ">
        <div>
          <h2 className="text-base font-semibold leading-7 text-white">
            Seznam všech produktů / služeb - ({data.length})
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Nastavení produktů / služeb v obchodu
          </p>
        </div>
        <div className="flex">
          <div className="mt-3 sm:ml-4 sm:mt-0 ">
            <button
              onClick={() => router.push(`/admin/product/new`)}
              type="button"
              className="inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="h-5 w-5 mr-1 text-white" />
              Přidat produkt / službu
            </button>
          </div>
        </div>
      </div>
      <DataTable
        searchKey="name"
        searchPlaceholder="Hledat pomocí názvu"
        columns={colums}
        data={data}
      />
    </>
  );
};
