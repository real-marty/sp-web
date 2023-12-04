import prisma from "@/app/api/auth/prisma";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
      features: {
        include: {
          feature: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany();
  const sizes = await prisma.size.findMany();
  const colors = await prisma.color.findMany();
  const specifications = await prisma.specification.findMany();
  const features = await prisma.feature.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          features={features}
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
          specifications={specifications}
        />
      </div>
    </div>
  );
};

export default ProductPage;
