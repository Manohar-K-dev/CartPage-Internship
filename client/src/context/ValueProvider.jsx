// import { useState, useEffect } from "react";
// // Context
// import MainContext from "./MainContext.jsx";
// import { cartAPI, productAPI, authAPI } from "../services/api.js";
// // Api

// const ValueProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);

//   // Check for existing token on app load
//   // Load products from backend
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       loadUserProfile();
//     }
//     loadProducts();
//   }, []);

//   // Load cart when user changes
//   useEffect(() => {
//     if (user) {
//       loadCart();
//     } else {
//       setCart([]);
//     }
//   }, [user]);

//   const loadUserProfile = async () => {
//     try {
//       const userData = await authAPI.getProfile();
//       setUser(userData);
//     } catch (error) {
//       console.error("Error loading user profile:", error);
//       localStorage.removeItem("token");
//     }
//   };

//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const data = await productAPI.getAll();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error loading products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadCart = async () => {
//     try {
//       const data = await cartAPI.get();
//       setCart(data.items || []);
//     } catch (error) {
//       console.error("Error loading cart:", error);
//     }
//   };

//   const addToCart = async (product) => {
//     try {
//       // If user is logged in, use backend API
//       if (user) {
//         await cartAPI.add(product._id);
//         const updatedCart = await cartAPI.get();
//         setCart(updatedCart.items);
//       } else {
//         // Use local state for guest users
//         setCart((prevCart) => {
//           const existingProduct = prevCart.find(
//             (item) => item._id === product._id
//           );

//           if (existingProduct) {
//             return prevCart.map((item) =>
//               item._id === product._id
//                 ? { ...item, quantity: item.quantity + 1 }
//                 : item
//             );
//           } else {
//             return [...prevCart, { ...product, quantity: 1 }];
//           }
//         });
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       if (user) {
//         await cartAPI.remove(productId);
//         const updatedCart = await cartAPI.get();
//         setCart(updatedCart.items);
//       } else {
//         setCart((prevCart) =>
//           prevCart.filter((item) => item._id !== productId)
//         );
//       }
//       console.log("a");
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     }
//   };

//   const updateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) return;

//     try {
//       if (user) {
//         // For backend, we need to implement quantity update
//         // For now, we'll remove and add with new quantity
//         await cartAPI.remove(productId);
//         await cartAPI.add(productId, newQuantity);
//         const updatedCart = await cartAPI.get();
//         setCart(updatedCart.items);
//       } else {
//         setCart((prevCart) =>
//           prevCart.map((item) =>
//             item._id === productId ? { ...item, quantity: newQuantity } : item
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   const getCartTotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const getCartItemsCount = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const login = (userData, token) => {
//     setUser(userData);
//     localStorage.setItem("token", token);
//   };

//   const logout = () => {
//     setUser(null);
//     setCart([]);
//     localStorage.removeItem("token");
//   };

//   const valueContext = {
//     cart,
//     products,
//     loading,
//     user,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     getCartTotal,
//     getCartItemsCount,
//     login,
//     logout,
//   };

//   return (
//     <MainContext.Provider value={valueContext}>{children}</MainContext.Provider>
//   );
// };

// export default ValueProvider;

import { useState, useEffect } from "react";
import MainContext from "./MainContext.jsx";
import { cartAPI, productAPI, authAPI } from "../services/api.js";

const ValueProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUserProfile();
    }
    loadProducts();
  }, []);

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const userData = await authAPI.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user profile:", error);
      localStorage.removeItem("token");
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCart = async () => {
    try {
      const data = await cartAPI.get();
      // Transform backend cart data to frontend format
      const transformedCart = data.items.map((item) => ({
        _id: item.product._id,
        name: item.product.name,
        price: item.price,
        image: item.product.image,
        quantity: item.quantity,
        product: item.product, // Keep the nested product for reference
      }));
      setCart(transformedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      if (user) {
        await cartAPI.add(product._id);
        const updatedCart = await cartAPI.get();
        // Transform backend cart data to frontend format
        const transformedCart = updatedCart.items.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
          product: item.product,
        }));
        setCart(transformedCart);
      } else {
        setCart((prevCart) => {
          const existingProduct = prevCart.find(
            (item) => item._id === product._id
          );

          if (existingProduct) {
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (user) {
        await cartAPI.remove(productId);
        const updatedCart = await cartAPI.get();
        // Transform backend cart data to frontend format
        const transformedCart = updatedCart.items.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
          product: item.product,
        }));
        setCart(transformedCart);
      } else {
        setCart((prevCart) =>
          prevCart.filter((item) => item._id !== productId)
        );
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      if (user) {
        // For backend, remove and re-add with new quantity
        await cartAPI.remove(productId);
        await cartAPI.add(productId, newQuantity);
        const updatedCart = await cartAPI.get();
        // Transform backend cart data to frontend format
        const transformedCart = updatedCart.items.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          price: item.price,
          image: item.product.image,
          quantity: item.quantity,
          product: item.product,
        }));
        setCart(transformedCart);
      } else {
        // Local state update for guest users
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("token");
  };

  const valueContext = {
    cart,
    products,
    loading,
    user,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    login,
    logout,
  };

  return (
    <MainContext.Provider value={valueContext}>{children}</MainContext.Provider>
  );
};

export default ValueProvider;
