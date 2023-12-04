"use client";

import { ColumnDef } from "@tanstack/react-table";
import Mark from "@/components/ui/mark";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  total: string;
  products: string;
  createdAt: string;
};

export const colums: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Produkty",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
  },
  {
    accessorKey: "address",
    header: "Adresa",
  },

  {
    accessorKey: "total",
    header: "Cena",
  },
  {
    accessorKey: "isPaid",
    header: "Zaplaceno?",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-1 text-white">
        <Mark type={row.original.isPaid} />
        {String(row.original.isPaid)}
      </div>
    ),
  },
  { accessorKey: "done", header: "Vyřízeno?" },
];
