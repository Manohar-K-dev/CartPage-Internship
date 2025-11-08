// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MainContext from "../context/MainContext";
// import { checkoutAPI } from "../services/api";

// const Checkout = () => {
//   const { cart, getCartTotal, user } = useContext(MainContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     phone: "",
//   });

//   // Redirect if not logged in or cart is empty
//   if (!user) {
//     navigate("/registration");
//     return null;
//   }

//   if (cart.length === 0) {
//     navigate("/cart");
//     return null;
//   }

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await checkoutAPI.create();
//       alert(`Order placed successfully! Order ID: ${response.receipt.orderId}`);
//       navigate("/");
//     } catch (error) {
//       alert(`Error placing order: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const subtotal = getCartTotal();
//   const tax = subtotal * 0.02;
//   const total = subtotal + tax;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-5 py-10 md:px-20 xl:px-60 md:py-20 lg:grid lg:grid-cols-2 gap-10 lg:gap-20">
//       <div className="w-full flex flex-col justify-center gap-8 p-10 bg-gray-300 rounded-lg">
//         <h1 className="font-semibold text-xl md:text-2xl">Shipping Address</h1>
//         <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
//           <label className="flex flex-col gap-2">
//             <span>Street Address *</span>
//             <input
//               type="text"
//               name="street"
//               value={formData.street}
//               onChange={handleInputChange}
//               placeholder="Enter your street address"
//               className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
//               required
//             />
//           </label>
//           <div className="flex flex-col xl:flex-row gap-4">
//             <label className="flex flex-col gap-2">
//               <span>City *</span>
//               <input
//                 type="text"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 placeholder="City"
//                 className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
//                 required
//               />
//             </label>
//             <label className="flex flex-col gap-2">
//               <span>State *</span>
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 placeholder="State"
//                 className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
//                 required
//               />
//             </label>
//           </div>
//           <div className="flex flex-col xl:flex-row gap-4">
//             <label className="flex flex-col gap-2">
//               <span>Zip Code *</span>
//               <input
//                 type="text"
//                 name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 placeholder="ZIP Code"
//                 className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
//                 required
//               />
//             </label>
//             <label className="flex flex-col gap-2">
//               <span>Country *</span>
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 placeholder="Country"
//                 className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
//                 required
//               />
//             </label>
//           </div>
//           <label className="flex flex-col gap-2">
//             <span>Phone Number *</span>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               placeholder="Phone number"
//               className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
//               required
//             />
//           </label>
//         </form>
//       </div>
//       <div className="w-full flex flex-col gap-8 bg-gray-300 rounded-lg lg:rounded-2xl px-5 py-5 md:py-10 lg:px-20 lg:py-20">
//         <h1 className="border-b-gray-600 border-b pb-8 text-xl lg:text-2xl font-semibold">
//           Order Summary
//         </h1>
//         <div className="border-b-gray-600 border-b pb-8 flex flex-col gap-4">
//           <div className="flex">
//             <h2>
//               Price ({cart.reduce((total, item) => total + item.quantity, 0)}{" "}
//               items)
//             </h2>
//             <span className="ml-auto font-semibold">₹ {subtotal}</span>
//           </div>
//           <div className="flex">
//             <h2>Shipping Fee</h2>
//             <span className="ml-auto font-semibold text-green-600">Free</span>
//           </div>
//           <div className="flex">
//             <h2>Tax (2%)</h2>
//             <span className="ml-auto font-semibold">₹ {tax.toFixed(2)}</span>
//           </div>
//           <div className="flex md:text-xl font-medium">
//             <h2 className="">Total Amount:</h2>
//             <span className="ml-auto">₹ {total.toFixed(2)}</span>
//           </div>
//         </div>
//         <div className="flex flex-col gap-8">
//           <h1 className="text-lg font-medium">Payment Method</h1>
//           <label className="flex gap-4 border-2 border-green-700 rounded-lg px-8 py-2">
//             <input type="checkbox" checked />
//             <div>
//               <h1>Cash on Delivery (COD)</h1>
//               <p>Pay when you receive your order</p>
//             </div>
//           </label>
//         </div>
//         <button
//           to={"/checkout"}
//           className="bg-green-400 flex items-center justify-center rounded-lg w-full py-2 font-medium cursor-pointer outline-none"
//         >
//           {loading ? "Placing Order..." : `Place Order - ₹ ${total.toFixed(2)}`}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import { checkoutAPI } from "../services/api";

const Checkout = () => {
  const { cart, getCartTotal, user } = useContext(MainContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Redirect if not logged in or cart is empty
  if (!user) {
    navigate("/registration");
    return null;
  }

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await checkoutAPI.create({
        shippingAddress: formData,
      });
      alert(
        `Order placed successfully! Order Number: ${response.receipt.orderNumber}`
      );
      navigate("/profile");
    } catch (error) {
      alert(`Error placing order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-5 py-10 md:px-20 xl:px-60 md:py-20 lg:grid lg:grid-cols-2 gap-10 lg:gap-20">
      <div className="w-full flex flex-col justify-center gap-8 p-10 bg-gray-300 rounded-lg">
        <h1 className="font-semibold text-xl md:text-2xl">Shipping Address</h1>
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span>Street Address *</span>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Enter your street address"
              className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
              required
            />
          </label>
          <div className="flex flex-col xl:flex-row gap-4">
            <label className="flex flex-col gap-2">
              <span>City *</span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>State *</span>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
                required
              />
            </label>
          </div>
          <div className="flex flex-col xl:flex-row gap-4">
            <label className="flex flex-col gap-2">
              <span>Zip Code *</span>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="ZIP Code"
                className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span>Country *</span>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span>Phone Number *</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="border rounded-lg text-sm md:text-base p-1 md:p-2 outline-none"
              required
            />
          </label>
        </form>
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
            <span className="ml-auto font-semibold">₹ {subtotal}</span>
          </div>
          <div className="flex">
            <h2>Shipping Fee</h2>
            <span className="ml-auto font-semibold text-green-600">Free</span>
          </div>
          <div className="flex">
            <h2>Tax (2%)</h2>
            <span className="ml-auto font-semibold">₹ {tax.toFixed(2)}</span>
          </div>
          <div className="flex md:text-xl font-medium">
            <h2 className="">Total Amount:</h2>
            <span className="ml-auto">₹ {total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="text-lg font-medium">Payment Method</h1>
          <label className="flex gap-4 border-2 border-green-700 rounded-lg px-8 py-2 bg-green-50 cursor-pointer">
            <input
              type="checkbox"
              checked={paymentMethod === "cod"}
              onChange={() => handlePaymentMethodChange("cod")}
            />
            <div>
              <h1>Cash on Delivery (COD)</h1>
              <p>Pay when you receive your order</p>
            </div>
          </label>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="bg-green-400 flex items-center justify-center rounded-lg w-full py-2 font-medium cursor-pointer outline-none hover:bg-green-500 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Placing Order..." : `Place Order - ₹ ${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
