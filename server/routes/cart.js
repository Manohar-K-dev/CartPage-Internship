import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/cart - Get user's cart
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
});

// POST /api/cart - Add item to cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete("/:id", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.id
    );

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing from cart", error: error.message });
  }
});

export default router;
