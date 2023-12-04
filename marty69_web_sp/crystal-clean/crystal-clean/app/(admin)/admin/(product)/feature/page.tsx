import prisma from "@/app/api/auth/prisma";

import { FeatureColumn } from "./components/columns";
import { FeaturesClient } from "./components/client";

export default async function FeaturesPage() {
  const Features = await prisma.feature.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const formattedFeatures: FeatureColumn[] = Features.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <main>
      <div className="divide-y divide-white/5">
        <div className=" max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <FeaturesClient data={formattedFeatures} />
        </div>
      </div>
    </main>
  );
}
