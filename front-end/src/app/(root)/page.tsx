import HighlightCarousel from "@/components/Home/highlightCarousel";
import HomeCarousel from "@/components/Home/homeCarousel";
import ProductDisplay from "@/components/Home/productDisplay";

const Home = () => {
  return (
    <div className="my-5">
      <div id="home">
        <HomeCarousel />
      </div>
      <div id="highlights">
        <HighlightCarousel />
      </div>
      <div id="products">
        <ProductDisplay />
      </div>
    </div>
  );
};

export default Home;
