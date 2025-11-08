// import express from "express";
// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// // POST /api/checkout - Create order from cart
// router.post("/", auth, async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id }).populate(
//       "items.product"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     // Create order items with product details
//     const orderItems = cart.items.map((item) => ({
//       product: item.product._id,
//       name: item.product.name,
//       price: item.price,
//       quantity: item.quantity,
//     }));

//     // Create order
//     const order = new Order({
//       user: req.user.id,
//       items: orderItems,
//       total: cart.total,
//       status: "completed",
//     });

//     await order.save();

//     // Clear cart
//     cart.items = [];
//     cart.total = 0;
//     await cart.save();

//     // Generate receipt
//     const receipt = {
//       orderId: order._id,
//       items: order.items,
//       total: order.total,
//       timestamp: order.createdAt,
//       status: order.status,
//     };

//     res.status(201).json({
//       message: "Order placed successfully",
//       receipt,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error during checkout", error: error.message });
//   }
// });

// export default router;

import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST /api/checkout - Create order from cart
router.post("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { shippingAddress } = req.body;

    // Create order items with product details
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      image: item.product.image,
    }));

    // Calculate totals
    const subtotal = cart.total;
    const tax = subtotal * 0.02;
    const total = subtotal + tax;

    // Create order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      shippingAddress: shippingAddress,
      total: total,
      tax: tax,
      status: "completed",
    });

    await order.save();
    await order.populate("user", "name email");

    // Clear cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    // Generate receipt
    const receipt = {
      orderId: order._id,
      orderNumber: order.orderNumber,
      items: order.items,
      shippingAddress: order.shippingAddress,
      subtotal: subtotal,
      tax: tax,
      total: order.total,
      timestamp: order.createdAt,
      status: order.status,
    };

    res.status(201).json({
      message: "Order placed successfully",
      receipt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during checkout", error: error.message });
  }
});

// GET /api/orders - Get user's orders
router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
