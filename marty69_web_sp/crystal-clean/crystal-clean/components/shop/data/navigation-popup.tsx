import { Role } from "@prisma/client";
import { signOut } from "next-auth/react";
import { MouseEvent } from "react";

export const useGlobalNavigationPopup = (role: Role) => {
  const isAdminOrModerator = (role: Role) =>
    role === "ADMIN" || role === "SUPER_ADMIN" || role === "MODERATOR";

  const navigation = [
    { name: "Profil", href: "#", onClick: null },
    { name: "Nastavení", href: "#", onClick: null },
    {
      name: "Odhlásit se",
      href: "#",
      onClick: (e: MouseEvent<HTMLAnchorElement>) => {
        signOut();
      },
    },
  ];

  if (isAdminOrModerator(role)) {
    navigation.push({ name: "Administrace", href: "/admin", onClick: null });
  }

  return navigation;
};
