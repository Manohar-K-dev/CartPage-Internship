import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// Context
import MainContext from "../context/MainContext.jsx";
// Icons
import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, user } =
    useContext(MainContext);
  const navigate = useNavigate();

  // Safe image URL function
  const getProductImage = (product) => {
    if (product.image && Array.isArray(product.image) && product.image[0]) {
      return product.image[0];
    }
    if (product.image && typeof product.image === "string") {
      return product.image;
    }
    if (product.product?.image) {
      if (Array.isArray(product.product.image) && product.product.image[0]) {
        return product.product.image[0];
      }
      if (typeof product.product.image === "string") {
        return product.product.image;
      }
    }
    return "https://via.placeholder.com/100x100?text=No+Image";
  };

  // Safe product name function
  const getProductName = (product) => {
    return product.name || product.product?.name || "Unknown Product";
  };

  // Safe product price function
  const getProductPrice = (product) => {
    return product.price || product.product?.price || 0;
  };

  // Safe product ID function
  const getProductId = (product) => {
    return product._id || product.product?._id || product.productId;
  };

  const handleDecrease = (product) => {
    if (product.quantity > 1) {
      updateQuantity(getProductId(product), product.quantity - 1);
    }
  };

  const handleIncrease = (product) => {
    updateQuantity(getProductId(product), product.quantity + 1);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = (e) => {
    if (!user) {
      e.preventDefault();
      navigate("/registration");
    }
  };

  // Redirect to login if user is not logged in
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-10 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Please Login to View Cart
          </h1>
          <p className="text-gray-600 mb-8">
            You need to be logged in to access your shopping cart.
          </p>
          <Link
            to="/registration"
            className="bg-green-400 px-6 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors"
          >
            Login / Signup
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-10 py-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to see them here.
          </p>
          <Link
            to="/"
            className="bg-green-400 px-6 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 px-10 py-10 md:px-20 md:py-20 lg:grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20">
      <div className="flex flex-col gap-4">
        {cart.map((cartProduct) => (
          <div
            key={getProductId(cartProduct)}
            className="flex flex-col md:flex-row items-center gap-4 border-b-gray-600 border-b pb-4"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={getProductImage(cartProduct)}
                alt={getProductName(cartProduct)}
                className="h-24"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/100x100?text=No+Image";
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-sm">{getProductName(cartProduct)}</h2>
              <h1 className="font-semibold">
                ₹ {getProductPrice(cartProduct)}
              </h1>
            </div>
            <div className="flex gap-4 md:ml-auto">
              <div className="flex gap-2 border-y items-center">
                <button
                  onClick={() => handleDecrease(cartProduct)}
                  className="border-x p-2 outline-none cursor-pointer"
                >
                  <LuMinus />
                </button>
                <p className="text-lg px-2">{cartProduct.quantity}</p>
                <button
                  onClick={() => handleIncrease(cartProduct)}
                  className="border-x p-2 outline-none cursor-pointer"
                >
                  <LuPlus />
                </button>
              </div>
              <button
                onClick={() => handleRemove(getProductId(cartProduct))}
                className="text-red-600 outline-none cursor-pointer"
              >
                <LuTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-8 bg-gray-300 rounded-lg lg:rounded-2xl px-5 py-5 md:py-10 lg:px-20 lg:py-20">
        <h1 className="border-b-gray-600 border-b pb-8 text-xl lg:text-2xl font-semibold">
          Order Summary
        </h1>
        <div className="border-b-gray-600 border-b pb-8 flex flex-col gap-4">
          <div className="flex">
            <h2>
              Price ({cart.reduce((total, item) => total + item.quantity, 0)}{" "}
              items)
            </h2>
            <span className="ml-auto font-semibold">₹ {getCartTotal()}</span>
          </div>
          <div className="flex">
            <h2>Shipping Fee</h2>
            <span className="ml-auto font-semibold text-green-600">Free</span>
          </div>
          <div className="flex">
            <h2>Tax (2%)</h2>
            <span className="ml-auto font-semibold">
              ₹ {(getCartTotal() * 0.02).toFixed(2)}
            </span>
          </div>
          <div className="flex md:text-xl font-medium">
            <h2 className="">Total Amount:</h2>
            <span className="ml-auto">
              ₹ {(getCartTotal() * 1.02).toFixed(2)}
            </span>
          </div>
        </div>
        <Link
          to={user ? "/checkout" : "/registration"}
          onClick={handleCheckout}
          className="bg-green-400 flex items-center justify-center rounded-lg w-full py-2 font-medium cursor-pointer outline-none"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
