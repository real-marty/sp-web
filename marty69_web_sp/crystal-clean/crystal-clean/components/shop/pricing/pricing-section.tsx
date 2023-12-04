import getProducts from "@/actions/get-products";
import PricingGroup from "./pricing-section-group";
import PricingTiers from "./pricing-section-tiers";
import getCategories from "@/actions/get-categories";
import { ProductType } from "@/types/product-types";

export const revalidate = 60 * 60 * 24; // 24 hours

const formatProduct = (product: ProductType, index: number) => {
  // Assuming the middle product is the one at index 1 (second in a list of three)
  const isMiddleProduct = index === 1;
  return {
    name: product.name,
    id: product.id,
    href: `products/${product.id}`,
    featured: isMiddleProduct,
    description: product.description,
    price: {
      CZK: product.priceCZK,
      EUR: product.priceEUR,
    },
    mainFeatures: product.features.map((f) =>
      f.feature ? f.feature.name : undefined,
    ),
  };
};

export default async function PricingSection() {
  const categories = await getCategories();
  const products = await getProducts({ isFeatured: true });
  const firstCategory = categories[0];
  const firstCategoryProducts = products
    .slice(0, 3)
    .filter((product) => product.categoryId === firstCategory.id);

  const formattedProducts = firstCategoryProducts.map((product, index) =>
    formatProduct(product, index),
  );

  return (
    <div className="isolate overflow-hidden">
      <div className="flow-root bg-zinc-950 pb-16 pt-24 sm:pt-32 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative z-10">
            <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">
              Nevíte co si vybrat? Zkuste jednu z těchto služeb!
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">
              V naší čistírně bot klademe důraz na preciznost a důkladnost. Díky
              rozsáhlým zkušenostem s čištěním různých typů a značek bot se
              můžeme pyšnit statusem profesionálních cleanerů. Vaše obuv je u
              nás v dobrých rukou a vrátíme ji vám v dokonalém stavu.
            </p>
            <div className="mt-16 flex justify-center">
              <PricingGroup />
            </div>
          </div>
          <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
            <svg
              viewBox="0 0 1208 1024"
              aria-hidden="true"
              className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
            >
              <ellipse
                cx={604}
                cy={512}
                fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)"
                rx={604}
                ry={512}
              />
              <defs>
                <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                  <stop stopColor="#4b0000" />
                  <stop offset={1} stopColor="#4b0000" />
                </radialGradient>
              </defs>
            </svg>
            <div
              className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-zinc-800/80 lg:ring-1 lg:ring-white/10"
              aria-hidden="true"
            />
            <PricingTiers data={formattedProducts as []} />
          </div>
        </div>
      </div>
      <div className="relative bg-zinc-950 lg:pt-14"></div>
    </div>
  );
}
