// // import { useContext } from "react";
// // import { Link } from "react-router-dom";
// // import MainContext from "../context/MainContext";

// // const Profile = () => {
// //   const { user, loading } = useContext(MainContext);

// //   // Show loading while checking authentication
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-200 flex items-center justify-center">
// //         <div className="text-lg">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-200 px-10 py-10 md:px-20 md:py-20 lg:px-60 lg:py-20 flex flex-col items-center justify-center">
// //       <div className="text-xl font-semibold text-green-600 flex flex-col gap-8">
// //         <div className="flex flex-col items-center justify-center gap-4">
// //           <h1>Welcome {user?.name}</h1>
// //           <h1>{user?.email}</h1>
// //         </div>
// //         <Link
// //           to={"/"}
// //           className="bg-green-400 w-full flex items-center justify-center text-gray-700 rounded-lg py-2"
// //         >
// //           Go to Home
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;

// import { useContext, useState, useEffect } from "react";
// import { Link, Navigate } from "react-router-dom";
// import MainContext from "../context/MainContext";
// import { ordersAPI } from "../services/api";

// const Profile = () => {
//   const { user } = useContext(MainContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       loadOrders();
//     }
//   }, [user]);

//   const loadOrders = async () => {
//     try {
//       const data = await ordersAPI.getOrders();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error loading orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Safe image URL function
//   const getProductImage = (product) => {
//     if (product.image && Array.isArray(product.image) && product.image[0]) {
//       return product.image[0];
//     }
//     if (product.image && typeof product.image === "string") {
//       return product.image;
//     }
//     return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='12' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
//   };

//   // Redirect to login if user is not logged in
//   if (!user) {
//     return <Navigate to="/registration" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-200 px-10 py-10 md:px-20 md:py-20 lg:px-20 lg:py-10">
//       <div className="max-w-6xl mx-auto">
//         {/* User Info */}
//         <div className="bg-white rounded-lg p-6 mb-8 shadow">
//           <h1 className="text-2xl font-bold text-green-600 mb-4">Profile</h1>
//           <div className="flex flex-col gap-2">
//             <p>
//               <strong>Name:</strong> {user.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {user.email}
//             </p>
//           </div>
//           <Link
//             to={"/"}
//             className="bg-green-400 mt-4 inline-block px-6 py-2 text-gray-700 rounded-lg hover:bg-green-500 transition-colors"
//           >
//             Go to Home
//           </Link>
//         </div>

//         {/* Orders Section */}
//         <div className="bg-white rounded-lg p-6 shadow">
//           <h2 className="text-xl font-bold text-green-600 mb-4">
//             Order History
//           </h2>

//           {loading ? (
//             <div className="text-center py-4">Loading orders...</div>
//           ) : orders.length === 0 ? (
//             <div className="text-center py-4 text-gray-500">
//               No orders found.{" "}
//               <Link to="/" className="text-green-600 hover:underline">
//                 Start shopping!
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {orders.map((order) => (
//                 <div key={order._id} className="border rounded-lg p-4">
//                   <div className="flex justify-between items-center mb-4">
//                     <div>
//                       <h3 className="font-semibold">
//                         Order #: {order.orderNumber}
//                       </h3>
//                       <p className="text-sm text-gray-600">
//                         Date: {new Date(order.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold">₹ {order.total.toFixed(2)}</p>
//                       <span
//                         className={`px-2 py-1 rounded text-xs ${
//                           order.status === "completed"
//                             ? "bg-green-100 text-green-800"
//                             : order.status === "pending"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div className="space-y-3">
//                     {order.items.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center gap-3 border-b pb-3"
//                       >
//                         <img
//                           src={getProductImage(item)}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                         <div className="flex-1">
//                           <h4 className="font-medium">{item.name}</h4>
//                           <p className="text-sm text-gray-600">
//                             ₹ {item.price} x {item.quantity}
//                           </p>
//                         </div>
//                         <p className="font-semibold">
//                           ₹ {(item.price * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Shipping Address */}
//                   {order.shippingAddress && (
//                     <div className="mt-4 p-3 bg-gray-50 rounded">
//                       <h4 className="font-semibold mb-2">Shipping Address:</h4>
//                       <p className="text-sm">
//                         {order.shippingAddress.street},{" "}
//                         {order.shippingAddress.city},<br />
//                         {order.shippingAddress.state} -{" "}
//                         {order.shippingAddress.zipCode},<br />
//                         {order.shippingAddress.country}
//                         <br />
//                         Phone: {order.shippingAddress.phone}
//                       </p>
//                     </div>
//                   )}

//                   {/* Order Summary */}
//                   <div className="mt-4 flex justify-between border-t pt-3">
//                     <div>
//                       <p className="text-sm">
//                         Subtotal: ₹ {(order.total - order.tax).toFixed(2)}
//                       </p>
//                       <p className="text-sm">Tax: ₹ {order.tax.toFixed(2)}</p>
//                     </div>
//                     <p className="font-bold">
//                       Total: ₹ {order.total.toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import { ordersAPI } from "../services/api";

const Profile = () => {
  const { user } = useContext(MainContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await ordersAPI.getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Safe image URL function
  const getProductImage = (product) => {
    if (product.image && Array.isArray(product.image) && product.image[0]) {
      return product.image[0];
    }
    if (product.image && typeof product.image === "string") {
      return product.image;
    }
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='12' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
      <div className="max-w-6xl mx-auto">
        {/* User Info */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow">
          <h1 className="text-xl sm:text-2xl font-bold text-green-600 mb-3 sm:mb-4">
            Profile
          </h1>
          <div className="flex flex-col gap-2 text-sm sm:text-base">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
          <Link
            to={"/"}
            className="bg-green-400 mt-3 sm:mt-4 inline-block px-4 sm:px-6 py-2 text-gray-700 rounded-lg hover:bg-green-500 transition-colors text-sm sm:text-base"
          >
            Go to Home
          </Link>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow">
          <h2 className="text-lg sm:text-xl font-bold text-green-600 mb-3 sm:mb-4">
            Order History
          </h2>

          {loading ? (
            <div className="text-center py-4 text-sm sm:text-base">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm sm:text-base">
              No orders found.{" "}
              <Link to="/" className="text-green-600 hover:underline">
                Start shopping!
              </Link>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-3 sm:p-4">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        Order #: {order.orderNumber}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-sm sm:text-base">
                        ₹ {order.total.toFixed(2)}
                      </p>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 sm:space-y-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 sm:gap-3 border-b pb-2 sm:pb-3"
                      >
                        <img
                          src={getProductImage(item)}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            ₹ {item.price} x {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-sm sm:text-base whitespace-nowrap">
                          ₹ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Shipping Address:
                      </h4>
                      <p className="text-xs sm:text-sm">
                        {order.shippingAddress.street},{" "}
                        {order.shippingAddress.city},<br />
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.zipCode},<br />
                        {order.shippingAddress.country}
                        <br />
                        Phone: {order.shippingAddress.phone}
                      </p>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 border-t pt-2 sm:pt-3">
                    <div className="text-xs sm:text-sm">
                      <p>Subtotal: ₹ {(order.total - order.tax).toFixed(2)}</p>
                      <p>Tax: ₹ {order.tax.toFixed(2)}</p>
                    </div>
                    <p className="font-bold text-sm sm:text-base">
                      Total: ₹ {order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
