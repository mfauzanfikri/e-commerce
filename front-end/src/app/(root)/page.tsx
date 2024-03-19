import { HighlightCarousel, HomeCarousel } from "@/components/home";
import ProductDisplay from "@/components/product-display";

const Home = () => {
  return (
    <main className="container mx-auto pb-5 pt-[60px] md:pt-20 lg:pt-40">
      <div id="home" className="scroll-m-[60px] md:scroll-m-20 lg:scroll-m-40">
        <HomeCarousel />
      </div>
      <div
        id="highlights"
        className="scroll-m-16 md:scroll-m-20 lg:scroll-m-40"
      >
        <HighlightCarousel />
      </div>
      <div id="products" className="scroll-m-16 md:scroll-m-14 lg:scroll-m-32">
        <ProductDisplay />
      </div>
    </main>
  );
};

export default Home;
