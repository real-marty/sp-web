import type { Metadata } from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import AuthProvider from "../../components/auth/auth-provider";
import Navigation from "@/components/shop/navigation/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | CrystalCleanKV",
    default: "Crystal Clean | Profesionální čistírna obuvi a nejen to",
  },
  description:
    "Crystal Clean je profesionální čistírna obuvi, naleznete zde ještě další služby jako je čištění čepic, pantoflí a mnoho dalšího.",
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // fetching the user
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <AuthProvider>
      <section>
        <Navigation user={user}>{children}</Navigation>
      </section>
    </AuthProvider>
  );
}
