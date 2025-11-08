import Navbar from "../components/Navbar.jsx";
import Product from "../ui/Product.jsx";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-gray-200 px-10 py-10 md:px-20 md:py-20 lg:px-60 lg:py-20">
      <Navbar />
      <Product />
    </div>
  );
};

export default Home;
