import { Size } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/size`;

export default async function getSizes(): Promise<Size[]> {
  const response = await fetch(URL);
  const sizes = await response.json();

  return sizes;
}
