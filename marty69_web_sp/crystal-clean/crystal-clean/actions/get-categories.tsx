import { Category } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/category`;

export default async function getCategories(): Promise<Category[]> {
  const response = await fetch(URL);
  const categories = await response.json();

  return categories;
}
