import HighlightCarousel from "@/components/Home/HighlightCarousel";
import HomeCarousel from "@/components/Home/HomeCarousel";
import ProductDisplay from "@/components/Home/ProductDisplay";

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
