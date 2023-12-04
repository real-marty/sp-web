import { ProductType } from "@/types/product-types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/product`;
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  specificationId?: string;
  isFeatured?: boolean;
}

export default async function getProducts(
  query: Query,
): Promise<ProductType[]> {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      specificationId: query.specificationId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const response = await fetch(url);
  const products = await response.json();

  return products;
}
