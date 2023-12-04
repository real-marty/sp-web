import "@/styles/tailwind.css";
import type { Metadata } from "next";
import { ToasterProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | CrystalCleanKV",
    default: "CrystalCleanKV | Profesionální čistírna obuvi a nejen to",
  },
  description: "CrystalClean je profesionální čistírna obuvi a nejen to",
};

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="bg-zinc-950">
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
