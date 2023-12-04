import { ProductType } from "@/types/product-types";
import { Feature } from "@prisma/client";

type FeatureType = {
  featureId: string;
  feature: Feature;
};

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;

export default async function getFeatures(
  productId: string,
): Promise<Feature[] | undefined> {
  const response = await fetch(`${URL}/${productId}`);
  const product: ProductType = await response.json();

  const featureArray = product.features
    .map((f: FeatureType) => f.feature)
    .filter((feature): feature is Feature => feature !== undefined);

  return featureArray;
}
