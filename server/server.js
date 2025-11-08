import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import authRoutes from "./routes/auth.js";
import checkoutRoutes from "./routes/checkout.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/checkout", checkoutRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
