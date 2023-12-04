export interface FeaturedItem {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export interface Category {
  name: string;
  featured: FeaturedItem[];
}

export interface Page {
  name: string;
  href: string;
}

export interface Navigation {
  categories: Category[];
  pages: Page[];
}

export const useEshopNavigation = (categories: Category[]): Navigation => {
  const pages: Page[] = [
    { name: "VŠECHNY SLUŽBY", href: "/products" },
    { name: "PODACÍ MÍSTA", href: "/locations" },
  ];

  const navigation: Navigation = { categories, pages };
  return navigation;
};
