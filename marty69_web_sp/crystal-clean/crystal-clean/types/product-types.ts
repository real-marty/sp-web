import {
  Image,
  Category,
  Size,
  Specification,
  Color,
  Feature,
} from "@prisma/client";

export interface ProductData {
  categoryId?: string;
  sizeId?: string;
  colorId?: string;
  specificationId?: string;
}

export interface ProductType {
  id: string;
  categoryId: string | null;
  name: string;
  description: string;
  priceCZK: string;
  priceEUR: string;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string | null;
  specificationId: string | null;
  colorId: string | null;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  category: Category;
  size: Size; // Update the type if you have a specific type for size
  color: Color; // Update the type if you have a specific type for color
  specification: Specification; // Update the type if you have a specific type for specification
  features: {
    featureId: string;
    feature: Feature;
  }[];
}

export interface ImageType {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
