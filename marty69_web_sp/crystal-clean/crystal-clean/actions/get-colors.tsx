import { Color } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/color`;

export default async function getColors(): Promise<Color[]> {
  const response = await fetch(URL);
  const colors = await response.json();

  return colors;
}
