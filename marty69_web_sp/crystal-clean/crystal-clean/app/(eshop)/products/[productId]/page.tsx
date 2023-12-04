import getProduct from "@/actions/get-product";
import getFeatures from "@/actions/get-product-features";
import getProducts from "@/actions/get-products";
import Footer from "@/components/shop/navigation/footer";
import ProductPageComponent from "@/components/shop/product/product-page-component";

interface ProductPageProps {
  params: { productId: string };
}

export const revalidate = 0;

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const features = await getFeatures(params.productId);

  //todo add suggested products
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  return (
    <div className="pt-32">
      <ProductPageComponent product={product} features={features as []} />
      <Footer />
    </div>
  );
};

export default ProductPage;
