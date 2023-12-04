import AdminSearch from "@/components/admin/a-search-bar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <AdminSearch />
      <main>
        <header className="border-b border-white/5">
          {/* Secondary navigation */}
        </header>
        {/* Settings forms */}
        {children}
      </main>
    </section>
  );
}
