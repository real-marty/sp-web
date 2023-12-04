import prisma from "@/app/api/auth/prisma";

import { FeatureForm } from "./components/feature-form";

const FeaturesPage = async ({ params }: { params: { featureId: string } }) => {
  const feature = await prisma.feature.findUnique({
    where: {
      id: params.featureId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FeatureForm initialData={feature} />
      </div>
    </div>
  );
};

export default FeaturesPage;
