import type { User } from "next-auth";
import NavigationProvider from "./navigation-provider";
import prisma from "@/app/api/auth/prisma";

export const revalidate = 60 * 60 * 24; // 24 hours

export default async function Navigation({
  children,
  user,
}: Readonly<{
  children?: any;
  user?: User;
}>) {
  // Fetch the first two categories from that store
  const rawCategories = await prisma.category.findMany({
    take: 2,
    include: {
      products: {
        where: {
          isFeatured: true,
          isArchived: false,
        },
        take: 4,
        include: {
          images: {
            take: 1,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Transform categories and products into the required navigation structure
  const categories = rawCategories.map((category) => ({
    name: category.name,
    featured: category.products.map((product) => ({
      name: product.name,
      href: "/products/" + product.id, // Assuming you have a route for individual products
      imageSrc: product.images[0]?.url || "default-image-url", // Provide a default image URL if no image is available
      imageAlt: `Obrázek na kterém je ${product.name}`,
    })),
  }));

  return (
    <div className="relative bg-zinc-950">
      <NavigationProvider categories={categories} user={user}>
        {children}
      </NavigationProvider>
    </div>
  );
}
