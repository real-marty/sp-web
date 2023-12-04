export default async function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { productID: string };
}>) {
  return <section className="bg-zinc-950">{children}</section>;
}
