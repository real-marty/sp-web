import AdminSearch from "@/components/admin/a-search-bar";
import { AdminBreadCrumb } from "@/components/admin/navigation/a-bread-crumb";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <AdminSearch />
      <main>
        <header className="border-b border-white/5">
          {/* Secondary navigation */}
          <nav className="flex overflow-x-auto py-4">
            <AdminBreadCrumb />
          </nav>
        </header>
        {/* Settings forms */}
        {children}
      </main>
    </section>
  );
}
