"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CategoryColumn } from "./columns";
import { MoreHorizontal } from "lucide-react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionProps {
  row: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ row }) => {
  const router = useRouter();
  const onDelete = async () => {
    try {
      await axios.delete(`/api/category/${row.id}`);
      toast.success("Kategorie byla smazána.");
    } catch (error) {
      toast.error("Něco se pokazilo.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="pt-1">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="mx-2 ">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Otevřít nabídku</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Akce: </DropdownMenuLabel>
          <DropdownMenuItem
            className="text-xs font-bold cursor-pointer"
            onClick={() => router.push(`/admin/category/${row.id}`)}
          >
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Upravit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs font-bold cursor-pointer"
            onClick={() => onDelete()}
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Smazat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
