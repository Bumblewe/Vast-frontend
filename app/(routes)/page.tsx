import getBanners from "@/actions/get-banners";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Banners from "@/components/ui/banners";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { Banner } from "@/types";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const banners = await getBanners();

  return (
    <Container className="nav-padding">
      <div className="space-y-10 pb-10">
        <Banners 
          data={banners}
        />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
};

export default HomePage;
