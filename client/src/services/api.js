const API_BASE_URL = "http://localhost:5000/api";

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  register: (userData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiRequest("/auth/me"),
};

// Product APIs
export const productAPI = {
  getAll: () => apiRequest("/products"),

  getById: (id) => apiRequest(`/products/${id}`),
};

// Cart APIs
export const cartAPI = {
  get: () => apiRequest("/cart"),

  add: (productId, quantity = 1) =>
    apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),

  remove: (productId) =>
    apiRequest(`/cart/${productId}`, {
      method: "DELETE",
    }),
};

// Checkout API
export const checkoutAPI = {
  create: () =>
    apiRequest("/checkout", {
      method: "POST",
    }),
};

// Add to your existing api.js
export const ordersAPI = {
  getOrders: () => apiRequest("/checkout/orders"),
};
