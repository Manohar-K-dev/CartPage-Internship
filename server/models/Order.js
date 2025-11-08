// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         name: String,
//         price: Number,
//         quantity: Number,
//       },
//     ],
//     total: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "completed", "cancelled"],
//       default: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        image: [String],
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String,
    },
    total: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    orderNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate order number before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderNumber = `ORD${Date.now()}${count + 1}`;
  }
  next();
});

export default mongoose.model("Order", orderSchema);
