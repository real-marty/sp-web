import { ProductType } from "@/types/product-types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;

export default async function getProduct(id: string): Promise<ProductType> {
  const response = await fetch(`${URL}/${id}`);
  const product = await response.json();

  return product;
}
