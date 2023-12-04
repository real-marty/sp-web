import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/api/auth/prisma";
import { Feature } from "@prisma/client";
import { ProductData } from "@/types/product-types";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.user.role as string;
    const body = await req.json();
    const {
      name,
      description,
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

    if (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR") {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (!name || !description || !priceCZK || !priceEUR || !images?.length) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!images?.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!priceCZK && !priceEUR) {
      return new NextResponse("Prices are required", { status: 400 });
    }

    const productData: ProductData = {};
    // Then, connect the features to the product

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

    const product = await prisma.product.create({
      data: {
        name,
        description,
        priceCZK,
        priceEUR,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isFeatured,
        isArchived,
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
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") ?? undefined;
    const sizeId = searchParams.get("sizeId") ?? undefined;
    const colorId = searchParams.get("colorId") ?? undefined;
    const specificationId = searchParams.get("specificationId") ?? undefined;
    const isFeatured = searchParams.get("isFeatured");

    const products = await prisma.product.findMany({
      where: {
        categoryId,
        sizeId,
        colorId,
        specificationId,
        isFeatured: isFeatured === "true" ? true : undefined,
        isArchived: false,
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
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
