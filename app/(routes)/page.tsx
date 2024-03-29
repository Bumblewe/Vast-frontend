import getBanners from "@/actions/get-banners";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Banners from "@/components/ui/banners";
import Container from "@/components/ui/container";

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
