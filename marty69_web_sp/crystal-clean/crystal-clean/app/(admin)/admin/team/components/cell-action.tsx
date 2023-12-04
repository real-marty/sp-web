"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserColumn } from "./columns";
import { MoreHorizontal } from "lucide-react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import type { User } from "next-auth";
import { Role } from "@prisma/client";

interface CellActionProps {
  row: UserColumn;
  user?: User;
}

export const CellAction: React.FC<CellActionProps> = ({ row, user }) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/role/${row.id}`);
      toast.success("Uživateli byly úspěšně odebrány práva.");
    } catch (error) {
      toast.error("Nedostatečná práva, nebo uživatel neexistuje.");
    } finally {
      router.refresh();
    }
  };

  const isAllowedToSee = alowedToSee(user?.role, row.role);
  if (isAllowedToSee) {
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
              onClick={() => router.push(`/admin/team/${row.id}`)}
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
  } else {
    return <></>;
  }
};

function alowedToSee(updatingUserRole?: Role, userToBeUpdatedRole?: Role) {
  if (updatingUserRole === "SUPER_ADMIN") {
    return true;
  }
  if (
    updatingUserRole === "ADMIN" &&
    (userToBeUpdatedRole === "ADMIN" || userToBeUpdatedRole === "SUPER_ADMIN")
  ) {
    return false;
  }
  return true;
}
