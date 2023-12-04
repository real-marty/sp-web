import Link from "next/link";

const breadcrumbs = [{ id: 1, name: "Men", href: "#" }];

const ProductsBreadCrumb = () => {
  // todo add to page
  return (
    <div className="border-b border-zinc-700">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <ol className="flex items-center space-x-4 py-4">
          {breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center">
                <a
                  href={breadcrumb.href}
                  className="mr-4 text-sm font-medium text-zinc-200"
                >
                  {breadcrumb.name}
                </a>
                <svg
                  viewBox="0 0 6 20"
                  aria-hidden="true"
                  className="h-5 w-auto text-zinc-300"
                >
                  <path
                    d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </li>
          ))}
          <li className="text-sm">
            <Link
              href="#"
              aria-current="page"
              className="font-medium text-zinc-500 hover:text-zinc-600"
            >
              New Arrivals
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default ProductsBreadCrumb;
