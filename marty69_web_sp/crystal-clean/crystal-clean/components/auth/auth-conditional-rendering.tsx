"use client";

import { useSession } from "next-auth/react";

export default function AuthCheck({ children }: { children?: any }) {
  const { data: session, status } = useSession();
  if (
    session?.user.role === "ADMIN" ||
    session?.user.role === "SUPER_ADMIN" ||
    session?.user.role === "MODERATOR"
  ) {
  }

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
