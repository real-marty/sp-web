"use client";

import Link from "next/link";

import { useAdminBreadCrumb } from "@/components/admin/navigation/data/a-navigation";

export function AdminBreadCrumb() {
  const adminBreadCrumb = useAdminBreadCrumb();

  return (
    <ul className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8">
      {adminBreadCrumb.map((item) => (
        <li key={item.name}>
          <Link href={item.href}>
            <p className={item.current ? "text-red-700" : ""}>{item.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
