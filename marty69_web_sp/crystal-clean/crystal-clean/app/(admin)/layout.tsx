import type { Metadata } from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import NotFound from "@/app/not-found";
import AdminNavigation from "../../components/admin/navigation/layout/a-desktop-navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | CrystalCleanKV",
    default: "CrystalCleanKV | Admin Panel",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // fetching the user
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = session?.user.role;

  if (role === "ADMIN" || role === "SUPER_ADMIN" || role === "MODERATOR") {
    return (
      <section>
        <AdminNavigation user={user}>{children}</AdminNavigation>
      </section>
    );
  } else {
    return <NotFound></NotFound>;
  }
}
