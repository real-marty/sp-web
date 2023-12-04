"use client";

import { DataTable } from "@/components/ui/data-table";

import { getColumns, UserColumn } from "./columns";
import type { User } from "next-auth";

interface TeamClientProps {
  data: UserColumn[];
  user?: User;
}

export const TeamClient: React.FC<TeamClientProps> = ({ data, user }) => {
  let filteredColumns = getColumns(user);

  return (
    <>
      <div className="pb-5 flex items-center justify-between ">
        <div>
          <h2 className="text-base font-semibold leading-7 text-white">
            Administrátoři - ({data.length})
          </h2>
        </div>
      </div>
      <DataTable
        searchKey="name"
        searchPlaceholder="Hledat pomocí názvu"
        columns={filteredColumns}
        data={data}
      />
    </>
  );
};
