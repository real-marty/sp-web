import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";
import { ProductData } from "@/types/product-types";
import { Feature } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    const product = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
        specification: true,
        features: {
          include: {
            feature: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();

    const {
      description,
      name,
      priceCZK,
      priceEUR,
      categoryId,
      sizeId,
      colorId,
      specificationId,
      images,
      isFeatured,
      isArchived,
      features,
    } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!images?.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!priceCZK && !priceEUR) {
      return new NextResponse("Prices are required", { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse("Missing product id", { status: 400 });
    }

    await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        priceCZK,
        priceEUR,
        categoryId,
        sizeId,
        colorId,
        specificationId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
        features: {
          deleteMany: {},
        },
      },
    });

    const productData: ProductData = {};

    // Add optional fields only if they are provided
    if (categoryId) {
      productData.categoryId = categoryId;
    }
    if (sizeId) {
      productData.sizeId = sizeId;
    }
    if (colorId) {
      productData.colorId = colorId;
    }
    if (specificationId) {
      productData.specificationId = specificationId;
    }

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        features: {
          create: features.map((feature: Feature) => ({
            feature: {
              connect: { id: feature.id },
            },
          })),
        },
        ...productData,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!params.productId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
