// assets
import { useContext } from "react";
// Context
import MainContext from "../context/MainContext.jsx";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { products, loading, addToCart, user } = useContext(MainContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
    } else {
      navigate("/registration");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product._id} className="flex flex-col gap-4">
          <div>
            <img src={product.image[0]} alt={product.name} className="h-full" />
          </div>
          <div className="flex flex-col gap-2">
            <h1>{product.name}</h1>
            <p className="font-semibold text-xl">₹ {product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-400/50 md:hover:bg-green-400 cursor-pointer px-4 py-2 rounded-lg text-sm font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
