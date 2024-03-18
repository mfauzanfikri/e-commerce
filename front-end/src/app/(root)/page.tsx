import HighlightCarousel from "@/components/home/highlight-carousel";
import HomeCarousel from "@/components/home/home-carousel";
import ProductDisplay from "@/components/home/product-display";

const Home = () => {
  return (
    <main className="container mx-auto my-5">
      <div id="home">
        <HomeCarousel />
      </div>
      <div id="highlights">
        <HighlightCarousel />
      </div>
      <div id="products">
        <ProductDisplay />
      </div>
    </main>
  );
};

export default Home;
