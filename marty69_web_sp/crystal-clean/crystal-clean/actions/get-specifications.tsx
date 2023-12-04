import { Specification } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/specification`;

export default async function getSpecifications(): Promise<Specification[]> {
  const response = await fetch(URL);
  const specifiaction = await response.json();

  return specifiaction;
}
