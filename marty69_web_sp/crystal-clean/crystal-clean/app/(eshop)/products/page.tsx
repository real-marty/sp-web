import getCategories from "@/actions/get-categories";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getSpecifications from "@/actions/get-specifications";
import Footer from "@/components/shop/navigation/footer";
import MobileMenuFilterOpen from "@/components/shop/products/mobile-filter-menu-open";
import {
  MobileFilters,
  MobileFitersWrapper,
  ProductsFilters,
} from "@/components/shop/products/products-filters";
import ProductList from "@/components/shop/products/products-list";

export const revalidate = 0;

interface ProductPageProps {
  searchParams: {
    sizeId: string;
    colorId: string;
    specificationId: string;
    categoryId: string;
  };
}
const ProductsPage: React.FC<ProductPageProps> = async ({ searchParams }) => {
  const products = await getProducts({
    isFeatured: true,
    categoryId: searchParams.categoryId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    specificationId: searchParams.specificationId,
  });

  const categories = await getCategories();
  const sizes = await getSizes();
  const colors = await getColors();
  const specifications = await getSpecifications();

  return (
    <div className="pt-10">
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:pt-8 border-b border-b-zinc-700">
        <div className="border-b border-zinc-700 pb-10 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Seznam všech produktů
          </h1>
          <p className="mt-4 text-base text-zinc-200">
            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
          </p>
        </div>
        <div>
          <MobileFitersWrapper>
            <MobileFilters
              data={categories}
              name="Kategorie"
              valueKey="categoryId"
            />
            <MobileFilters
              data={specifications}
              name="Zaměření"
              valueKey="specificationId"
            />
            <MobileFilters data={colors} name="Barva" valueKey="colorId" />
            <MobileFilters data={sizes} name="Velikost" valueKey="sizeId" />
          </MobileFitersWrapper>
          {/* <ProductsBreadCrumb /> */}
        </div>

        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filtrace</h2>
            <MobileMenuFilterOpen />
            <div className="hidden lg:block">
              <div className="space-y-10 divide-y divide-zinc-700">
                {categories.length > 0 && (
                  <div className="pt-10">
                    <fieldset>
                      <ProductsFilters
                        valueKey="categoryId"
                        name="Kategorie"
                        data={categories}
                      />
                    </fieldset>
                  </div>
                )}
                {specifications.length > 0 && (
                  <div className="pt-10">
                    <fieldset>
                      <ProductsFilters
                        valueKey="specificationId"
                        name="Zaměření"
                        data={specifications}
                      />
                    </fieldset>
                  </div>
                )}
                {colors.length > 0 && (
                  <div className="pt-10">
                    <fieldset>
                      <ProductsFilters
                        valueKey="colorId"
                        name="Barva"
                        data={colors}
                      />
                    </fieldset>
                  </div>
                )}
                {sizes.length > 0 && (
                  <div className="pt-10">
                    <fieldset>
                      <ProductsFilters
                        valueKey="sizeId"
                        name="Velikost"
                        data={sizes}
                      />
                    </fieldset>
                  </div>
                )}
              </div>
            </div>
          </aside>
          <ProductList items={products} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
