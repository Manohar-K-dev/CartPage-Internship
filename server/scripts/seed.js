import mongoose from "mongoose";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 2999,
    description: "High-quality wireless headphones with noise cancellation",
    image: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    ],
    category: "Electronics",
    inStock: true,
  },
  {
    name: "Smart Watch",
    price: 4999,
    description: "Feature-rich smartwatch with health monitoring",
    image: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    ],
    category: "Electronics",
    inStock: true,
  },
  {
    name: "Running Shoes",
    price: 1999,
    description: "Comfortable running shoes for all terrains",
    image: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"],
    category: "Fashion",
    inStock: true,
  },
  {
    name: "Laptop Backpack",
    price: 1299,
    description: "Durable laptop backpack with multiple compartments",
    image: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
    category: "Accessories",
    inStock: true,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce"
    );

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
