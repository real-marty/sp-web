import prisma from "@/app/api/auth/prisma";

import { SpecificationForm } from "./components/specification-form";

const SpecificationPage = async ({
  params,
}: {
  params: { specificationId: string };
}) => {
  const specification = await prisma.specification.findUnique({
    where: {
      id: params.specificationId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecificationForm initialData={specification} />
      </div>
    </div>
  );
};

export default SpecificationPage;
